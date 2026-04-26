const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      console.log('MONGO_URI not configured - running without database');
      return false;
    }
    
    // Add connection options
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    
    console.log(`MongoDB Connected: ${mongoose.connection.host}`);
    return true;
  } catch (error) {
    console.error(`MongoDB Error: ${error.message}`);
    // Don't exit - continue without database
    return false;
  }
};

module.exports = connectDB;