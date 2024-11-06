// models/Location.js
const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    entityType: {
        type: String,
        enum: ['User', 'Bus'],
        required: true,
    },
    entityId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'entityType', // Reference to either User or Bus based on entityType
    },
    location: {
        latitude: {
            type: Number,
            required: true,
        },
        longitude: {
            type: Number,
            required: true,
        },
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Location', locationSchema);
