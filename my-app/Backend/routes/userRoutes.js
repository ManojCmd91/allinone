// routes/userRoutes.js
const express = require('express');
const { createUser, updateUserLocation } = require('../controllers/userController');

const router = express.Router();

// Route to create a new user
router.post('/register', createUser);

// Route to update user location
router.put('/:userId/location', updateUserLocation);

module.exports = router;
