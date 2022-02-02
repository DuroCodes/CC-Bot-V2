const { Command } = require('reconlx');
const { MessageEmbed } = require('discord.js');
const { bonk } = require('anime-actions');

module.exports = new Command ({
    name: "bonk",
    description: 'bonks the mentioned user.',
    args: '[user]',
    examples: ['@Duro#5232'],
    run: async ({ client, message }) => {

        // Get user from mentioned member
        const user = message.mentions.members.first();
        if (!user) return client.errorEmbed(message, `Invalid arguments. \`${client.config.prefix}help ${module.exports.name}\``)
        const User = client.users.cache.get(user.id);

        // Create embed
        const embed = new MessageEmbed()
            .setAuthor({ name: `${message.author.username} bonks ${User.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
            .setColor(client.colors.babyblue)
            .setImage(await bonk());

        // Send embed
        message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
    },
});