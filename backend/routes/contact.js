import express from 'express'
import { createContact } from '../controllers/Contact/create/CreateContact.js'
import { getContacts } from '../controllers/Contact/read/GetContacts.js'
import { getContactById } from '../controllers/Contact/read/GetContactById.js'
import { editContact } from '../controllers/Contact/update/EditContact.js'
import { deleteContact } from '../controllers/Contact/delete/DeleteContact.js'
import { isAdmin } from '../middleware/authMiddleware.js'

const router = express.Router()

// Create a new contact message
router.post('/', createContact)

// Get all contact messages
router.get('/', isAdmin, getContacts)

// Get a specific contact message by ID
router.get('/:id', isAdmin, getContactById)

// Edit a contact message
router.put('/:id', isAdmin, editContact)

// Delete a contact message
router.delete('/:id', isAdmin, deleteContact)

export default router