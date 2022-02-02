const mongoose = require('mongoose');

const leaderboardSchema = mongoose.Schema({
    userID: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Leaderboard', leaderboardSchema, 'leaderboard');