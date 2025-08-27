// Routes untuk mengelola data film
const express = require("express");
const { getMovies } = require("../controllers/movieController");
const { verifyToken } = require("../middleware/authMiddleware");

const router = express.Router();

// GET /movie - Mendapatkan data film dengan query params
router.get("/movie", verifyToken, getMovies);

module.exports = router;
