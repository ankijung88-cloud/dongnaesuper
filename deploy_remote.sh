#!/bin/bash

# Definition
APP_DIR="/home/bitnami/Multiserver"

echo "🚀 Starting Remote Deployment (TAR mode)..."

# 1. Prepare Directory
mkdir -p $APP_DIR

# 2. Untar (Assumes tar is uploaded to APP_DIR/deploy_dongnae.tar)
echo "📂 Extracting assets..."
# tar is uploaded to $APP_DIR/deploy_dongnae.tar
# Content of tar starts with deploy_temp/...
# We want to extract deploy_temp content into APP_DIR (stripping deploy_temp)
tar -xf $APP_DIR/deploy_dongnae.tar -C $APP_DIR --strip-components=1

# 3. Server Setup
echo "📦 Installing Server Dependencies..."
cd $APP_DIR/server
# Ensure permissions
chmod +x server.js
# Install production deps only
npm install --omit=dev

# 4. PM2 Process Management
echo "🔄 Managing PM2 Process..."

# Check if dongnaesuper-api process exists
if pm2 list | grep -q "dongnaesuper-api"; then
    echo "Restarting existing dongnaesuper-api process..."
    pm2 restart dongnaesuper-api
else
    echo "Starting new dongnaesuper-api process on Port 4000..."
    # Explicitly set PORT=4000 and name strictly
    PORT=4000 pm2 start server.js --name "dongnaesuper-api" --time
fi

# Save PM2 list to ensure restart on reboot
pm2 save

echo "✅ Deployment Complete! App running on Port 4000."
