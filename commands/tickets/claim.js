const { MessageEmbed } = require('discord.js');
const Ticket = require("../../models/ticket.js");
const { Command } = require('reconlx');

module.exports = new Command({
    name: "claim",
    aliases: ['cl'],
    description: 'claims a ticket.',
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
        if (currentTicket.creatorID === user.id) return client.errorEmbed(message, `You cannot claim your own ticket.`);
        if (currentTicket.claimed === true) return client.errorEmbed(message, `This ticket is already claimed.`)

        // Update permissions
        message.channel.permissionOverwrites.create(user.id, { VIEW_CHANNEL: true });
        message.channel.permissionOverwrites.create(supportRole.id, { VIEW_CHANNEL: false });

        // Create embed
        const embed = new MessageEmbed()
            .setTitle("✅ | Ticket Claimed")
            .setDescription(`You will now be assisted by ${user}`)
            .setColor(client.colors.green);

        // Delete message
        message.delete();

        // Send embed
        message.channel.send({ embeds: [embed] });

        // Set claimed to true in database
        await Ticket.updateOne({ guildID: message.guild.id, channelID: message.channel.id }, { claimed: true });
        currentTicket.save();
    },
});