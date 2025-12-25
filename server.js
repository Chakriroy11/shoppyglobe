require('dotenv').config(); // Load environment variables from .env
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import Route Handlers
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const cartRoutes = require('./routes/cart');

const app = express();

// --- 1. Middleware Setup (Requirement 1) ---
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Essential: Parse incoming JSON request bodies

// --- 2. MongoDB Database Connection (Requirement 2) ---
// Connects to local MongoDB Compass via URI in .env
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected Successfully to Compass"))
    .catch(err => {
        console.error("❌ MongoDB Connection Error:", err.message);
        process.exit(1); // Stop server if database is not running
    });

// --- 3. API Route Registration (Requirement 1 & 4) ---
// Authentication routes (Register/Login)
app.use('/api', authRoutes);

// Product routes (Public: GET /products, GET /products/:id)
app.use('/api', productRoutes);

// Cart routes (Protected: POST, PUT, DELETE /cart)
app.use('/api/cart', cartRoutes);

// --- 4. Global Error Handling Middleware (Requirement 3) ---
// This ensures that any error in the system returns a proper JSON response instead of crashing
app.use((err, req, res, next) => {
    console.error('Captured Error:', err.stack);
    
    // Default to 500 Internal Server Error if no status code is provided
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
});

// Handle 404 - Route Not Found
app.use((req, res) => {
    res.status(404).json({ message: "API Route not found" });
});

// --- 5. Server Initialization ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 ShoppyGlobe Backend running on http://localhost:${PORT}`);
});