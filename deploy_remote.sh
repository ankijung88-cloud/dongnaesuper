#!/bin/bash

# Definition
APP_DIR="/home/bitnami/DongnaeSuper"

echo "🚀 Starting Remote Deployment (TAR mode)..."

# 1. Prepare Directory
mkdir -p $APP_DIR

# 2. Untar (Assumes tar is uploaded to home as deploy_dongnae.tar)
echo "📂 Extracting assets..."
# tar is uploaded to ~/deploy_dongnae.tar
# Content of tar starts with deploy_temp/...
# We want to extract deploy_temp content into APP_DIR
# So we strip components 1 (deploy_temp)
tar -xf ~/deploy_dongnae.tar -C $APP_DIR --strip-components=1

# 3. Server Setup
echo "📦 Installing Server Dependencies..."
cd $APP_DIR/server
# Ensure permissions
chmod +x server.js
# Install production deps only
npm install --omit=dev

# 4. PM2 Process Management
echo "🔄 Managing PM2 Process..."
# Check if process exists
if pm2 list | grep -q "dongnaesuper-api"; then
    echo "Restarting existing process..."
    pm2 restart dongnaesuper-api
else
    echo "Starting new process on Port 4000..."
    # Set PORT=4000 environment variable
    PORT=4000 pm2 start server.js --name "dongnaesuper-api"
    pm2 save
fi

echo "✅ Deployment Complete! App running on Port 4000."
