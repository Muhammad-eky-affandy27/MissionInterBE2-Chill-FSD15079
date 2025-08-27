// Controller untuk mengelola data film
const db = require("../config/database");

// Mendapatkan semua film dengan filter, sort, dan pencarian
const getMovies = async (req, res) => {
  try {
    const { genre, sortBy, search } = req.query;

    // Query dasar
    let query = db("MovieTable")
      .join("GenreTable", "MovieTable.GenreID", "GenreTable.GenreID")
      .select("MovieID", "MovieName", "GenreTable.GenreName");

    // Filter berdasarkan genre
    if (genre) {
      query = query.where("GenreTable.GenreName", genre);
    }

    // Pencarian berdasarkan nama film
    if (search) {
      query = query.where("MovieName", "like", `%${search}%`);
    }

    // Pengurutan hasil
    if (sortBy) {
      const [column, order] = sortBy.split(":");
      query = query.orderBy(column, order || "asc");
    } else {
      query = query.orderBy("MovieID", "asc");
    }

    const movies = await query;

    res.json(movies);
  } catch (error) {
    console.error("Error get movies:", error);
    res.status(500).json({
      error: "Terjadi kesalahan server.",
    });
  }
};

module.exports = { getMovies };
