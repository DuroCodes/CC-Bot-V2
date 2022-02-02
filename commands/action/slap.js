const { Command } = require('reconlx');
const { MessageEmbed } = require('discord.js');
const { slap } = require('anime-actions');

module.exports = new Command({
    name: "slap",
    aliases: ['smack', 'spank'],
    description: 'slaps the mentioned user.',
    args: '[user]',
    examples: ['@Duro#5232'],
    run: async ({ client, message }) => {

        // Get user from mentioned member
        const user = message.mentions.members.first();
        if (!user) return client.errorEmbed(message, `Invalid arguments. \`${client.config.prefix}help ${module.exports.name}\``)
        const User = client.users.cache.get(user.id);

        // Create embed
        const embed = new MessageEmbed()
            .setAuthor({ name: `${message.author.username} slaps ${User.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
            .setColor(client.colors.babyblue)
            .setImage(await slap());

        // Send embed
        message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
    },
});