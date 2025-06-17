const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    // user: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true,
    //     ref: 'User', // Reference to the User model
    // },
    name: {
        type: String,
        required: [true, 'Please add a product name'],
    },
    description:{
        type: String,
        required: [true, 'Please add a product description'],
    },
    price:{
        type: Number,
        required: [true, 'Please add a product price'],
        min:0,
    },
    category: {
    type: String,
    required: [true, 'Please add a product category'],
    },
    inStock: {
    type: Boolean,
    default: true,
    },

}, {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
});

module.exports = mongoose.model('Product', productSchema); // Export the Goal model





