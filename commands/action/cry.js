const { Command } = require('reconlx');
const { MessageEmbed } = require('discord.js');
const { cry } = require('anime-actions');

module.exports = new Command({
    name: "cry",
    aliases: ['sob'],
    description: 'sends a crying gif.',
    run: async ({ client, message }) => {

        // Create embed
        const embed = new MessageEmbed()
            .setAuthor({ name: `${message.author.username} cries`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
            .setColor(client.colors.babyblue)
            .setImage(await cry());

        // Send embed
        message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
    },
});