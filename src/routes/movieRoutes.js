const express = require("express");
const router = express.Router();
const {
  getAllMovies,
  getMovieById,
  addMovie,
  updateMovie,
  deleteMovie,
} = require("../controllers/movieController");

router.get("/movies", getAllMovies);
router.get("/movie/:id", getMovieById);
router.post("/movie", addMovie);
router.patch("/movie/:id", updateMovie);
router.delete("/movie/:id", deleteMovie);

module.exports = router;
