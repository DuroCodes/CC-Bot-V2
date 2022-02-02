const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const Ticket = require("../../models/ticket.js");
const { Command } = require('reconlx');

module.exports = new Command({
    name: "new",
    aliases: ['open', 'ot', 'newticket', 'nt', 'n'],
    description: 'opens a ticket from input.',
    args: '(reason)',
    examples: ['server glitch'],
    run: async ({ client, message, args }) => {

        // Find ticket logs channel
        const logsChannel = message.guild.channels.cache.find(ch => ch.name === "┃ticket-logs");
        if (!logsChannel) return client.errorEmbed(message, `The \`#┃ticket-logs\` channel could not be found.`);

        // Find support role
        const supportRole = message.guild.roles.cache.find(r => r.name === "꒰Support Team꒱");
        if (!supportRole) return client.errorEmbed(message, `The \`꒰Support Team꒱\` role could not be found.`);

        // Get ticket category
        const ticketCategory = message.guild.channels.cache.find(c => c.name === "˗ˏˋ Support ´ˎ˗" && c.type == "GUILD_CATEGORY");
        if (!ticketCategory) return client.errorEmbed(message, `The \`˗ˏˋ Support ´ˎ˗\` category could not be found.`);

        // Get reason from args
        const reason = args.join(" ") || 'No reason specified.';

        // Get user that runs command 
        const user = message.author;

        // Send logs function
        const sendLog = (channel) => {
            const embed = new MessageEmbed()
                .setTitle("📝 | Ticket Open")
                .setDescription("A user has opoened a ticket and is waiting for their request to be handled.")
                .addField(`**Information**`, `**User:** \`${user.tag}\`\n**User ID:** \`${user.id}\`\n**Channel:** \`#${channel.name}\`\n**Channel ID:** \`${channel.id}\`\n**Reason:** \`${reason}\``)
                .setFooter({ text: `Ticket System`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
                .setColor(client.colors.purple)
                .setTimestamp();

            logsChannel.send({ embeds: [embed] });
        }

        // Create ticket function
        const createTicket = async (guild, reason) => {

            // Create button to close tickets
            const closeButton = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId('ticket-close')
                        .setEmoji('🔒')
                        .setLabel('Close Ticket')
                        .setStyle('DANGER')
                );

            // Create embed for ticket
            const embed = new MessageEmbed()
                .setTitle("🎟 | Ticket")
                .setColor(client.colors.lightred)
                .setFooter({ text: `Ticket System • play.crystals-crescent.com`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
                .setDescription(`Hello ${user}, our support team will be with you soon!\n**In the meantime, please describe your issue further.**\n**Ticket Topic:** \`${reason}\``)
                .setTimestamp();

            // Create ticket
            const ticket = {};
            let currentTicket = await Ticket.findOne({ guildID: guild.id, creatorID: user.id });

            // Find current ticket
            if (!currentTicket) {

                // Delete msg
                message.delete();

                // Make new channel
                await guild.channels.create(`ticket-${user.username}`, {
                    type: 'text',
                    permissionOverwrites: [
                        { id: guild.id, deny: ['VIEW_CHANNEL'] },
                        { id: supportRole.id, allow: ['VIEW_CHANNEL'] },
                        { id: user.id, allow: ['VIEW_CHANNEL'] }
                    ],
                    parent: ticketCategory.id,
                    reason: `Ticket Creation`,
                    topic: `${user.id} | **Tag:** ${user.tag} | ${client.config.prefix}close`
                }).then(newChannel => {
                    ticket.channelID = newChannel.id;
                    newChannel.send({ content: `${supportRole}`, embeds: [embed], components: [closeButton] });
                    sendLog(newChannel);
                });

                // Save data to database
                currentTicket = await new Ticket({
                    creatorID: user.id,
                    channelID: ticket.channelID,
                    guildID: guild.id,
                    createdAt: Date.now(),
                    claimed: 0,
                    addedUsers: []
                });
                currentTicket.save();

            } else return client.errorEmbed(message, `You already have an open ticket. <#${currentTicket.channelID}>`).then(m => setTimeout(() => m.channel.bulkDelete(2), 3000));
        };

        // Make ticket
        createTicket(message.guild, reason);

    },
});