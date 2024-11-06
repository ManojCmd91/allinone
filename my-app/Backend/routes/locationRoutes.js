// routes/locationRoutes.js
const express = require('express');
const { compareLocations } = require('../controllers/locationController');

const router = express.Router();

// Route to compare user and bus locations
router.get('/compare/:userId/:busId', compareLocations);

module.exports = router;
