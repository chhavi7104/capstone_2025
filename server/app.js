const express = require("express");
const cors = require("cors");
const collegeRoutes = require("./routes/collegeRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const app = express();

// Only allow the configured frontend origin to call this API.
const corsOptions = {
  origin: process.env.CLIENT_URL,
};
app.use(cors(corsOptions));

// Parse incoming JSON request bodies
app.use(express.json());

// Health-check endpoint — used to verify the API is up and reachable
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "College Discovery API is running",
  });
});

// College routes
app.use("/api/colleges", collegeRoutes);

// 404 handler for unmatched routes
app.use(notFound);

// Centralized error handler (must be the last piece of middleware)
app.use(errorHandler);

module.exports = app;
