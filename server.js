// server.js - Starter Express server for Week 2 assignment

// Import required modules
const express = require('express');
const dotenv = require('dotenv');
require('colors');
const {errorHandler} = require('./middleware/errorHandler.js'); // Import the error handler middleware
const connectDB = require('./config/db.js');// Import the database connection function
const log = require('./utilities/logger');
const seedProducts = require('./seeder/productSeeder');
// const { v4: uuidv4 } = require('uuid');


dotenv.config()

connectDB();
// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(express.json());

app.use('/api/products',require('./routes/productRoute.js'));


//seeding directly in script
if (process.env.PRODUCT_SEED_DB === 'true') {
  seedProducts(); // 👈 runs the seeder
}






//errorMiddleware must be at the bottom of all routes
app.use(errorHandler);
// Sample in-memory products database




// Start the server
app.listen(PORT, () => {
  log.server(`Server is running on http://localhost:${PORT}`);
});

// Export the app for testing purposes
module.exports = app; 