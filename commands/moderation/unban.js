const { MessageEmbed } = require('discord.js');
const { Command } = require('reconlx');

module.exports = new Command({
    name: "unban",
    description: 'unbans a user.',
    args: '[user]',
    examples: ['@Duro#5232', '283312847478325251'],
    run: async ({ client, message, args }) => {

        const allowedRoles = ['「 Jr. Mod 」', 'Jr. Mod', '「 Mod 」', 'Mod', '「 Admin 」', 'Admin', '⸻Management Staff⸻', '「 Developer 」', '「 Assistant Manager」', '⸻Management Staff⸻']
        if (message.member.roles.cache.some(r => allowedRoles.includes(r.name))) {

            // Get target
            const target = client.users.cache.get(message.mentions.members.first()?.id) || client.users.cache.get(args[0]);
            if (!target) return client.errorEmbed(message, `Invalid arguments. \`${client.config.prefix}help ${module.exports.name}\``)

            // Cache server bans
            const bans = await message.guild.bans.fetch();
            if (!bans.get(target.id)) return client.errorEmbed(message, `\`${target.tag}\` is not currently banned.`);

            // Unban user and send success message
            message.guild.members.unban(target.id);
            client.successEmbed(message, `\`${target.tag}\` was successfully unbanned.`);

            // Create modlogs embed
            const embed = new MessageEmbed()
                .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
                .setDescription(`\`${message.author.tag}\` used command \`${client.config.prefix}unban ${target}\` in ${message.channel}`)
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