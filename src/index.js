const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

// Import routes
const authRoutes = require("./routes/authRoutes");
const movieRoutes = require("./routes/movieRoutes");
const uploadRoutes = require("./routes/uploadRoutes");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/", authRoutes);
app.use("/", movieRoutes);
app.use("/", uploadRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);

  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        error: "File terlalu besar. Maksimal 5MB.",
      });
    }
  }

  res.status(500).json({
    error: "Terjadi kesalahan server.",
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: "Endpoint tidak ditemukan.",
  });
});

// Buat folder uploads jika belum ada
const fs = require("fs");
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

app.listen(port, () => {
  console.log(`Server berjalan di port ${port}`);
});
