import express from 'express';
import {saveAddress,getAddresses, deleteAddress, updateAddress} from '../controllers/addressController.js';

const router = express.Router();

router.post('/add', saveAddress);
router.get('/:userId', getAddresses);
router.put('/:id', updateAddress);
router.delete('/:id', deleteAddress);

export default router;