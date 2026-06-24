const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/db");

dotenv.config();

// Database Connection
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

// Static Upload Folder
app.use(
  "/uploads",
  express.static("uploads")
);

// Routes
const authRoutes = require("./routes/authRoutes");
const activityRoutes = require("./routes/activityRoutes");
const profileRoutes = require("./routes/profileRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

// API Routes
app.use("/api/auth", authRoutes);

app.use(
  "/api/activities",
  activityRoutes
);

app.use(
  "/api/profile",
  profileRoutes
);

app.use(
  "/api/dashboard",
  dashboardRoutes
);

// Health Check
app.get("/", (req, res) => {
  res.json({
    success: true,
    message:
      "Team Activity Hub API Running",
  });
});

// Global Error Handler
app.use(
  (err, req, res, next) => {
    console.error(err.stack);

    res.status(500).json({
      success: false,
      message:
        "Internal Server Error",
    });
  }
);

// Start Server
const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});