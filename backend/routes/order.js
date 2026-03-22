import express from 'express';
import { placeOrder, getUserOrders, getAllOrders, updateOrderStatus } from '../controllers/orderController.js';

const router = express.Router();

router.post('/place', placeOrder);
router.get('/:userId', getUserOrders);
router.get('/all', getAllOrders);
router.put('/status/:orderId', updateOrderStatus);

export default router;