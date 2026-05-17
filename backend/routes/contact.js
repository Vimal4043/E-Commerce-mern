import express from 'express'
import { createContact, getContacts, deleteContact } from '../controllers/contactController.js'
import { isAdmin } from '../middleware/authMiddleware.js'

const router = express.Router()

// Create a new contact message
router.post('/', createContact)

// Get all contact messages
router.get('/', isAdmin, getContacts)

// Delete a contact message
router.delete('/:id', isAdmin, deleteContact)

export default router