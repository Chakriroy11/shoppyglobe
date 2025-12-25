const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const auth = require('../middleware/auth'); // Protect cart routes

// POST /cart: Add product with validation
router.post('/', auth, async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        
        // Validation: Check if product ID exists in MongoDB
        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: "Product not found" });

        let cart = await Cart.findOne({ userId: req.user.id });
        if (!cart) {
            cart = new Cart({ userId: req.user.id, items: [{ productId, quantity }] });
        } else {
            cart.items.push({ productId, quantity });
        }
        await cart.save();
        res.status(201).json(cart);
    } catch (err) {
        res.status(500).json({ error: "Cast to ObjectId failed! Use a valid ID from Compass." });
    }
});

module.exports = router;