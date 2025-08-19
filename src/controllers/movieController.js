const db = require("../config/database");

// Get all movies
const getAllMovies = (req, res) => {
  const query = `
    SELECT MovieID, MovieName, GenreTable.GenreName 
    FROM MovieTable 
    INNER JOIN GenreTable ON MovieTable.GenreID = GenreTable.GenreID
  `;

  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
};

// Get movie by id
const getMovieById = (req, res) => {
  const id = req.params.id;
  const query = `
    SELECT MovieID, MovieName, GenreTable.GenreName 
    FROM MovieTable 
    INNER JOIN GenreTable ON MovieTable.GenreID = GenreTable.GenreID 
    WHERE MovieID = ?
  `;

  db.query(query, [id], (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      if (results.length > 0) {
        res.json(results[0]);
      } else {
        res.status(404).send("Movie not found");
      }
    }
  });
};

// Add a new movie
const addMovie = (req, res) => {
  const { MovieName, GenreID } = req.body;
  const query = "INSERT INTO MovieTable (MovieName, GenreID) VALUES (?, ?)";

  db.query(query, [MovieName, GenreID], (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res
        .status(201)
        .json({ message: "Movie added successfully", id: results.insertId });
    }
  });
};

// Update a movie
const updateMovie = (req, res) => {
  const id = req.params.id;
  const { MovieName, GenreID } = req.body;
  const query =
    "UPDATE MovieTable SET MovieName = ?, GenreID = ? WHERE MovieID = ?";

  db.query(query, [MovieName, GenreID, id], (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      if (results.affectedRows === 0) {
        res.status(404).send("Movie not found");
      } else {
        res.json({ message: "Movie updated successfully" });
      }
    }
  });
};

// Delete a movie
const deleteMovie = (req, res) => {
  const id = req.params.id;
  const query = "DELETE FROM MovieTable WHERE MovieID = ?";

  db.query(query, [id], (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      if (results.affectedRows === 0) {
        res.status(404).send("Movie not found");
      } else {
        res.json({ message: "Movie deleted successfully" });
      }
    }
  });
};

module.exports = {
  getAllMovies,
  getMovieById,
  addMovie,
  updateMovie,
  deleteMovie,
};
