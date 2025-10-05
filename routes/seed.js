require('dotenv').config();
const mongoose = require('mongoose');
const Restaurant = require('./models/Restaurant');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/food_delivery';

const seed = async () => {
  await mongoose.connect(MONGO_URI);
  await Restaurant.deleteMany({});

  const data = [
    {
      name: 'Green Garden',
      address: '123 Main St',
      cuisine: 'Vegetarian',
      menu: [
        { name: 'Paneer Butter Masala', price: 200, description: 'Creamy paneer gravy' },
        { name: 'Veg Biryani', price: 150, description: 'Spiced rice with vegetables' }
      ]
    },
    {
      name: 'Spice Hub',
      address: '45 Food Lane',
      cuisine: 'Indian',
      menu: [
        { name: 'Chicken Biryani', price: 250, description: 'Hyderabadi style' },
        { name: 'Butter Chicken', price: 220, description: 'Rich tomato gravy' }
      ]
    }
  ];

  for (const r of data) {
    const rest = new Restaurant(r);
    await rest.save();
  }

  console.log('Seeded restaurants');
  mongoose.connection.close();
};

seed().catch(err => console.error(err));
