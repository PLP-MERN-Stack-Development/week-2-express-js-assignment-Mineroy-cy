// seeder.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../model/productModel'); // example model
const log = require('../utilities/logger');

dotenv.config();

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await Product.deleteMany(); // clear old data
    const products = [
      { name: 'laptop',
        description: 'High-performance laptop with 16GB RAM',
        price: 1200,
        category: 'electronics',
        inStock: true },
      { name: 'smartphone',
        description: 'Latest model with 128GB storage',
        price: 800,
        category: 'electronics',
        inStock: true
       },
      { name: 'coffee maker',
        description: 'Programmable coffee maker with timer',
        price: 50,
        category: 'kitchen',
        inStock: false
       }
    ];
    await Product.insertMany(products);

    log.success('Database seeded with products!');
    process.exit();
  } catch (error) {
    log.error(`Seeding failed: ${error.message}`);
    process.exit(1);
  }
};

module.exports = seedProducts;
