const Schema = require('../../models/usernames')
const { Command } = require('reconlx');

module.exports = new Command({
    name: "link",
    aliases: ['linke'],
    description: 'links your minecraft account.',
    args: '[username]',
    examples: ['_Duro_'],
    run: async ({ client, message, args }) => {

        // Function to check if username is not valid
        function notValid(str) {
            var regex = /[ !@#$%^&()+\-=\[\]{};':"\\|,.<>\/?]/g;
            return regex.test(str);
        }

        // Create variable for username and for mongodb filter
        const Username = args.join(" ")
        const filter = { userID: message.author.id };

        // Check if the username is not defined or invalid and return error message
        if (!Username) return client.errorEmbed(message, `Invalid arguments. \`${client.config.prefix}help ${module.exports.name}\``)
        if (notValid(Username) === true) return client.errorEmbed(message, "Please input a valid username.");

        // Find usenrame based on data
        Schema.findOne(filter, async (err, data) => {
            // Error logging
            if (err) console.log(err);

            // If there is data set username to new username
            if (data) data.username = Username;

            // If there is no database entry, create a new one with username
            else {
                data = new Schema({
                    username: Username,
                    userID: message.author.id
                });
            }

            // Save data
            data.save();
        });

        // Send success embed after data is saved
        client.successEmbed(message, `Your account \`${Username}\` has been successfully linked.`);

    },
});