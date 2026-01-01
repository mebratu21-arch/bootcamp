import prisma from '../prisma/client.js';

export const getMenu = async (req, res) => {
    try {
        const menuItems = await prisma.menuItem.findMany({
            where: { isAvailable: true }
        });
        res.json(menuItems);
    } catch (error) {
        res.status(500).json({ message: "Error fetching menu items", error: error.message });
    }
};

export const createMenuItem = async (req, res) => {
    try {
        const { name, category, price, imageUrl, isAvailable } = req.body;
        const newItem = await prisma.menuItem.create({
            data: {
                name,
                category,
                price: parseFloat(price),
                imageUrl,
                isAvailable: isAvailable ?? true
            }
        });
        res.status(201).json(newItem);
    } catch (error) {
        res.status(500).json({ message: "Error creating menu item", error: error.message });
    }
};
