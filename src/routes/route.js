const express = require('express');
const router = express.Router();
const watchlistController = require('../controllers/watchlistController');

// Endpoint GET (SELECT)
router.get('/watchlists', watchlistController.getAll);
router.get('/watchlists/:id', watchlistController.getById);

// Endpoint POST (INSERT)
router.post('/watchlists', watchlistController.create);

// Endpoint PATCH (UPDATE)
router.patch('/watchlists/:id', watchlistController.update);

// Endpoint DELETE (DELETE)
router.delete('/watchlists/:id', watchlistController.delete);

module.exports = router;