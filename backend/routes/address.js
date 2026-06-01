import express from 'express';
import { saveAddress } from '../controllers/Address/create/CreateAddress.js';
import { getAddresses } from '../controllers/Address/read/ReadAddress.js';
import { updateAddress } from '../controllers/Address/update/UpdateAddress.js';
import { deleteAddress } from '../controllers/Address/delete/DeleteAddress.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/add', protect, saveAddress);
router.get('/', protect, getAddresses);
router.put('/:id', protect, updateAddress);
router.delete('/:id', protect, deleteAddress);

export default router;