const mongoose = require('mongoose');
const Book = require('../Models/Book_Model')
// Create a Product schema
const productSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    image: String
});

// Create a Product model
const Product = mongoose.model('Product', productSchema);

// Create a Cart schema
const cartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    items: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
            quantity: Number,
            price: Number
        }
    ],
    total: {
        type: Number,
        default: 0
      }
    
});

// Create a Cart model
const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart