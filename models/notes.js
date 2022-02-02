const { Schema, model } = require('mongoose');

const noteSchema = Schema({
    userID: {
        type: String,
        required: true
    },
    notes: {
        type: [Object],
        required: true
    }
});

module.exports = model('Notes', noteSchema, 'notes');