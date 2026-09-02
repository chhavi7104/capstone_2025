require("dotenv").config();

const connectDB = require("./config/db");
const app = require("./app");

// Vercel/serverless handler
const handler = async (req, res) => {
  try {
    await connectDB();
    return app(req, res);
  } catch (error) {
    console.error("Database connection failed:", error);

    return res.status(500).json({
      success: false,
      message: "Database connection failed",
    });
  }
};

module.exports = handler;

// Local development
if (require.main === module) {
  const PORT = process.env.PORT || 5000;

  connectDB()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
      });
    })
    .catch((error) => {
      console.error("Failed to start server:", error);
    });
}