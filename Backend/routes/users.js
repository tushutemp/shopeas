const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/auth');

// Simple user route
router.get('/', protect, admin, (req, res) => {
  res.json({ message: 'Admin users route' });
});

module.exports = router;