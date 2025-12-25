require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import Routes
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const cartRoutes = require('./routes/cart');

const app = express();

// 1. Middleware Setup (Requirement 1)
app.use(cors());
app.use(express.json()); // Parses incoming JSON requests

// 2. MongoDB Connection (Requirement 2)
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected Successfully to Compass"))
    .catch(err => {
        console.error("❌ MongoDB Connection Error:", err.message);
        process.exit(1); // Exit process with failure
    });

// 3. API Routes (Requirement 1 & 4)
app.use('/api', authRoutes);     // Handles /register and /login
app.use('/api', productRoutes);  // Handles GET /products and /products/:id
app.use('/api/cart', cartRoutes); // Handles POST, PUT, DELETE /cart (Protected)

// 4. Global Error Handling Middleware (Requirement 3)
// This catches any errors passed to next() in your routes
app.use((err, req, res, next) => {
    console.error('Global Error Handler:', err.stack);
    
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error",
        // Only show stack trace in development
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
});

// 5. Handle 404 Routes
app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});