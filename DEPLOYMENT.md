# Deployment Guide for skaptiDash

This guide covers the deployment process for the `skaptiDash` web application to the production and test environments using Docker and Azure.

## Prerequisites

- **Azure CLI**: [Install Azure CLI](https://learn.microsoft.com/en-us/cli/azure/install-azure-cli)
- **Docker**: Installed and running locally.
- **sshpass**: Required for automated SSH with password (if not using PEM file).
  - macOS: `brew install hudochenkov/sshpass/sshpass`
  - Linux: `sudo apt-get install sshpass`

## 1. Authentication

First, log in to your Azure account:

```bash
az login
```

Verify your account and select the correct subscription if you have multiple:

```bash
# List subscriptions
az account list --output table

# Set active subscription
az account set --subscription "skaptix"
```

## 2. Deploy a Single Service

The project provides two deployment scripts:

- `deploy-production-server.sh`: For the production environment.
- `deploy-test-server.sh`: For the test environment.

### Deploy to Production

Deploy using credentials directly from Azure Key Vault:

```bash
./deploy-production-server.sh \
  -ServerIP $(az keyvault secret show --vault-name skaptix-production-vault --name storage-vm-ip --query value -o tsv) \
  -PemFile "$(az keyvault secret show --vault-name skaptix-production-vault --name storage-vm-pem-file --query value -o tsv)" \
  -SSHUser $(az keyvault secret show --vault-name skaptix-production-vault --name storage-vm-username --query value -o tsv)
```

### Deploy to Test

```bash
./deploy-test-server.sh \
  -ServerIP $(az keyvault secret show --vault-name skaptix --name service-vm-ip-address --query value -o tsv) \
  -ServerPassword "$(az keyvault secret show --vault-name skaptix --name service-vm-password --query value -o tsv)" \
  -SSHUser $(az keyvault secret show --vault-name skaptix --name service-vm-username --query value -o tsv)
```

## 3. Verify Deployment

Once the script completes successfully:

1. **Check Logs**:
   ```bash
   ssh -i /path/to/your/key $(az keyvault secret show --vault-name skaptix-production-vault --name service-vm-username --query value -o tsv)@$(az keyvault secret show --vault-name skaptix-production-vault --name service-vm-ip --query value -o tsv) "docker logs -f skaptix-website"
   ```

2. **Check Container Status**:
   ```bash
   ssh -i /path/to/your/key $(az keyvault secret show --vault-name skaptix-production-vault --name service-vm-username --query value -o tsv)@$(az keyvault secret show --vault-name skaptix-production-vault --name service-vm-ip --query value -o tsv) "docker ps | grep skaptix-website"
   ```

3. **Access the App**:
   Visit the VM's IP address or the associated domain in your browser.

## Troubleshooting

- **Azure Login Failed**: Run `az logout` and then `az login` again.
- **Key Vault Access Denied**: Ensure you have the "Key Vault Secrets User" role assigned for the `skaptix-production-vault`.
- **SSH Connection Refused**: Check if the VM is running in the Azure Portal and that your IP is allowed in the Network Security Group (NSG) rules.
- **Docker Build Failed**: Ensure Docker is running locally and you have enough disk space.
