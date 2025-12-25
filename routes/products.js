const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// GET /products: Fetch a list of products from MongoDB [Requirement 1]
router.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: "Error fetching products" });
    }
});

// GET /products/:id: Fetch details of a single product by its ID [Requirement 1]
router.get('/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: "Invalid Product ID format" });
    }
});

module.exports = router;