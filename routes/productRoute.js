const express = require('express');
const router = express.Router();

// Import controller functions
const {
  addProduct,
  getProducts,
  getProductById,
  getProductByName,
  getProductsByFilter,
  updateProduct,
  deleteProduct,
  deleteAllProduct,
} = require('../controllers/productController');

// Route: POST /api/products
router.post('/', addProduct);

// Route: GET /api/products
router.get('/', getProducts);

// Route: GET /api/products/filter?category=...&inStock=...&maxPrice=...
router.get('/filter', getProductsByFilter);

// Route: GET /api/products/name/:name
router.get('/name/:name', getProductByName);

// Route: GET /api/products/:id
router.get('/:id', getProductById);

// Route: PUT /api/products/:id
router.put('/:id', updateProduct);

// Route: DELETE /api/products/:id
router.delete('/:id', deleteProduct);

// Route: DELETE /api/products
router.delete('/', deleteAllProduct);

module.exports = router;
