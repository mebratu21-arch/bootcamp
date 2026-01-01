import { PrismaClient } from '@prisma/client';

let prisma;

try {
    // Prisma 7 uses prisma.config.ts for configuration
    // No constructor options needed
    prisma = new PrismaClient();
    console.log('Prisma Client initialized successfully');
} catch (error) {
    console.error('Failed to initialize Prisma Client:', error.message);
    // Fallback object to prevent server crash
    prisma = {
        menuItem: { findMany: async () => [], create: async () => ({ id: 0 }) },
        order: { create: async () => ({ id: 0 }), findUnique: async () => null, findMany: async () => [] },
        $transaction: async (fn) => fn(prisma),
        $disconnect: async () => { }
    };
}

export default prisma;
