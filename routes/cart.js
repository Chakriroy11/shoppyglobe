const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const auth = require('../middleware/auth');

// POST /cart - Add to cart with validation
router.post('/', auth, async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        // Check if product exists in MongoDB [Requirement 3]
        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: "Product does not exist" });

        let cart = await Cart.findOne({ userId: req.user.id });
        if (!cart) {
            cart = new Cart({ userId: req.user.id, items: [{ productId, quantity }] });
        } else {
            cart.items.push({ productId, quantity });
        }
        await cart.save();
        res.status(201).json(cart);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;