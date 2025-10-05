const mongoose = require('mongoose');

const OrderItemSchema = new mongoose.Schema({
  name: String,
  price: Number,
  qty: Number
});

const OrderSchema = new mongoose.Schema({
  customerName: String,
  address: String,
  phone: String,
  items: [OrderItemSchema],
  total: Number,
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' },
  status: { type: String, default: 'placed' }, // placed, preparing, out-for-delivery, delivered
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', OrderSchema);
