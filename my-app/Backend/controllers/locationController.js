// controllers/locationController.js
const User = require('../models/User');
const Bus = require('../models/Bus');

// Calculate distance between two points (Haversine formula)
const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371; // Radius of Earth in kilometers

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
};

// Compare user and bus locations
const compareLocations = async (req, res) => {
    try {
        const { userId, busId } = req.params;

        const user = await User.findById(userId);
        const bus = await Bus.findById(busId);

        if (!user || !bus) {
            return res.status(404).json({ message: 'User or Bus not found' });
        }

        const distance = calculateDistance(
            user.location.latitude,
            user.location.longitude,
            bus.location.latitude,
            bus.location.longitude
        );

        const isNearby = distance < 1; // Check if distance is within 1 km, adjust as needed

        res.status(200).json({
            message: `User and bus are ${isNearby ? 'nearby' : 'not nearby'}`,
            distance: distance.toFixed(2),
        });
    } catch (error) {
        res.status(500).json({ message: 'Error comparing locations', error });
    }
};

module.exports = {
    compareLocations,
};
