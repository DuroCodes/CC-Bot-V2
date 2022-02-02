const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');
const { Command } = require('reconlx');

module.exports = new Command({
    name: "invite",
    aliases: ['inv'],
    description: 'invites the bot to a server.',
    run: async ({ client, message }) => {

        // Check if member has management staff role
        if (!message.member.roles.cache.some(role => role.name === '⸻Management Staff⸻')) return client.errorEmbed(message, "You do not have permission to use this command.");

        // Create button for invite
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton({
                    url: "https://discord.com/api/oauth2/authorize?client_id=912789582779662378&permissions=8&scope=bot%20applications.commands",
                    style: "LINK",
                    label: "Invite",
                    emoji: "913292239948627999"
                })
            );

        // Create embed
        const embed = new MessageEmbed()
            .setTitle("Invite Bot")
            .setDescription("Click the button below to invite me to your server.")
            .setColor(client.colors.purple);

        // Send embed
        message.reply({ embeds: [embed], components: [row], allowedMentions: { repliedUser: false } })
    },
});