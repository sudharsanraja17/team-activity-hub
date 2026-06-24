const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/db");

dotenv.config();

// Connect Database
connectDB();

const app = express();

/*
====================================
MIDDLEWARE
====================================
*/

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*
====================================
CORS FIX FOR VERCEL + LOCALHOST
====================================
*/

app.use(
  cors({
    origin: [
      "https://team-activity-hub.vercel.app",
      "http://localhost:5173",
    ],
    methods: [
      "GET",
      "POST",
      "PUT",
      "DELETE",
      "OPTIONS",
    ],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],
    credentials: true,
  })
);

/*
====================================
STATIC FILES
====================================
*/

app.use(
  "/uploads",
  express.static("uploads")
);

/*
====================================
ROUTES
====================================
*/

const authRoutes = require(
  "./routes/authRoutes"
);

const activityRoutes = require(
  "./routes/activityRoutes"
);

const profileRoutes = require(
  "./routes/profileRoutes"
);

const dashboardRoutes = require(
  "./routes/dashboardRoutes"
);

app.use(
  "/api/auth",
  authRoutes
);

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

/*
====================================
HEALTH CHECK
====================================
*/

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message:
      "Team Activity Hub API Running",
  });
});

/*
====================================
GLOBAL ERROR HANDLER
====================================
*/

app.use(
  (err, req, res, next) => {
    console.error(err);

    res.status(500).json({
      success: false,
      message:
        "Internal Server Error",
    });
  }
);

/*
====================================
SERVER
====================================
*/

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});