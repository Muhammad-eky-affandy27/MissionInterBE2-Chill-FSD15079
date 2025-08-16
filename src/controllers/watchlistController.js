const Watchlist = require("../models/watchlistModel");

exports.getAll = async (req, res) => {
  try {
    const watchlists = await Watchlist.getAll();
    res.json(watchlists);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const watchlist = await Watchlist.getById(req.params.id);
    if (!watchlist)
      return res.status(404).json({ message: "Data tidak ditemukan" });
    res.json(watchlist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const id = await Watchlist.create(req.body);
    res.status(201).json({ id, ...req.body });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    await Watchlist.update(req.params.id, req.body);
    res.json({ message: "Data berhasil diperbarui" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    await Watchlist.delete(req.params.id);
    res.json({ message: "Data berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
