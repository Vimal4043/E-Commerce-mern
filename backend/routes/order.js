import express from 'express';
import { placeOrder, getUserOrders, getOrderDetails } from '../controllers/orderController.js';

const router = express.Router();

router.post('/place', placeOrder);
router.get('/user/:userId', getUserOrders);
router.get('/:orderId', getOrderDetails);

export default router;