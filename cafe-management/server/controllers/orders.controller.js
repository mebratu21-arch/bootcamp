import prisma from '../prisma/client.js';

export const createOrder = async (req, res) => {
    try {
        const { items, totalPrice, deliveryInfo } = req.body;

        // Use a transaction to create order and order items
        const result = await prisma.$transaction(async (tx) => {
            const order = await tx.order.create({
                data: {
                    totalPrice: parseFloat(totalPrice),
                    paymentStatus: 'paid', // For now, simulate paid
                    orderStatus: 'pending',
                    items: {
                        create: items.map(item => ({
                            menuItemId: item.id,
                            quantity: item.quantity,
                            price: item.price
                        }))
                    }
                },
                include: {
                    items: true
                }
            });
            return order;
        });

        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: "Error creating order", error: error.message });
    }
};

export const getOrderDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await prisma.order.findUnique({
            where: { id: parseInt(id) },
            include: {
                items: {
                    include: {
                        menuItem: true
                    }
                }
            }
        });

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.json(order);
    } catch (error) {
        res.status(500).json({ message: "Error fetching order details", error: error.message });
    }
};

export const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const updatedOrder = await prisma.order.update({
            where: { id: parseInt(id) },
            data: { orderStatus: status }
        });

        res.json(updatedOrder);
    } catch (error) {
        res.status(500).json({ message: "Error updating order status", error: error.message });
    }
};

export const getAllOrders = async (req, res) => {
    try {
        const orders = await prisma.order.findMany({
            include: {
                items: {
                    include: {
                        menuItem: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: "Error fetching orders", error: error.message });
    }
};
