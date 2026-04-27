require("dotenv").config();
const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const adminAkunRoutes = require("./routes/adminAkunRoutes");
const ortuRoutes = require("./routes/ortuRoutes");
const presensiRoutes = require("./routes/presensiRoutes");
const guruRoutes = require("./routes/guruRoutes");

const app = express();

/* ===============================
   CORS CONFIG
================================= */
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://sd-gmim-12-manado.vercel.app"
];

app.use(
  cors({
    origin: function(origin, callback) {
      // request dari postman / mobile app / server-to-server
      if (!origin) return callback(null, true);

      // whitelist manual
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      // semua subdomain vercel preview deploy
      if (origin.endsWith(".vercel.app")) {
        return callback(null, true);
      }

      return callback(new Error("CORS blocked: " + origin));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

/* ===============================
   MIDDLEWARE
================================= */
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

/* ===============================
   HEALTH CHECK
================================= */
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "SD GMIM API running",
    environment: process.env.NODE_ENV || "development"
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    status: "OK",
    timestamp: new Date().toISOString()
  });
});

/* ===============================
   API ROUTES
================================= */
app.use("/api/auth", authRoutes);
app.use("/api/admin/akun", adminAkunRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/guru", guruRoutes);
app.use("/api/ortu", ortuRoutes);
app.use("/api/ortu/presensi", presensiRoutes);

/* ===============================
   404 HANDLER
================================= */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Endpoint not found"
  });
});

/* ===============================
   GLOBAL ERROR HANDLER
================================= */
app.use((err, req, res, next) => {
  console.error("ERROR:", err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error"
  });
});

/* ===============================
   SERVER START
================================= */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
