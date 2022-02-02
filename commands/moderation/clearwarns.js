const warnSchema = require("../../models/warn")
const { MessageEmbed } = require('discord.js');
const { Command } = require('reconlx');

module.exports = new Command({
    name: "clearwarns",
    aliases: ["cw", "rw", "removewarns", "cwarnings", "cwarns", "unwarn"],
    description: 'removes all warnings for a user.',
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
            if (!results || results === null) return client.errorEmbed(message, `This user does not have any warns.`)

            // Clear database
            await warnSchema.deleteOne({ guildID, userID });
            client.successEmbed(message, `\`${user.tag}\`'s warnings have been cleared.`);

            // Create modlogs embed
            const embed = new MessageEmbed()
                .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
                .setDescription(`\`${message.author.tag}\` used command \`${client.config.prefix}${module.exports.name} ${user}\` in ${message.channel}`)
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