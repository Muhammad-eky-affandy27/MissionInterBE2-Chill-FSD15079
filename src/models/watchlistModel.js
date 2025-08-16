const db = require("../config/database");

class Watchlist {
  static async getAll() {
    const [rows] = await db.query("SELECT * FROM WatchList");
    return rows;
  }

  static async getById(id) {
    const [rows] = await db.query(
      "SELECT * FROM WatchList WHERE WatchlistID = ?",
      [id]
    );
    return rows[0];
  }

  static async create(data) {
    const { UserID, MovieID, MovieName, GenreID, SeriesID, SeriesName } = data;
    const [result] = await db.query(
      "INSERT INTO WatchList (UserID, MovieID, MovieName, GenreID, SeriesID, SeriesName) VALUES (?, ?, ?, ?, ?, ?)",
      [UserID, MovieID, MovieName, GenreID, SeriesID, SeriesName]
    );
    return result.insertId;
  }

  static async update(id, data) {
    const { MovieName, SeriesName } = data;
    await db.query(
      "UPDATE WatchList SET MovieName = ?, SeriesName = ? WHERE WatchlistID = ?",
      [MovieName, SeriesName, id]
    );
  }

  static async delete(id) {
    await db.query("DELETE FROM WatchList WHERE WatchlistID = ?", [id]);
  }
}

module.exports = Watchlist;
