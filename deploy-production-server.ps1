# skaptix-website Docker Deployment Script for Production Server (PowerShell)
# Usage: .\deploy-production-server.ps1 -ServerIP <server_ip> -ServerPassword <password> -SSHUser <username>
# Example: .\deploy-production-server.ps1 -ServerIP "20.40.250.68" -ServerPassword "MyPassword123" -SSHUser "admin_skaptix"

param(
    [Parameter(Mandatory = $true)]
    [string]$ServerIP,
    
    [Parameter(Mandatory = $false)]
    [string]$ServerPassword,
    
    [Parameter(Mandatory = $false)]
    [string]$PemFile,
    
    [Parameter(Mandatory = $true)]
    [string]$SSHUser
)

$ErrorActionPreference = "Stop"

# Validate authentication method
if (-not $ServerPassword -and -not $PemFile) {
    Write-Host "❌ Error: Either -ServerPassword or -PemFile must be provided" -ForegroundColor Red
    exit 1
}

if ($ServerPassword -and $PemFile) {
    Write-Host "❌ Error: Cannot use both -ServerPassword and -PemFile" -ForegroundColor Red
    exit 1
}

if ($PemFile -and -not (Test-Path $PemFile)) {
    Write-Host "❌ Error: PEM file not found: $PemFile" -ForegroundColor Red
    exit 1
}

