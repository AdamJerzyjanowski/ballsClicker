const mongoose = require('mongoose');

const PlayerSchema = mongoose.Schema({
    name: String,
    points: Number
}, {
    timestamps: true
});

module.exports = mongoose.model('Players', PlayerSchema);
