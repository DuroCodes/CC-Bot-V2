const Ticket = require("../../models/ticket.js");
const { MessageEmbed } = require('discord.js');
const { Command } = require('reconlx');

module.exports = new Command({
    name: "unclaim",
    aliases: ['uncl'],
    description: 'unclaims a ticket.',
    run: async ({ client, message }) => {

        // Get user that runs command 
        const user = message.author;

        // Get support roles
        const supportRole = message.guild.roles.cache.find(r => r.name === "꒰Support Team꒱");
        if (!supportRole) return client.errorEmbed(message, `The \`꒰Support Team꒱\` role could not be found.`);
        if (!message.member.roles.cache.some(role => role.name === '꒰Support Team꒱')) return client.errorEmbed(message, `You do not have the \`꒰Support Team꒱\` role.`);

        // Get current info about ticket
        const currentTicket = await Ticket.findOne({ guildID: message.guild.id, channelID: message.channel.id });
        if (!currentTicket) return client.errorEmbed(message, `This channel is not a valid ticket or is not stored in the database.`);
        if (currentTicket.creatorID === user.id) return client.errorEmbed(message, `You cannot unclaim your own ticket.`);
        if (currentTicket.claimed === 0) return client.errorEmbed(message, `This ticket is not claimed.`)

        // Update permissions
        message.channel.permissionOverwrites.delete(user.id);
        message.channel.permissionOverwrites.create(supportRole.id, { VIEW_CHANNEL: true });

        // Create embed
        const embed = new MessageEmbed()
            .setTitle("✅ | Ticket Unclaimed")
            .setDescription(`The ticket was unclaimed by ${user}`)
            .setColor(client.colors.green);

        // Delete message
        message.delete();

        // Send embed
        message.channel.send({ embeds: [embed] });

        // Set claimed to falsein database
        await Ticket.updateOne({ guildID: message.guild.id, channelID: message.channel.id }, { claimed: false });
        currentTicket.save();
    },
});