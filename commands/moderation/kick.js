const { MessageEmbed } = require('discord.js');
const { Command } = require('reconlx');

module.exports = new Command({
    name: "kick",
    description: 'kicks a user.',
    args: '[user] (reason)',
    examples: ['@Duro#5232 Advertising', '283312847478325251 Advertising'],
    run: async ({ client, message, args }) => {

        const allowedRoles = ['「 Jr. Mod 」', 'Jr. Mod', '「 Mod 」', 'Mod', '「 Admin 」', 'Admin', '⸻Management Staff⸻', '「 Developer 」', '「 Assistant Manager」', '⸻Management Staff⸻']
        if (message.member.roles.cache.some(r => allowedRoles.includes(r.name))) {

            // Get target
            const target = message.guild.members.cache.get(message.mentions.members.first()?.id) || message.guild.members.cache.get(args[0]);
            if (!target) return client.errorEmbed(message, `Invalid arguments. \`${client.config.prefix}help ${module.exports.name}\``)

            // Get reason
            const reason = args.slice(1).join(' ') || 'No reason specified';

            // Kick user and send success message
            target.kick({ reason: reason });
            client.successEmbed(message, `\`${target.user.tag}\` was successfully kicked with reason \`${reason}\`.`);

            // Create modlogs embed
            const embed = new MessageEmbed()
                .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
                .setDescription(`\`${message.author.tag}\` used command \`${client.config.prefix}kick ${target} ${reason}\` in ${message.channel}`)
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