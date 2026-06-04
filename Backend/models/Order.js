const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  productId: { type: String },
  name:      { type: String, required: true },
  price:     { type: Number, required: true },
  quantity:  { type: Number, required: true },
});

const orderSchema = new mongoose.Schema({
  user:          { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  fullName:      { type: String, required: true },
  email:         { type: String, required: true },
  address:       { type: String, required: true },
  city:          { type: String, required: true },
  zipCode:       { type: String, required: true },
  cardNumber:    { type: String, default: '' },
  expiryDate:    { type: String, default: '' },
  cvv:           { type: String, default: '' },
  upiId:         { type: String, default: '' },
  paymentMethod: {
    type: String,
    enum: ['card', 'upi', 'cod'],
    default: 'card',
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed'],
    default: 'paid',
  },
  items:    [orderItemSchema],
  subtotal: { type: Number, required: true },
  shipping: { type: Number, required: true },
  total:    { type: Number, required: true },
  status: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'completed', 'cancelled'],
    default: 'pending',
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', orderSchema);
