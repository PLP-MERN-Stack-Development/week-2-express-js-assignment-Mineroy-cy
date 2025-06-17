// controllers/productController.js

const asyncHandler = require('express-async-handler');
const Product = require('../model/productModel');
const Joi = require('joi');

// Joi schema for validation
const productValidationSchema = Joi.object({
  name: Joi.string().min(1).required(),
  price: Joi.number().positive().required(),
  category: Joi.string().required(),
  description: Joi.string().min(10).required(),
  inStock: Joi.boolean().required(),
});

// @desc    Create a new product
// @route   POST /api/products
// @access  Private
const addProduct = asyncHandler(async (req, res) => {
  const { error } = productValidationSchema.validate(req.body);
  if (error) {
    res.status(400);
    throw new Error(error.details[0].message);
  }

  const product = await Product.create(req.body);
  res.status(201).json(product);
});

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();
  res.status(200).json(products);
});

// @desc    Get product by ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }
  res.status(200).json(product);
});

// @desc    Get product by name
// @route   GET /api/products/name/:name
// @access  Public
const getProductByName = asyncHandler(async (req, res) => {
  const product = await Product.findOne({ name: req.params.name });
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }
  res.status(200).json(product);
});

// @desc    Filter products by query params
// @route   GET /api/products/filter
// @access  Public
const getProductsByFilter = asyncHandler(async (req, res) => {
  const { category, inStock, maxPrice } = req.query;

  const filter = {};
  if (category) filter.category = category;
  if (inStock !== undefined) filter.inStock = inStock === 'true';
  if (maxPrice) filter.price = { $lte: parseFloat(maxPrice) };

  const products = await Product.find(filter);
  res.status(200).json(products);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private
const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedProduct);
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  await product.deleteOne();
  res.status(200).json({ message: 'Product deleted', id: req.params.id });
});

// @desc    Delete all products
// @route   DELETE /api/products
// @access  Private
const deleteAllProduct = asyncHandler(async (req, res) => {
  await Product.deleteMany({});
  res.status(200).json({ message: 'All products deleted' });
});

// Export all functions
module.exports = {
  addProduct,
  getProducts,
  getProductById,
  getProductByName,
  getProductsByFilter,
  updateProduct,
  deleteProduct,
  deleteAllProduct,
};
