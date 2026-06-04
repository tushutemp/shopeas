const Order = require('../models/Order');

exports.createOrder = async (req, res) => {
  try {
    const {
      fullName,
      email,
      address,
      city,
      zipCode,
      cardNumber,
      expiryDate,
      cvv,
      upiId,
      paymentMethod,
      paymentStatus,
      items,
      subtotal,
      shipping,
      total,
    } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ success: false, message: 'Cart items are required' });
    }

    const order = await Order.create({
      user: req.user?._id,
      fullName,
      email,
      address,
      city,
      zipCode,
      cardNumber: cardNumber || '',
      expiryDate: expiryDate || '',
      cvv: cvv || '',
      upiId: upiId || '',
      paymentMethod: paymentMethod || 'card',
      paymentStatus: paymentStatus || 'paid',
      items,
      subtotal,
      shipping,
      total,
    });

    res.status(201).json({ success: true, order });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'name email role').sort({ createdAt: -1 });
    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error('Get user orders error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['pending', 'processing', 'shipped', 'completed', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });

    res.status(200).json({ success: true, order });
  } catch (error) {
    console.error('Update order error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
