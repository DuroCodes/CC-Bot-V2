const warnSchema = require("../../models/warn");
const { MessageEmbed } = require('discord.js');
const { Command } = require('reconlx');

module.exports = new Command({
    name: "warn",
    description: 'creates a warning for a user.',
    args: '[user] (reason)',
    examples: ['@Duro#5232 Spam', '283312847478325251 Spam'],
    run: async ({ client, message, args }) => {

        // Check if member has staff role
        if (message.member.roles.cache.some(role => role.name === '「 Staff 」') || message.member.roles.cache.some(role => role.name === '⸻Management Staff⸻')) {

            // Setup variables for warn
            const user = client.users.cache.get(message.mentions.members.first()?.id) || client.users.cache.get(args[0]);
            if (!user) return client.errorEmbed(message, `Invalid arguments. \`${client.config.prefix}help ${module.exports.name}\``)
            const reason = args.slice(1).join(" ") || 'N/A';

            // Make warning with arguments
            const warning = {
                author: message.author.tag,
                timestamp: Date.now(),
                reason
            };

            // Update database
            await warnSchema.findOneAndUpdate(
                {
                    guildID: message.guild.id,
                    userID: user.id
                },
                {
                    guildID: message.guild.id,
                    userID: user.id,
                    $push: {
                        warnings: warning
                    }
                },
                {
                    upsert: true
                }
            );

            // Send success message
            client.successEmbed(message, `\`${user.tag}\` has been successfully warned.`)

            // Create modlogs embed
            const embed = new MessageEmbed()
                .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
                .setDescription(`\`${message.author.tag}\` used command \`${client.config.prefix}warn ${user} ${reason}\` in ${message.channel}`)
                .setFooter({ text: `Crystals Crescent Bot`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
                .setColor(client.colors.purple)
                .setTimestamp();

            // Find modlogs channel and send embed
            const modLogs = message.guild.channels.cache.find(ch => ch.name === "┃mod-logs");
            if (!modLogs) return client.errorEmbed(message, `The \`#┃mod-logs\` channel could not be found.`);
            modLogs.send({ embeds: [embed] });

        } else return client.errorEmbed(message, "You do not have permission to use this command.");
    },
});