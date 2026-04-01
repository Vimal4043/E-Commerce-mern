import express from 'express';
import {saveAddress,getAddresses, deleteAddress, updateAddress} from '../controllers/addressController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/add', protect, saveAddress);
router.get('/', protect, getAddresses);
router.put('/:id', protect, updateAddress);
router.delete('/:id', protect, deleteAddress);

export default router;