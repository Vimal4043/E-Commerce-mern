import express from 'express';
import { addToCart } from '../controllers/Cart/create/AddToCart.js';
import { removeItem } from '../controllers/Cart/delete/RemoveItem.js';
import { updateQuantity } from '../controllers/Cart/update/UpdateQuantity.js';
import { getCart } from '../controllers/Cart/read/GetCart.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Add item to cart
router.post('/add', protect ,addToCart);

// Remove item from cart
router.post('/remove', protect, removeItem);

// Update item quantity in cart
router.post('/update', protect, updateQuantity);

// Get user's cart
router.get('/', protect, getCart);

export default router;