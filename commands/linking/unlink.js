const Schema = require('../../models/usernames')
const { Command } = require('reconlx');

module.exports = new Command({
    name: "unlink",
    description: 'unlinks your minecraft account.',
    run: async ({ client, message }) => {

        // Create filter for mongodb
        const filter = { userID: message.author.id };

        // Delete record and send success embed
        Schema.deleteOne(filter, function (err) { });
        client.successEmbed(message, `Your account has been successfully unlinked.`)
    },
});