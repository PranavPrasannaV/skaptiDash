#!/bin/bash
# skaptix-website Docker Deployment Script (Test Environment)
# Usage: ./deploy-test-server.sh -ServerIP <server_ip> [-ServerPassword <password> | -PemFile <path>] -SSHUser <username>

set -e

# Parse arguments
while [[ "$#" -gt 0 ]]; do
    case $1 in
        -ServerIP) SERVER_IP="$2"; shift ;;
        -ServerPassword) SERVER_PASSWORD="$2"; shift ;;
        -PemFile) PEM_FILE="$2"; shift ;;
        -SSHUser) SSH_USER="$2"; shift ;;
        *) echo "Unknown parameter passed: $1"; exit 1 ;;
    esac
    shift
done

if [ -z "$SERVER_IP" ] || [ -z "$SSH_USER" ]; then
    echo "❌ Error: -ServerIP and -SSHUser are mandatory."
    exit 1
fi

if [ -z "$SERVER_PASSWORD" ] && [ -z "$PEM_FILE" ]; then
    echo "❌ Error: Either -ServerPassword or -PemFile must be provided"
    exit 1
fi

TEMP_PEM_FILE=""
if [ -n "$PEM_FILE" ]; then
    if echo "$PEM_FILE" | grep -qE "BEGIN .* PRIVATE KEY|PuTTY-User-Key-File"; then
        TEMP_PEM_FILE=$(mktemp)
        echo "$PEM_FILE" > "$TEMP_PEM_FILE"
        chmod 600 "$TEMP_PEM_FILE"
        PEM_FILE_PATH="$TEMP_PEM_FILE"
    elif [ -f "$PEM_FILE" ]; then
        PEM_FILE_PATH="$PEM_FILE"
    else
        echo "❌ Error: PEM file not found: $PEM_FILE"
        exit 1
    fi
fi

cleanup() {
    if [ -n "$TEMP_PEM_FILE" ] && [ -f "$TEMP_PEM_FILE" ]; then
        rm -f "$TEMP_PEM_FILE"
    fi
}
trap cleanup EXIT

APP_NAME="skaptix-website"
CONTAINER_NAME="skaptix-website"

# Determine Authentication Method and SSH commands
if [ -n "$PEM_FILE_PATH" ]; then
    SSH_CMD="ssh -i $PEM_FILE_PATH -o StrictHostKeyChecking=no"
    SCP_CMD="scp -i $PEM_FILE_PATH -o StrictHostKeyChecking=no"
    SSH_HOST="${SSH_USER}@${SERVER_IP}"
else
    if ! command -v sshpass &> /dev/null; then
        echo "❌ Error: sshpass is not installed but password authentication was requested."
        exit 1
    fi
    SSH_CMD="sshpass -p $SERVER_PASSWORD ssh -o ConnectTimeout=10 -o StrictHostKeyChecking=no"
    SCP_CMD="sshpass -p $SERVER_PASSWORD scp -o StrictHostKeyChecking=no"
    SSH_HOST="${SSH_USER}@${SERVER_IP}"
fi

# Load build arguments from .env.test
if [ -f ".env.test" ]; then
    echo "📄 Loading .env.test for build arguments..."
    export $(grep -v '^#' .env.test | xargs)
fi

VERSION=$(grep '"version"' package.json | head -1 | awk -F: '{ print $2 }' | sed 's/[", ]//g')
if [ -z "$VERSION" ]; then
    VERSION="0.1.0"
fi
TIMESTAMP=$(date +%Y%m%d-%H%M%S)
IMAGE_TAG="${VERSION}-${TIMESTAMP}"

echo "🚀 Deploying $APP_NAME (TEST)"
echo "Server: $SERVER_IP"
echo "Version: $IMAGE_TAG"
echo ""

