const { MessageEmbed } = require('discord.js');
const muteSchema = require("../../models/mute");
const { Command } = require('reconlx');

// Set times for reasons
const reasons = {
    SPAM: 1,
    NSFW: 48,
    EXCESSIVE_PINGS: 1,
    DISRESPECT: 3,
    ADVERTISING: 72
};

module.exports = new Command({
    name: "mute",
    description: 'mutes a user.',
    args: '[user] [reason]',
    examples: ['@Duro#5232 Spam', '283312847478325251 Spam'],
    run: async ({ client, message, args }) => {

        // Check if member has staff role
        const allowedRoles = ['「 Jr. Mod 」', 'Jr. Mod', '「 Mod 」', 'Mod', '「 Admin 」', 'Admin', '⸻Management Staff⸻', '「 Developer 」', '「 Assistant Manager」', '⸻Management Staff⸻']
        if (message.member.roles.cache.some(r => allowedRoles.includes(r.name))) {

            // Setup variables for mute
            const user = message.guild.members.cache.get(message.mentions.members.first()?.id) || message.guild.members.cache.get(args[0]);
            let reason = args.slice(1).join(" ").replace(" ", "_").toUpperCase();
            if (!user || !reason) return client.errorEmbed(message, `Invalid arguments. \`${client.config.prefix}help ${module.exports.name}\``)

            // Check if the reason is not in the reasons list
            if (!reasons[reason]) {
                let validReasons = '';
                for (const key in reasons) validReasons += `${key}, `;
                validReasons = validReasons.substring(0, validReasons.length - 2);
                return client.errorEmbed(message, `Unknown reason, use one of the following:\n \`${validReasons}\``);
            }

            // Find previous mutes and check if user is already muted
            const previousMutes = await muteSchema.find({ userID: user.id });
            const currentlyMuted = previousMutes.filter(m => { return m.current === true });
            if (currentlyMuted.length) return client.errorEmbed(message, `\`${user.tag}\` is already muted.`);

            // Set duration
            let duration = reasons[reason] * (previousMutes.length + 1);
            const expires = new Date(Date.now() + 3600000 * duration);

            // Get muted role
            const mutedRole = message.guild.roles.cache.find(r => { return r.name === 'Muted' });
            if (!mutedRole) return client.errorEmbed(message, `The \`Muted\` role could not be found.`);

            // Get member from user id
            const targetMember = (await message.guild.members.fetch()).get(user.id);
            targetMember.roles.add(mutedRole);

            // Update database
            await new muteSchema({
                userID: user.id,
                guildID: message.guild.id,
                reason,
                staffID: message.author.id,
                staffTag: message.author.tag,
                expires,
                current: true
            }).save();

            // Create modlogs embed
            const embed = new MessageEmbed()
                .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
                .setDescription(`\`${message.author.tag}\` used command \`${client.config.prefix}mute ${user} ${reason}\` in ${message.channel}`)
                .setFooter({ text: `Crystals Crescent Bot`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
                .setColor(client.colors.purple)
                .setTimestamp();

            // Find modlogs channel and send embed
            const modLogs = message.guild.channels.cache.find(ch => ch.name === "┃mod-logs");
            if (!modLogs) return client.errorEmbed(message, `The \`#┃mod-logs\` channel could not be found.`);
            modLogs.send({ embeds: [embed] });

            // Success message
            return client.successEmbed(message, `\`${user.user.tag}\` was muted for \`${reason}\`. They will be unmuted in ${duration} hour(s).`)

        } else return client.errorEmbed(message, "You do not have permission to use this command.");
    },
});