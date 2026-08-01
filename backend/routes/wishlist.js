import express from 'express';
import { addToWishlist } from '../controllers/Wishlist/create/AddToWishlist.js';
import { removeFromWishlist } from '../controllers/Wishlist/delete/RemoveFromWishlist.js';
import { getWishlist } from '../controllers/Wishlist/read/GetWishlist.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Add item to wishlist
router.post('/add', protect, addToWishlist);

// Remove item from wishlist
router.post('/remove', protect, removeFromWishlist);

// Get user's wishlist
router.get('/', protect, getWishlist);

export default router;
