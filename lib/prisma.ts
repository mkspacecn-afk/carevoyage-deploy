// lib/prisma.ts - Safe Prisma client with build-time fallback

let prisma: any

if (process.env.DATABASE_URL) {
  // Only import Prisma if DATABASE_URL is set
  const { PrismaClient } = require('@prisma/client')
  const globalForPrisma = globalThis as unknown as {
    prisma: any
  }
  prisma = globalForPrisma.prisma ?? new PrismaClient()
  if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
} else {
  // Build-time fallback - mock Prisma
  prisma = {
    customer: { findUnique: () => null, create: () => null },
    user: { findUnique: () => null, create: () => null },
    // Add other models as needed
    $connect: () => Promise.resolve(),
    $disconnect: () => Promise.resolve(),
  }
}

export { prisma }
