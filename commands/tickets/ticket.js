const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js');
const { Command } = require('reconlx');

module.exports = new Command({
    name: "ticket",
    aliases: ['te', 'ticket', 'ticketembed'],
    args: '(staff)',
    description: 'creates the embed for ticket creation.',
    run: async ({ client, message, args }) => {

        // Check if member has administrator permission
        // Check for management staff role
        if (!message.member.roles.cache.some(role => role.name === '⸻Management Staff⸻')) return client.errorEmbed(message, `You do not have permission to use this command.`)

        if (['staff', 's'].includes(args[0])) {

            // Auto-delete message
            message.delete();

            // Reasons list
            const reasons = {
                '⚔️': 'Staff Complaint (Only Management Staff+ Can See)',
                '✏️': 'Staff Check-In (Only Management Staff+ Can See)'
            };

            // Create description from reasons
            let fieldValue = ``;
            for (const [key, value] of Object.entries(reasons)) fieldValue += `${key} - ${value}\n`;

            // Create embed
            const embed = new MessageEmbed()
                .setTitle('🎟 | Support Ticket')
                .setDescription(`To create a support ticket, choose an option from the dropdown or type \`${client.config.prefix}new [reason]\``)
                .addFields(
                    { name: `Reasons to create a ticket:`, value: fieldValue, inline: true }
                )
                .setColor(client.colors.lightred)
                .setFooter({ text: `If you create a ticket and you do not respond in 24 hours, it will be deleted.`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })

            // Create dropdown
            const dropdown = new MessageActionRow().addComponents(
                new MessageSelectMenu()
                    .setCustomId(`ticket-embed-staff`)
                    .setPlaceholder(`Select ticket category...`)
                    .addOptions([
                        {
                            emoji: `⚔️`,
                            label: `Complaint`,
                            description: `Create a ticket to create a complaint about a staff member.`,
                            value: `ticket-complaint`
                        },
                        {
                            emoji: `✏️`,
                            label: `Check-In`,
                            description: `Create a ticket to create a staff check-in notice.`,
                            value: `ticket-checkin`
                        }
                    ])
            );

            // Send embed
            message.channel.send({ embeds: [embed], components: [dropdown] });

        } else {
            // Auto-delete message
            message.delete();

            // Reasons list
            const reasons = {
                '💣': 'Griefed/Stolen/Missing Items',
                '⚡': 'Server Glitches',
                '🔨': 'Ban Appeal',
                '📝': 'Reporting a Player',
                '⚔️': 'Staff Complaint (Only Management Staff+ Can See)'
            };

            // Create description from reasons
            let fieldValue = ``;
            for (const [key, value] of Object.entries(reasons)) fieldValue += `${key} - ${value}\n`;

            // Create embed
            const embed = new MessageEmbed()
                .setTitle(`🎟️ | Support Ticket`)
                .setDescription(`To create a support ticket, choose an option from the dropdown or type \`${client.config.prefix}new [reason]\`.`)
                .addFields(
                    { name: `Reasons to create a ticket:`, value: fieldValue, inline: true }
                )
                .setColor(client.colors.lightred)
                .setFooter({ text: `If you create a ticket and you do not respond in 24 hours, it will be deleted.`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })

            // Create dropdown
            const dropdown = new MessageActionRow().addComponents(
                new MessageSelectMenu()
                    .setCustomId(`ticket-embed`)
                    .setPlaceholder(`Select ticket category...`)
                    .addOptions([
                        {
                            emoji: `💣`,
                            label: `Grief`,
                            description: `Create a ticket for griefed/stolen/missing items.`,
                            value: `ticket-grief`
                        },
                        {
                            emoji: `⚡`,
                            label: `Glitches`,
                            description: `Create a ticket for server glitches.`,
                            value: `ticket-glitch`
                        },
                        {
                            emoji: `🔨`,
                            label: `Appeal`,
                            description: `Create a ticket for a ban appeal.`,
                            value: `ticket-appeal`
                        },
                        {
                            emoji: `📝`,
                            label: `Report`,
                            description: `Create a ticket to report a player.`,
                            value: `ticket-report`
                        },
                        {
                            emoji: `⚔️`,
                            label: `Complaint`,
                            description: `Create a ticket to create a complaint about a staff member.`,
                            value: `ticket-complaint`
                        },
                    ])
            );

            // Send embed
            message.channel.send({ embeds: [embed], components: [dropdown] });
        }


    },
});