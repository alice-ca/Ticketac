const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    lastName: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    lastTrips: [{ type: mongoose.Schema.Types.ObjectId, ref: 'journeys' }],
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;