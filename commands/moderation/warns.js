const warnSchema = require("../../models/warn");
const { MessageEmbed } = require('discord.js');
const { Command } = require('reconlx');

module.exports = new Command({
    name: "warns",
    aliases: ["lw", "listwarns", "warnings"],
    description: 'lists warns for a user.',
    args: '[user]',
    examples: ['@Duro#5232', '283312847478325251'],
    run: async ({ client, message, args }) => {

        // Check if member has staff role
        if (message.member.roles.cache.some(role => role.name === '「 Staff 」') || message.member.roles.cache.some(role => role.name === '⸻Management Staff⸻')) {

            // Setup variables for warn
            const user = client.users.cache.get(message.mentions.members.first()?.id) || client.users.cache.get(args[0]);
            if (!user) return client.errorEmbed(message, `Invalid arguments. \`${client.config.prefix}help ${module.exports.name}\``)

            const guildID = message.guild.id;
            const userID = user.id;

            // Get results
            const results = await warnSchema.findOne({ guildID, userID });
            if (!results || results === null) return client.errorEmbed(message, `This user does not have any warns.`);

            // Make embed
            const embed = new MessageEmbed()
                .setFooter({ text: `Crystals Crescent Bot`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
                .setColor(client.colors.purple)
                .setTimestamp();

            let totalResults = [];
            for (const warning of results.warnings) {
                const { author, timestamp, reason } = warning;

                // Push to totalResults to get a length 
                totalResults.push({ author, timestamp, reason });

                // Add embed fields for every result
                embed.addField(`${new Date(timestamp).toLocaleDateString()}`, `Moderator: \`${author}\`\nReason: \`${reason}\``, true);
            }

            // Edit embed
            totalResults.length < 1 ? embed.setTitle(`${totalResults.length} warnings found`) : embed.setTitle(`${totalResults.length} warning found`);
            message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });

        } else return client.errorEmbed(message, "You do not have permission to use this command.");
    },
});