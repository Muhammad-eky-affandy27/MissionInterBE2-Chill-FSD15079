// Routes untuk upload gambar
const express = require("express");
const upload = require("../middleware/uploadMiddleware");
const { uploadImage } = require("../controllers/uploadController");
const { verifyToken } = require("../middleware/authMiddleware");

const router = express.Router();

// POST /upload - Untuk melakukan upload gambar
router.post("/upload", verifyToken, upload.single("file"), uploadImage);

module.exports = router;
