# deploy_frontend_safe.ps1
$ErrorActionPreference = "Stop"

$pemKey = "C:/jobproject/Key/Multi_bitnami_Key.pem"
$serverIp = "13.125.161.160"
$user = "bitnami"
# The backend expects frontend files at /home/bitnami/Multiserver/dist
$remoteAppRoot = "/home/bitnami/Multiserver"

Write-Host "🚀 Starting Safe Frontend Deployment (Design Only)..." -ForegroundColor Cyan

# 1. Build Client
Write-Host "🛠️ Building Client..."
Set-Location "client"
cmd /c "npm run build"
Set-Location ..

if (-not (Test-Path "client/dist/index.html")) {
    Write-Error "Build failed! index.html not found."
}

# 2. Package Frontend
Write-Host "📦 Packaging Frontend Assets..."
if (Test-Path "frontend.tar") { Remove-Item "frontend.tar" }
# Tar the contents of client/dist
# We cd into client/dist so the tar structure is clean (assets/..., index.html)
tar -cf frontend.tar -C client/dist .

# 3. Upload
Write-Host "aaS Uploading to Server ($serverIp)..."
scp -i $pemKey "frontend.tar" "$user@$serverIp`:$remoteAppRoot/frontend.tar"

# 4. Deploy on Server
Write-Host "🔧 Extracting on Server..."
# 1. Remove old dist
# 2. mkdir dist
# 3. tar extract into dist
$sshScript = "
    cd $remoteAppRoot && \
    rm -rf dist && \
    mkdir dist && \
    tar -xf frontend.tar -C dist && \
    rm frontend.tar && \
    echo '✅ Frontend updated successfully!'
"

ssh -i $pemKey "$user@$serverIp" $sshScript

Write-Host "✨ Deployment Complete! Only design files were updated." -ForegroundColor Green
Write-Host "   Backend data and server process were PRESERVED." -ForegroundColor Gray
