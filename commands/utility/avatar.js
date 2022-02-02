const { MessageEmbed } = require('discord.js');
const { Command } = require('reconlx');

module.exports = new Command({
    name: "avatar",
    aliases: ['av', 'a'],
    description: 'retrieves a user\'s avatar.',
    args: '(user)',
    examples: ['@Duro#5232'],
    run: async ({ client, message }) => {

        // Set user to mentioned member or author and cache user
        const user = message.mentions.members.first() || message.author;
        const User = client.users.cache.get(user.id);

        // Create embed
        const embed = new MessageEmbed()
            .setAuthor({ name: `${User.username}'s avatar`, iconURL: User.displayAvatarURL({ dynamic: true }) })
            .setColor(client.colors.purple)
            .setImage(User.displayAvatarURL({ size: 1024, dynamic: true }));

        // Send embed
        message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } })
    },
});