const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  console.log('MONGO_URI present:', !!process.env.MONGO_URI);
  
  if (!process.env.MONGO_URI) {
    console.log('MONGO_URI not set - running in demo mode');
    return false;
  }
  
  try {
    console.log('Attempting MongoDB connection...');
    await mongoose.connect(process.env.MONGO_URI);
    isConnected = true;
    console.log('MongoDB Connected successfully');
    return true;
  } catch (error) {
    console.log('MongoDB connection error:', error.message);
    // Continue anyway - we can run in demo mode
    return false;
  }
};

// Check connection status
const getConnectionStatus = () => isConnected;

module.exports = { connectDB, getConnectionStatus };