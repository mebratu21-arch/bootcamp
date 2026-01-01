import express from 'express';
import { createOrder, getOrderDetails, updateOrderStatus, getAllOrders } from '../controllers/orders.controller.js';

const router = express.Router();

router.post('/', createOrder);
router.get('/', getAllOrders);
router.get('/:id', getOrderDetails);
router.patch('/:id/status', updateOrderStatus);

export default router;
