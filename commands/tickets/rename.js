const Ticket = require("../../models/ticket.js");
const { Command } = require('reconlx');

module.exports = new Command({
    name: "rename",
    aliases: ['rn'],
    description: 'renames a ticket.',
    args: '[name]',
    examples: ['ticket-name'],
    run: async ({ client, message, args }) => {

        // Check if channel is a valid ticket
        const currentTicket = await Ticket.findOne({ guildID: message.guild.id, channelID: message.channel.id });
        if (!currentTicket) return client.errorEmbed(message, `This channel is not a valid ticket or is not stored in the database.`);

        // Find ticket logs channel
        const logsChannel = message.guild.channels.cache.find(ch => ch.name === "┃ticket-logs");
        if (!logsChannel) return client.errorEmbed(message, `The \`#┃ticket-logs\` channel could not be found.`);

        // Find support role
        const supportRole = message.guild.roles.cache.find(r => r.name === "꒰Support Team꒱");
        if (!supportRole) return client.errorEmbed(message, `The \`꒰Support Team꒱\` role could not be found.`);

        // Get new name from args
        const name = args.join(' ');
        if (!name) return client.errorEmbed(message, `Invalid arguments. \`${client.config.prefix}help ${module.exports.name}\``)

        // Set new name and send success message
        message.channel.setName(name);
        client.successEmbed(message, `The channel was successfully renamed to \`${name}\``);
    },
});