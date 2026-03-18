# Railway Docker deployment - Standalone mode
FROM node:18-slim

WORKDIR /app

# Install openssl for Prisma runtime
RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files
COPY . .

# Build the app (standalone output)
RUN npm run build

# Copy static files to standalone
RUN cp -r public .next/standalone/ 2>/dev/null || true
RUN cp -r .next/static .next/standalone/.next/ 2>/dev/null || true

# Expose port
EXPOSE 3000

# Start the app (standalone mode)
CMD ["node", ".next/standalone/server.js"]
