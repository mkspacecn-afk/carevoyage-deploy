#!/bin/sh
set -e

# Generate Prisma client with actual DATABASE_URL
npx prisma generate

# Start the app
exec npm start
