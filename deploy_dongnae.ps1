# deploy_dongnae.ps1
$ErrorActionPreference = "Stop"

$pemKey = "C:/jobproject/Key/Multi_bitnami_Key.pem"
$serverIp = "13.125.161.160"
$user = "bitnami"
$remotePath = "/home/bitnami"

Write-Host "🚀 Starting Deployment for Dongnae Super (TAR)..." -ForegroundColor Green

# 1. Clean previous temp files
if (Test-Path "deploy_temp") { Remove-Item -Recurse -Force "deploy_temp" }
if (Test-Path "deploy.tar") { Remove-Item -Force "deploy.tar" }

# 2. Prepare Temp Directory Structure
if (Test-Path "deploy_temp/server/data/database.json") { Remove-Item -Force "deploy_temp/server/data/database.json" }
New-Item -ItemType Directory -Path "deploy_temp/server" -Force | Out-Null
New-Item -ItemType Directory -Path "deploy_temp/client/dist" -Force | Out-Null

# 3. Copy Server Files (Excluding node_modules)
Write-Host "📂 Copying Server files..."
Get-ChildItem "server" -Exclude "node_modules", ".env" | Copy-Item -Recurse -Destination "deploy_temp/server"

# 4. Copy Client Dist Files
Write-Host "📂 Copying Client Build..."
Copy-Item -Recurse "client/dist/*" "deploy_temp/client/dist"

# 5. Copy Deploy Script
Copy-Item "deploy_remote.sh" "deploy_temp/deploy_remote.sh"

# 6. Tar Assets (Using Windows 10 built-in tar)
Write-Host "📦 Tarring Assets..."
# tar on windows works best with relative paths from the dir
tar -cf deploy.tar deploy_temp

# 7. Upload to Server
Write-Host "aaS Uploading to Server ($serverIp)..."
scp -i $pemKey "deploy.tar" "$user@$serverIp`:$remotePath/deploy_dongnae.tar"

# 8. Execute Remote Script
Write-Host "🔧 Executing Remote Setup..."
# ssh command
$sshCmd = "tar -xf $remotePath/deploy_dongnae.tar -C $remotePath --wildcards '*/deploy_remote.sh' && chmod +x $remotePath/deploy_temp/deploy_remote.sh && sed -i 's/\r$//' $remotePath/deploy_temp/deploy_remote.sh && $remotePath/deploy_temp/deploy_remote.sh"
# Actually, deploy_remote.sh is INSIDE the tar. We need to extract it first to run it?
# The revised deploy_remote.sh expects existing tar. 
# Let's just extract the script first.
# Wait, tar -xf extracts to current dir? 
# The tar content is deploy_temp/file
# So extracting deploy_temp/deploy_remote.sh works.

ssh -i $pemKey "$user@$serverIp" "tar -xf $remotePath/deploy_dongnae.tar -C $remotePath deploy_temp/deploy_remote.sh && chmod +x $remotePath/deploy_temp/deploy_remote.sh && sed -i 's/\r$//' $remotePath/deploy_temp/deploy_remote.sh && $remotePath/deploy_temp/deploy_remote.sh"

Write-Host "✅ Deployment Script Finished!" -ForegroundColor Cyan
