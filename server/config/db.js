const mongoose = require("mongoose");

let connectionPromise = null;

const connectDB = async () => {
  console.log("DB: connectDB called");
  console.log("DB: URI exists:", !!process.env.MONGODB_URI);

  if (mongoose.connection.readyState === 1) {
    console.log("DB: already connected");
    return mongoose.connection;
  }

  if (connectionPromise) {
    console.log("DB: connection already in progress");
    return connectionPromise;
  }

  connectionPromise = mongoose
    .connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 8000,
    })
    .then((conn) => {
      console.log("DB: MongoDB connected:", conn.connection.host);
      return conn;
    })
    .catch((error) => {
      connectionPromise = null;
      console.error("DB: MongoDB connection error:", error.message);
      throw error;
    });

  return connectionPromise;
};

module.exports = connectDB;