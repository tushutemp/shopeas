const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/auth');
const { createOrder, getOrders, getUserOrders, updateOrderStatus } = require('../controllers/orderController');

router.post('/', protect, createOrder);
router.get('/', protect, admin, getOrders);
router.get('/my-orders', protect, getUserOrders);
router.patch('/:id/status', protect, admin, updateOrderStatus);

module.exports = router;
