#!/bin/bash

# CareVoyage Deployment Script

echo "🐼 Starting CareVoyage deployment..."

# Copy static files to standalone
echo "📦 Copying static files..."
cp -r .next/static .next/standalone/.next/

# Ensure .prisma client is available
echo "🔧 Setting up Prisma client..."
if [ ! -d "node_modules/.prisma" ]; then
  ln -sf ../../node_modules/.prisma node_modules/.prisma
fi

# Run database migrations (optional)
# echo "🗄️ Running database migrations..."
# npx prisma migrate deploy

echo "✅ Deployment preparation complete!"
echo ""
echo "To start the server:"
echo "  cd .next/standalone"
echo "  node server.js"
