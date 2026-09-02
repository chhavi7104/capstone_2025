const mongoose = require("mongoose");

let connectionPromise = null;

const connectDB = async () => {
  // Already connected
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  // Connection already in progress
  if (connectionPromise) {
    return connectionPromise;
  }

  connectionPromise = mongoose
    .connect(process.env.MONGODB_URI)
    .then((conn) => {
      console.log(`MongoDB connected: ${conn.connection.host}`);
      return conn;
    })
    .catch((error) => {
      connectionPromise = null;
      console.error(`MongoDB connection error: ${error.message}`);
      throw error;
    });

  return connectionPromise;
};

module.exports = connectDB;