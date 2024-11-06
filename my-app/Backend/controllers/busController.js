// controllers/busController.js
const Bus = require('../models/Bus');

// Register a new bus
const registerBus = async (req, res) => {
    try {
        const { busNumber, route, location } = req.body;
        const bus = new Bus({ busNumber, route, location });
        await bus.save();
        res.status(201).json({ message: 'Bus registered successfully!', bus });
    } catch (error) {
        res.status(500).json({ message: 'Error registering bus', error });
    }
};

// Update bus location
const updateBusLocation = async (req, res) => {
    try {
        const { busId } = req.params;
        const { latitude, longitude } = req.body;

        const bus = await Bus.findByIdAndUpdate(
            busId,
            { location: { latitude, longitude } },
            { new: true }
        );

        if (!bus) {
            return res.status(404).json({ message: 'Bus not found' });
        }

        res.status(200).json({ message: 'Bus location updated', bus });
    } catch (error) {
        res.status(500).json({ message: 'Error updating location', error });
    }
};

module.exports = {
    registerBus,
    updateBusLocation,
};
