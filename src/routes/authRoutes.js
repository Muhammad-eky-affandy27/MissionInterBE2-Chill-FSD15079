// Routes untuk autentikasi
const express = require("express");
const {
  register,
  login,
  verifyEmail,
} = require("../controllers/authController");

const router = express.Router();

// POST /register - Menambah user ke database
router.post("/register", register);

// POST /login - Melakukan login dengan email dan password
router.post("/login", login);

// GET /verify-email - Verifikasi token yang dikirim melalui email
router.get("/verify-email", verifyEmail);

module.exports = router;
