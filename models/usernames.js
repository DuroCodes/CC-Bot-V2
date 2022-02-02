const { Schema, model } = require('mongoose');

const usernames = new Schema({
    userID: String,
    username: String
});

module.exports = model("username", usernames);