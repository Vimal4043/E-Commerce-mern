import express from 'express';
import { placeOrder, getUserOrders, getAllOrders, getOrderDetails } from '../controllers/orderController.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/place', protect, placeOrder);
router.get('/user/:userId', protect, getUserOrders);
router.get('/admin', protect, isAdmin, getAllOrders);
router.get('/:orderId', protect, getOrderDetails);

export default router;