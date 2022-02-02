const strikeSchema = require('../../models/strike');
const { MessageEmbed } = require('discord.js');
const { Command } = require('reconlx');

module.exports = new Command({
    name: 'topstrikes',
    description: 'lists the users with the most strikes.',
    run: async ({ client, message }) => {

        const cacheUser = (userID) => {
            const cachedUser = client.users.cache.get(userID);
            return cachedUser.tag;
        }

        const strikes = await strikeSchema.find();
        if (strikes.length === 0) return client.errorEmbed(message, `There are no users with strikes.`);
        
        const sortedStrikes = strikes
            .sort((b, a) => a.strikes.length - b.strikes.length)
            .map(({ userID, strikes }, pos) => `**${pos + 1})** \`${cacheUser(userID)}\` - **${strikes.length} strike${strikes.length > 1 ? 's' : ''}**`);

        const embed = new MessageEmbed()
            .setTitle(`Top Strikes`)
            .setColor(client.colors.purple)
            .setDescription(`${sortedStrikes.slice(0, 15).join('\n')}`)
            .setFooter({ text: `Crystals Crescent`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })

        message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });

    }
});