echo "📦 Building Docker image..."
if ! docker build --platform linux/amd64 \
    --build-arg VITE_FIREBASE_API_KEY="$VITE_FIREBASE_API_KEY" \
    --build-arg VITE_FIREBASE_AUTH_DOMAIN="$VITE_FIREBASE_AUTH_DOMAIN" \
    --build-arg VITE_FIREBASE_PROJECT_ID="$VITE_FIREBASE_PROJECT_ID" \
    --build-arg VITE_FIREBASE_STORAGE_BUCKET="$VITE_FIREBASE_STORAGE_BUCKET" \
    --build-arg VITE_FIREBASE_MESSAGING_SENDER_ID="$VITE_FIREBASE_MESSAGING_SENDER_ID" \
    --build-arg VITE_FIREBASE_APP_ID="$VITE_FIREBASE_APP_ID" \
    --build-arg VITE_EMAILJS_SERVICE_ID="$VITE_EMAILJS_SERVICE_ID" \
    --build-arg VITE_EMAILJS_TEMPLATE_ID="$VITE_EMAILJS_TEMPLATE_ID" \
    --build-arg VITE_EMAILJS_PUBLIC_KEY="$VITE_EMAILJS_PUBLIC_KEY" \
    --build-arg VITE_API_URL="$VITE_API_URL" \
    -t "${APP_NAME}:${IMAGE_TAG}" \
    -t "${APP_NAME}:latest" . ; then
    echo "❌ Docker build failed"
    exit 1
fi
echo "✅ Docker image built successfully"

echo "💾 Saving Docker image..."
if ! docker save "${APP_NAME}:${IMAGE_TAG}" -o "${APP_NAME}-${IMAGE_TAG}.tar" ; then
    echo "❌ Docker save failed"
    exit 1
fi

echo "📤 Uploading to server..."
if [ -n "$SERVER_PASSWORD" ]; then
    $SSH_CMD "$SSH_HOST" "printf '%s\n' '${SERVER_PASSWORD}' | sudo -S sh -c 'mkdir -p /mnt/data/tmp && chown ${SSH_USER}:${SSH_USER} /mnt/data/tmp' 2>/dev/null"
else
    $SSH_CMD "$SSH_HOST" "sudo sh -c 'mkdir -p /mnt/data/tmp && chown ${SSH_USER}:${SSH_USER} /mnt/data/tmp'"
fi

if ! $SCP_CMD "${APP_NAME}-${IMAGE_TAG}.tar" "${SSH_HOST}:/mnt/data/tmp/" ; then
    echo "❌ Failed to upload tar file"
    rm -f "${APP_NAME}-${IMAGE_TAG}.tar"
    exit 1
fi

echo "📄 Uploading configuration files..."
$SSH_CMD "$SSH_HOST" "mkdir -p /mnt/data/skaptix/apps/${APP_NAME}"
$SCP_CMD ".env.test" "${SSH_HOST}:/mnt/data/skaptix/apps/${APP_NAME}/.env.test"
$SCP_CMD "docker-compose.test.yml" "${SSH_HOST}:/mnt/data/skaptix/apps/${APP_NAME}/docker-compose.test.yml"

echo "🚀 Deploying on server..."
cat << 'EOF' > deploy_remote.sh
#!/bin/bash
cd /mnt/data/tmp
echo 'Loading Docker image...'
docker load < APP_NAME-IMAGE_TAG.tar

docker tag APP_NAME:IMAGE_TAG APP_NAME:latest

echo 'Stopping existing container...'
docker stop CONTAINER_NAME 2>/dev/null || true
docker rm CONTAINER_NAME 2>/dev/null || true

echo 'Starting new container...'
cd /mnt/data/skaptix/apps/APP_NAME
docker compose -f docker-compose.test.yml --env-file .env.test up -d --no-build

echo 'Cleaning up...'
rm -f /mnt/data/tmp/APP_NAME-IMAGE_TAG.tar
docker image prune -f

echo 'Deployment complete!'
docker ps | grep APP_NAME
EOF

sed -i.bak "s/APP_NAME/${APP_NAME}/g" deploy_remote.sh
sed -i.bak "s/IMAGE_TAG/${IMAGE_TAG}/g" deploy_remote.sh
sed -i.bak "s/CONTAINER_NAME/${CONTAINER_NAME}/g" deploy_remote.sh
rm -f deploy_remote.sh.bak

$SCP_CMD deploy_remote.sh "${SSH_HOST}:/mnt/data/tmp/deploy.sh"

echo "Executing remote deployment script..."
if ! $SSH_CMD "$SSH_HOST" "chmod +x /mnt/data/tmp/deploy.sh && /mnt/data/tmp/deploy.sh"; then
    echo "❌ Deployment failed!"
    rm -f "${APP_NAME}-${IMAGE_TAG}.tar"
    rm -f deploy_remote.sh
    exit 1
fi

echo ""
echo "✅ Deployment successful!"
echo "Check logs with: docker logs -f ${CONTAINER_NAME}"

rm -f "${APP_NAME}-${IMAGE_TAG}.tar"
rm -f deploy_remote.sh
chmod -x deploy-test-server.sh 2>/dev/null || true
