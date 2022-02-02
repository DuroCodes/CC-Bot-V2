const { MessageEmbed } = require('discord.js');
const muteSchema = require("../../models/mute");
const { Command } = require('reconlx');

module.exports = new Command({
    name: "unmute",
    description: 'unmutes a user.',
    args: '[user]',
    examples: ['@Duro#5232', '283312847478325251'],
    run: async ({ client, message, args }) => {

        const allowedRoles = ['「 Jr. Mod 」', 'Jr. Mod', '「 Mod 」', 'Mod', '「 Admin 」', 'Admin', '⸻Management Staff⸻', '「 Developer 」', '「 Assistant Manager」', '⸻Management Staff⸻']
        if (message.member.roles.cache.some(r => allowedRoles.includes(r.name))) {

            const user = message.guild.members.cache.get(message.mentions.members.first()?.id) || message.guild.members.cache.get(args[0]);
            if (!user) return client.errorEmbed(message, `Invalid arguments. \`${client.config.prefix}help ${module.exports.name}\``)

            const result = await muteSchema.updateOne({
                guildID: message.guild.id,
                userID: user.id,
                current: true
            }, {
                current: 0
            });

            const mutedRole = message.guild.roles.cache.find(r => { return r.name === 'Muted' });
            if (!mutedRole) return client.errorEmbed(message, `The \`Muted\` role could not be found.`);

            if (result.modifiedCount === 1) {
                const guildMember = message.guild.members.cache.get(user.id);
                guildMember.roles.remove(mutedRole);

                // Create modlogs embed
                const embed = new MessageEmbed()
                    .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
                    .setDescription(`\`${message.author.tag}\` used command \`${client.config.prefix}unmute ${user}\` in ${message.channel}`)
                    .setFooter({ text: `Crystals Crescent Bot`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
                    .setColor(client.colors.purple)
                    .setTimestamp();

                // Find modlogs channel and send embed
                const modLogs = message.guild.channels.cache.find(ch => ch.name === "┃mod-logs");
                if (!modLogs) return client.errorEmbed(message, `The \`#┃mod-logs\` channel could not be found.`);
                modLogs.send({ embeds: [embed] });

                // Send success message
                return client.successEmbed(message, `\`${user.tag}\` was successfully unmuted.`);

            }
            else return client.errorEmbed(message, `\`${user.tag}\` is not currently muted.`)

        } else return client.errorEmbed(message, "You do not have permission to use this command.");

    }
});