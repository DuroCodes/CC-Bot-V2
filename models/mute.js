const mongoose = require('mongoose');

const rS = {
    type: String,
    required: true
};

const muteSchema = mongoose.Schema({
    userID: rS,
    guildID: rS,
    reason: rS,
    staffID: rS,
    staffTag: rS,
    expires: {
        type: Date,
        required: true
    },
    current: {
        type: Boolean,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Mutes', muteSchema, 'mutes');