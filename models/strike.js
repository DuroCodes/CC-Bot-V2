const mongoose = require('mongoose');

const strikeSchema = mongoose.Schema({
    userID: {
        type: String,
        required: true
    },
    strikes: {
        type: [Object],
        required: true
    }
});

module.exports = mongoose.model('Strikes', strikeSchema, 'strikes');