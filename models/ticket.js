const mongoose = require('mongoose');

const ticketSchema = mongoose.Schema({
    creatorID: String,
    channelID: String,
    guildID: String,
    createdAt: String,
    claimed: Boolean,
    addedUsers: Array
});

module.exports = mongoose.model('Ticket', ticketSchema, 'tickets');