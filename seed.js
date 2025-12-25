const mongoose = require('mongoose');
const dotenv = require('dotenv');
// Ensure this path matches where your Product model is located
const Product = require('./models/Product'); 

dotenv.config();

const products = [
  {
    "name": "Classic White Sneakers",
    "price": 59.99,
    "description": "Premium leather sneakers with a minimalist design.",
    "stock": 50,
    "category": "Footwear"
  },
  {
    "name": "Wireless Noise-Canceling Headphones",
    "price": 199.99,
    "description": "High-fidelity audio with active noise cancellation.",
    "stock": 30,
    "category": "Electronics"
  },
  {
    "name": "Organic Cotton T-Shirt",
    "price": 25.00,
    "description": "Soft, sustainable cotton tee in multiple colors.",
    "stock": 100,
    "category": "Apparel"
  },
  {
    "name":"Essence Mascara Lash Princess",
    "price": 9.99,
    "description":"The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.",
    "stock": 200,
    "category":"Beauty"
  }
  
];

const seedDatabase = async () => {
  try {
    // 1. Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB for seeding...");

    // 2. Clear existing data (to avoid duplicates)
    await Product.deleteMany({});
    console.log("Existing products cleared.");

    // 3. Insert the new products
    await Product.insertMany(products);
    console.log("✅ Database successfully seeded with frontend products!");

    // 4. Close the connection
    process.exit();
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
};

seedDatabase();