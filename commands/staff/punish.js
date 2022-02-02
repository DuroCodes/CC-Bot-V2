const { MessageEmbed } = require('discord.js');
const { Command } = require('reconlx');

module.exports = new Command({
    name: "punish",
    aliases: ["pun"],
    description: 'creates a punishment for a user.',
    args: '[mc/dc] | [user] | [type] | [reason]',
    examples: ['mc | _Duro_ | Ban | Hacking', 'dc | Duro#5232 | Mute | Spam'],
    run: async ({ client, message, args }) => {

        // Check for staff role
        if (!message.member.roles.cache.some(role => role.name === '「 Staff 」') && !message.member.roles.cache.some(role => role.name === '⸻Management Staff⸻')) return client.errorEmbed(message, `You do not have permission to use this command.`);

        const totalArgs = args.join(" ").split("|");
        const type = totalArgs[0] ? totalArgs[0].trim() : undefined;

        if (['mc', 'minecraft', 'm'].includes(type)) {

            const punishmentChannel = message.guild.channels.cache.find(ch => ch.name === "┃minecraft-logs");
            if (!punishmentChannel) return client.errorEmbed(message, `The \`#┃minecraft-logs\` channel could not be found.`);

            const username = totalArgs[1] ? totalArgs[1].trim() : undefined;
            const punishmentType = totalArgs[2] ? totalArgs[2].trim() : undefined;
            const reason = totalArgs[3] ? totalArgs[3].trim() : undefined;
            if (!type || !username || !punishmentType || !reason) return client.errorEmbed(message, `Invalid arguments. \`${client.config.prefix}help ${module.exports.name}\``)

            const embed = new MessageEmbed()
                .setTitle(`Punishment:`)
                .setColor(client.colors.purple)
                .addFields(
                    { name: `**Username:**`, value: `\`${username}\`` },
                    { name: `**Punishment Type:**`, value: `\`${punishmentType}\`` },
                    { name: `**Punishment Reason:**`, value: `\`${reason}\`` }
                )
                .setFooter({ text: `Punishment by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
                .setTimestamp();

            punishmentChannel.send({ embeds: [embed] });
            client.successEmbed(message, `Your punishment was created successfully.`);
        }
        else if (['dc', 'discord', 'dc'].includes(type)) {

            const punishmentChannel = message.guild.channels.cache.find(ch => ch.name === "┃discord-logs");
            if (!punishmentChannel) return client.errorEmbed(message, `The \`#┃discord-logs\` channel could not be found.`);

            const user = totalArgs[1] ? totalArgs[1].trim() : undefined;
            const punishmentType = totalArgs[2] ? totalArgs[2].trim() : undefined;
            const reason = totalArgs[3] ? totalArgs[3].trim() : undefined;
            if (!user || !punishmentType || !reason) return client.errorEmbed(message, `Invalid arguments. \`${client.config.prefix}help ${module.exports.name}\``)

            const embed = new MessageEmbed()
                .setTitle(`Punishment:`)
                .setColor(client.colors.purple)
                .addFields(
                    { name: `**User/ID:**`, value: `\`${user}\`` },
                    { name: `**Punishment Type:**`, value: `\`${punishmentType}\`` },
                    { name: `**Punishment Reason:**`, value: `\`${reason}\`` }
                )
                .setFooter({ text: `Punishment by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
                .setTimestamp();

            punishmentChannel.send({ embeds: [embed] });
            client.successEmbed(message, `Your punishment was created successfully.`);
        }
        else return client.errorEmbed(message, `Invalid arguments. \`${client.config.prefix}help ${module.exports.name}\``)

    }
});