# Helper function for SSH arguments
function Get-SSHArgs {
    if ($PemFile) {
        return "-i `"$PemFile`" -batch"
    }
    else {
        return "-pw $ServerPassword -batch"
    }
}

$APP_NAME = "skaptix-website"
$CONTAINER_NAME = "skaptix-website"

# Get version from package.json
$packageJson = Get-Content "package.json" | ConvertFrom-Json
$VERSION = $packageJson.version
$TIMESTAMP = Get-Date -Format "yyyyMMdd-HHmmss"
$IMAGE_TAG = "${VERSION}-${TIMESTAMP}"

Write-Host "🚀 Deploying $APP_NAME to PRODUCTION server" -ForegroundColor Yellow
Write-Host "Server: $ServerIP"
Write-Host "Version: $IMAGE_TAG"
Write-Host ""

# Step 0: Test SSH connection
Write-Host "🔌 Testing SSH connection..." -ForegroundColor Yellow

$sshArgs = Get-SSHArgs

# Accept host key if not already cached
$acceptKeyCmd = "echo 'Connection successful'"
if ($ServerPassword) {
    $null = echo y | & plink -pw $ServerPassword -ssh "${SSHUser}@${ServerIP}" $acceptKeyCmd 2>&1
}
else {
    $null = echo y | & plink -i "$PemFile" -ssh "${SSHUser}@${ServerIP}" $acceptKeyCmd 2>&1
}

# Now test the actual connection
$sshTestCmd = "echo 'Connection successful'"
$sshTest = & plink $sshArgs.Split() -ssh "${SSHUser}@${ServerIP}" $sshTestCmd 2>&1

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ SSH connection failed!" -ForegroundColor Red
    Write-Host "Please check:" -ForegroundColor Red
    Write-Host "  - Server IP: $ServerIP"
    Write-Host "  - Username: $SSHUser"
    Write-Host "  - Password *********"
    Write-Host ""
    Write-Host "Note: This script requires PuTTY (plink/pscp) to be installed and in PATH" -ForegroundColor Yellow
    exit 1
}
Write-Host "✅ SSH connection successful" -ForegroundColor Green
Write-Host ""

# Load environment variables for build args from .env.prod
if (Test-Path ".env.prod") {
    Write-Host "📄 Loading .env.prod for build arguments..." -ForegroundColor Yellow
    Get-Content ".env.prod" | ForEach-Object {
        if ($_ -match '^([^#][^=]+)=(.*)$') {
            $key = $matches[1]
            $value = $matches[2]
            [Environment]::SetEnvironmentVariable($key, $value, "Process")
        }
    }
}

# Step 1: Build Docker image with build args
Write-Host "📦 Building Docker image..." -ForegroundColor Yellow

$VITE_FIREBASE_API_KEY = $env:VITE_FIREBASE_API_KEY
$VITE_FIREBASE_AUTH_DOMAIN = $env:VITE_FIREBASE_AUTH_DOMAIN
$VITE_FIREBASE_PROJECT_ID = $env:VITE_FIREBASE_PROJECT_ID
$VITE_FIREBASE_STORAGE_BUCKET = $env:VITE_FIREBASE_STORAGE_BUCKET
$VITE_FIREBASE_MESSAGING_SENDER_ID = $env:VITE_FIREBASE_MESSAGING_SENDER_ID
$VITE_FIREBASE_APP_ID = $env:VITE_FIREBASE_APP_ID
$VITE_EMAILJS_SERVICE_ID = $env:VITE_EMAILJS_SERVICE_ID
$VITE_EMAILJS_TEMPLATE_ID = $env:VITE_EMAILJS_TEMPLATE_ID
$VITE_EMAILJS_PUBLIC_KEY = $env:VITE_EMAILJS_PUBLIC_KEY

docker build --platform linux/amd64 `
    --build-arg VITE_FIREBASE_API_KEY="$VITE_FIREBASE_API_KEY" `
    --build-arg VITE_FIREBASE_AUTH_DOMAIN="$VITE_FIREBASE_AUTH_DOMAIN" `
    --build-arg VITE_FIREBASE_PROJECT_ID="$VITE_FIREBASE_PROJECT_ID" `
    --build-arg VITE_FIREBASE_STORAGE_BUCKET="$VITE_FIREBASE_STORAGE_BUCKET" `
    --build-arg VITE_FIREBASE_MESSAGING_SENDER_ID="$VITE_FIREBASE_MESSAGING_SENDER_ID" `
    --build-arg VITE_FIREBASE_APP_ID="$VITE_FIREBASE_APP_ID" `
    --build-arg VITE_EMAILJS_SERVICE_ID="$VITE_EMAILJS_SERVICE_ID" `
    --build-arg VITE_EMAILJS_TEMPLATE_ID="$VITE_EMAILJS_TEMPLATE_ID" `
    --build-arg VITE_EMAILJS_PUBLIC_KEY="$VITE_EMAILJS_PUBLIC_KEY" `
    -t "${APP_NAME}:${IMAGE_TAG}" `
    -t "${APP_NAME}:latest" .

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Docker build failed" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Docker image built successfully" -ForegroundColor Green

# Step 2: Save image to tar
Write-Host "💾 Saving Docker image..." -ForegroundColor Yellow
docker save "${APP_NAME}:${IMAGE_TAG}" -o "${APP_NAME}-${IMAGE_TAG}.tar"

# Step 3: Upload to server
Write-Host "📤 Uploading to server..." -ForegroundColor Yellow

# Create tmp directory on server
if ($ServerPassword) {
    $createDirCmd = "printf '%s\n' '${ServerPassword}' | sudo -S sh -c 'mkdir -p /data-drive/tmp && chown ${SSHUser}:${SSHUser} /data-drive/tmp' 2>/dev/null"
}
else {
    $createDirCmd = "sudo sh -c 'mkdir -p /data-drive/tmp && chown ${SSHUser}:${SSHUser} /data-drive/tmp'"
}
& plink $sshArgs.Split() -ssh "${SSHUser}@${ServerIP}" $createDirCmd | Out-Null

# Upload tar
& pscp $sshArgs.Split() "${APP_NAME}-${IMAGE_TAG}.tar" "${SSHUser}@${ServerIP}:/data-drive/tmp/"

# Step 4: Create directory and upload .env.prod
Write-Host "📄 Uploading .env.prod..." -ForegroundColor Yellow
$createAppDirCmd = "mkdir -p /data-drive/skaptix/apps/${APP_NAME}"
& plink $sshArgs.Split() -ssh "${SSHUser}@${ServerIP}" $createAppDirCmd | Out-Null
& pscp $sshArgs.Split() ".env.prod" "${SSHUser}@${ServerIP}:/data-drive/skaptix/apps/${APP_NAME}/.env.prod"

# Step 5: Upload docker-compose.yml
Write-Host "📄 Uploading docker-compose.yml..." -ForegroundColor Yellow
& pscp $sshArgs.Split() "docker-compose.yml" "${SSHUser}@${ServerIP}:/data-drive/skaptix/apps/${APP_NAME}/docker-compose.yml"

# Step 6: Deploy on server
Write-Host "🚀 Deploying on server..." -ForegroundColor Yellow

# Create deployment script with Unix line endings
$deployScript = @"
cd /data-drive/tmp
echo 'Loading Docker image...'
docker load < ${APP_NAME}-${IMAGE_TAG}.tar

# Tag the loaded image as latest
docker tag ${APP_NAME}:${IMAGE_TAG} ${APP_NAME}:latest

echo 'Stopping existing container...'
docker stop ${CONTAINER_NAME} 2>/dev/null || true
docker rm ${CONTAINER_NAME} 2>/dev/null || true

echo 'Starting new container...'
cd /data-drive/skaptix/apps/${APP_NAME}
docker compose up -d

echo 'Cleaning up...'
rm /data-drive/tmp/${APP_NAME}-${IMAGE_TAG}.tar
docker image prune -f

echo 'Deployment complete!'
docker ps | grep ${CONTAINER_NAME}
"@

# Save deployment script locally first to handle encoding - ensure LF line endings
$deployScript = $deployScript -replace "`r`n", "`n"
[System.IO.File]::WriteAllText("$PWD/deploy_remote.sh", $deployScript)

# Upload deployment script
& pscp $sshArgs.Split() "deploy_remote.sh" "${SSHUser}@${ServerIP}:/data-drive/tmp/deploy.sh"

# Execute deployment script
$chmodCmd = "chmod +x /data-drive/tmp/deploy.sh && /data-drive/tmp/deploy.sh"
& plink $sshArgs.Split() -ssh "${SSHUser}@${ServerIP}" $chmodCmd

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ Deployment successful!" -ForegroundColor Green
    Write-Host "The Skaptix Website is now behind the centralized Nginx Gateway."
    Write-Host "Access at: https://skaptix.com"
    Write-Host "Check logs with: docker logs -f ${CONTAINER_NAME}"
    
    # Clean up local temporary files
    if (Test-Path "${APP_NAME}-${IMAGE_TAG}.tar") { Remove-Item "${APP_NAME}-${IMAGE_TAG}.tar" }
    if (Test-Path "deploy_remote.sh") { Remove-Item "deploy_remote.sh" }
}
else {
    Write-Host ""
    Write-Host "❌ Deployment failed!" -ForegroundColor Red
    exit 1
}
