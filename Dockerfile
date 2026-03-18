# Railway Docker deployment - Skip Prisma generate, use pre-built client
FROM node:18-slim

WORKDIR /app

# Install openssl for Prisma runtime
RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files (includes pre-generated Prisma client)
COPY . .

# Build the app (without Prisma generate)
RUN npm run build

# Expose port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
