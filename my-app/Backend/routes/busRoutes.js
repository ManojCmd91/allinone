// routes/busRoutes.js
const express = require('express');
const { registerBus, updateBusLocation } = require('../controllers/busController');

const router = express.Router();

// Route to register a new bus
router.post('/register', registerBus);

// Route to update bus location
router.put('/:busId/location', updateBusLocation);

module.exports = router;
