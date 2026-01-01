import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

console.log('Seed: DATABASE_URL is', process.env.DATABASE_URL ? 'set' : 'NOT set');

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: process.env.DATABASE_URL
        }
    }
});

const menuItems = [
    { name: 'Espresso', description: 'Rich and bold single shot of premium coffee', price: 3.50, category: 'Coffee' },
    { name: 'Cappuccino', description: 'Espresso with steamed milk and velvety foam', price: 4.50, category: 'Coffee' },
    { name: 'Caramel Latte', description: 'Smooth espresso with caramel and creamy milk', price: 5.50, category: 'Coffee' },
    { name: 'Mocha', description: 'Rich chocolate meets bold espresso', price: 5.00, category: 'Coffee' },
    { name: 'Americano', description: 'Espresso diluted with hot water for a smooth finish', price: 3.00, category: 'Coffee' },
    { name: 'Matcha Latte', description: 'Premium ceremonial grade matcha with oat milk', price: 6.00, category: 'Coffee' },
    { name: 'Butter Croissant', description: 'Flaky, golden French pastry baked fresh daily', price: 4.00, category: 'Pastries' },
    { name: 'Chocolate Muffin', description: 'Rich double chocolate chip muffin', price: 3.50, category: 'Pastries' },
    { name: 'Cinnamon Roll', description: 'Warm cinnamon swirl with cream cheese frosting', price: 4.50, category: 'Pastries' },
    { name: 'Avocado Toast', description: 'Sourdough with smashed avocado and poached egg', price: 9.50, category: 'Food' },
    { name: 'Caesar Salad', description: 'Crisp romaine with parmesan and house dressing', price: 10.50, category: 'Food' },
];

async function main() {
    console.log('Start seeding...');
    for (const item of menuItems) {
        const menuItem = await prisma.menuItem.create({
            data: item,
        });
        console.log(`Created menu item with id: ${menuItem.id}`);
    }
    console.log('Seeding finished.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
