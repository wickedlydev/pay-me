require("dotenv").config();
const express = require("express");
const cors = require('cors');
const mainRouter = require('../routes/index');

const app = express(); // 1. Define app FIRST

// 2. Middleware
app.use(cors());
app.use(express.json());

// 3. Debug/Health Check Routes
app.get("/debug", (req, res) => {
  res.json({ 
    status: "Server is running", 
    directory: __dirname,
    time: new Date().toISOString(),
    env_loaded: !!process.env.MONGO_URL // Checks if DB URL is found
  });
});

app.get("/", (req, res) => {
  res.send("Server is alive");
});

// 4. Main Router
app.use("/api/v1", mainRouter);

// 5. Catch-all for 404s (Add this)
app.use((req, res) => {
  res.status(404).json({ error: "Route not found on Vercel" });
});

// 5. Export for Vercel
module.exports = app;