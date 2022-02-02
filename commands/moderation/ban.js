const { MessageEmbed } = require('discord.js');
const { Command } = require('reconlx');

module.exports = new Command({
    name: "ban",
    description: 'bans a user.',
    args: '[user] (reason) | (true/false)',
    examples: ['@Duro#5232 Harassment', '283312847478325251 Harassment'],
    run: async ({ client, message, args }) => {

        const allowedRoles = ['「 Jr. Mod 」', 'Jr. Mod', '「 Mod 」', 'Mod', '「 Admin 」', 'Admin', '⸻Management Staff⸻', '「 Developer 」', '「 Assistant Manager」', '⸻Management Staff⸻']
        if (message.member.roles.cache.some(r => allowedRoles.includes(r.name))) {

            // Get target user
            const target = message.guild.members.cache.get(message.mentions.members.first()?.id) || message.guild.members.cache.get(args[0]);
            if (!target) return client.errorEmbed(message, `Invalid arguments. \`${client.config.prefix}help ${module.exports.name}\``)

            // Get reason
            let reason;
            let days;
            if (message.content.includes('|')) {
                const splitted = args.slice(1).join(' ').split('|');
                days = splitted[1].trim().toLowerCase() === 'true' ? 1 : 0;
                reason = splitted[0].trim();
            }
            else {
                days = 0;
                reason = args.slice(1).join(' ') || 'No reason specified';
            }

            // Ban user and send success message
            target.ban({ reason, days });
            client.successEmbed(message, `\`${target.user.tag}\` was successfully banned with reason \`${reason}\`.`);

            // Create modlogs embed
            const embed = new MessageEmbed()
                .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
                .setDescription(`\`${message.author.tag}\` used command \`${client.config.prefix}ban ${target} ${reason}\` in ${message.channel}`)
                .setFooter({ text: `Crystals Crescent Bot`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
                .setColor(client.colors.purple)
                .setTimestamp();

            // Find modlogs channel and send embed
            const modLogs = message.guild.channels.cache.find(ch => ch.name === "┃mod-logs");
            if (!modLogs) return client.errorEmbed(message, `The \`#┃mod-logs\` channel could not be found.`);
            modLogs.send({ embeds: [embed] });

        } else return client.errorEmbed(message, "You do not have permission to use this command.");
    }
});