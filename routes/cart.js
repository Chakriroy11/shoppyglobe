const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const auth = require('../middleware/auth'); // Middleware to protect routes

// POST /cart: Add product to cart (Validation included)
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
        res.status(500).json({ error: "Server Error" });
    }
});

// DELETE /cart/:id: Remove product
router.delete('/:id', auth, async (req, res) => {
    try {
        const cart = await Cart.findOneAndUpdate(
            { userId: req.user.id },
            { $pull: { items: { productId: req.params.id } } },
            { new: true }
        );
        res.json({ message: "Removed from cart", cart });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;