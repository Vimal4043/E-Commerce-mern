import express from 'express';
import { placeOrder } from '../controllers/Order/create/PlaceOrder.js';
import { getUserOrders } from '../controllers/Order/read/GetUserOrders.js';
import { getAllOrders } from '../controllers/Order/read/GetAllOrders.js';
import { getOrderDetails } from '../controllers/Order/read/GetOrderDetails.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/place', protect, placeOrder);
router.get('/user/:userId', protect, getUserOrders);
router.get('/admin', protect, isAdmin, getAllOrders);
router.get('/:orderId', protect, getOrderDetails);

export default router;