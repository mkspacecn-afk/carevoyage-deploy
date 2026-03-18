// Railway entry point
const { execSync } = require('child_process');

// Run prisma generate first
execSync('npx prisma generate', { stdio: 'inherit' });

// Start Next.js
const nextStart = require('next/dist/bin/next');
