const mongoose = require('mongoose');

const MenuItemSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String
});

const RestaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: String,
  cuisine: String,
  menu: [MenuItemSchema]
});

module.exports = mongoose.model('Restaurant', RestaurantSchema);
