// controllers/userController.js
const User = require('../models/User');

// Create a new user
const createUser = async (req, res) => {
    try {
        const { name, email, location } = req.body;
        const user = new User({ name, email, location });
        await user.save();
        res.status(201).json({ message: 'User created successfully!', user });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
};

// Update user location
const updateUserLocation = async (req, res) => {
    try {
        const { userId } = req.params;
        const { latitude, longitude } = req.body;

        const user = await User.findByIdAndUpdate(
            userId,
            { location: { latitude, longitude } },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User location updated', user });
    } catch (error) {
        res.status(500).json({ message: 'Error updating location', error });
    }
};

module.exports = {
    createUser,
    updateUserLocation,
};
