const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // connect using the URI from your .env file
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected Successfully to Compass");
  } catch (err) {
    console.error("❌ MongoDB Connection Failed:", err.message);
    process.exit(1); // Stop the server if database connection fails
  }
};

module.exports = connectDB;