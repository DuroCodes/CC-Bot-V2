const strikeSchema = require('../../models/strike');
const { MessageEmbed } = require('discord.js');
const { Command } = require('reconlx');

module.exports = new Command({
    name: 'strikes',
    description: 'lists strikes for a user.',
    args: '[user]',
    examples: ['@Duro#5232', '283312847478325251'],
    run: async ({ client, message, args }) => {

        // Check for management staff role
        if (!message.member.roles.cache.some(role => role.name === '⸻Management Staff⸻')) return client.errorEmbed(message, `You do not have permission to use this command.`);

        // Variables for strike
        const user = client.users.cache.get(message.mentions.members.first()?.id) || client.users.cache.get(args[0]);
        if (!user) return client.errorEmbed(message, `Invalid arguments. \`${client.config.prefix}help ${module.exports.name}\``)

        const userID = user.id;

        // Get results
        const results = await strikeSchema.findOne({ userID });
        if (!results || results === null) return client.errorEmbed(message, `This user does not have any strikes.`);

        // Create embed
        const embed = new MessageEmbed()
            .setFooter({ text: `Crystals Crescent Bot`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
            .setColor(client.colors.purple)
            .setTimestamp();

        // Make array of strikes
        let totalResults = [];
        for (const strike of results.strikes) {
            const { author, timestamp, reason } = strike;

            // Push to totalResults to get a length 
            totalResults.push({ author, timestamp, reason });

            // Add embed fields for every result
            embed.addField(`${new Date(timestamp).toLocaleDateString()}`, `Manager: \`${author}\`\nReason: \`${reason}\``, true);
        }

        // Edit embed
        totalResults.length < 1 ? embed.setTitle(`${totalResults.length} strikes found`) : embed.setTitle(`${totalResults.length} strike found`);
        message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });

    }
});