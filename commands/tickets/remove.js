const { MessageEmbed } = require('discord.js');
const Ticket = require("../../models/ticket.js");
const { Command } = require('reconlx');

module.exports = new Command({
    name: "remove",
    aliases: ['unadd', 'ua', 'r', 'rem'],
    description: 'removes a user from a ticket.',
    args: '[user]',
    examples: ['@Duro#5232', '283312847478325251'],
    run: async ({ client, message, args }) => {

        // Get user to add 
        const user = message.mentions.members.first() || client.users.cache.get(args[0]);
        if (!user) return client.errorEmbed(message, `Invalid arguments. \`${client.config.prefix}help ${module.exports.name}\``)

        // Get support roles
        const supportRole = message.guild.roles.cache.find(r => r.name === "꒰Support Team꒱");
        if (!supportRole) return client.errorEmbed(message, `The \`꒰Support Team꒱\` role could not be found.`);
        if (!message.member.roles.cache.some(role => role.name === '꒰Support Team꒱')) return client.errorEmbed(message, `You do not have the \`꒰Support Team꒱\` role.`);

        // Get current info about ticket
        const currentTicket = await Ticket.findOne({ guildID: message.guild.id, channelID: message.channel.id });
        if (!currentTicket) return client.errorEmbed(message, `This channel is not a valid ticket or is not stored in the database.`);
        if (currentTicket.creatorID === user.id) return client.errorEmbed(message, `You cannot remove the owner of the ticket from their ticket.`);
        if (!currentTicket.addedUsers.includes(user.id)) return client.errorEmbed(message, `This user is not added to the ticket.`);

        // Update permissions
        message.channel.permissionOverwrites.create(user.id, { VIEW_CHANNEL: true });

        // Create embed
        const embed = new MessageEmbed()
            .setTitle("✅ | Removed User")
            .setDescription(`${user} has been removed from the ticket.`)
            .setColor(client.colors.green);

        // Delete message
        message.delete();

        // Send embed
        message.channel.send({ embeds: [embed] });

        // Update database
        await Ticket.updateOne({ guildID: message.guild.id, channelID: message.channel.id }, { $pull: { addedUsers: user.id } });
        currentTicket.save();
    },
});