import express from 'express';
import { placeOrder, getUserOrders, getOrderDetails } from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/place', protect, placeOrder);
router.get('/user/:userId', protect, getUserOrders);
router.get('/:orderId', protect, getOrderDetails);

export default router;