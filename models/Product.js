const mongoose = require('mongoose');

// Requirement: Each product should have name, price, description, and stockQuantity
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    stockQuantity: { type: Number, required: true }
});

module.exports = mongoose.model('Product', productSchema);