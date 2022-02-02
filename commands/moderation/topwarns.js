const warnSchema = require('../../models/warn');
const { MessageEmbed } = require('discord.js');
const { Command } = require('reconlx');

module.exports = new Command({
    name: 'topwarns',
    aliases: ['topwarnings', 'topwarn'],
    description: 'lists the users with the most warnings.',
    run: async ({ client, message }) => {

        const cacheUser = (userID) => {
            const cachedUser = client.users.cache.get(userID);
            return cachedUser.tag;
        }

        const warns = await warnSchema.find({ guildID: message.guild.id });
        if (warns.length === 0) return client.errorEmbed(message, `There are no users with warnings.`);

        const sortedWarns = warns
            .sort((b, a) => a.warnings.length - b.warnings.length)
            .map(({ userID, warnings }, pos) => `**${pos + 1})** \`${cacheUser(userID)}\` - **${warnings.length} warning${warnings.length > 1 ? 's' : ''}**`);

        const embed = new MessageEmbed()
            .setTitle(`Top Warnings`)
            .setColor(client.colors.purple)
            .setDescription(`${sortedWarns.slice(0, 15).join('\n')}`)
            .setFooter({ text: `Crystals Crescent`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })

        message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });

    }
});