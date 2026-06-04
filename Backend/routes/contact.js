const express = require('express');
const router = express.Router();
const {
  submitContact,
  getAllContacts,
  getContact,
  updateContactStatus,
} = require('../controllers/contactController');
const { protect, admin } = require('../middleware/auth');

// Public routes
router.post('/', submitContact);

// Admin routes
router.get('/', protect, admin, getAllContacts);
router.get('/:id', protect, admin, getContact);
router.patch('/:id', protect, admin, updateContactStatus);

module.exports = router;
