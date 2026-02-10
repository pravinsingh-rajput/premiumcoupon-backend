require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const locationRoutes = require("./routes/location");

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Website visit tracking API
app.use("/api/locations", locationRoutes);

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Error", error: err.message });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Website Visit Tracker running on port ${PORT}`);
});
