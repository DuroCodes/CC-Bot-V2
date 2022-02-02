const { MessageEmbed } = require('discord.js');
const { Command } = require('reconlx');

module.exports = new Command({
    name: "inactivity",
    aliases: ["inac"],
    description: 'creates an inactivity notice.',
    args: '[reason] | [start] | [end]',
    examples: ['Exams | 1/1/2021 | 2/2/2021'],
    run: async ({ client, message, args }) => {

        // Check for staff role
        if (!message.member.roles.cache.some(role => role.name === '「 Staff 」') && !message.member.roles.cache.some(role => role.name === '⸻Management Staff⸻')) return client.errorEmbed(message, `You do not have permission to use this command.`);

        // Get arguments
        const totalArgs = args.join(" ").split("|");
        const reason = totalArgs[0] ? totalArgs[0].trim() : undefined;
        const start = totalArgs[1] ? totalArgs[1].trim() : undefined;
        const end = totalArgs[2] ? totalArgs[2].trim() : undefined;
        if (!reason || !start || !end) return client.errorEmbed(message, `Invalid arguments. \`${client.config.prefix}help ${module.exports.name}\``)

        // Find inactivity channel
        const inactivityChannel = message.guild.channels.cache.find(ch => ch.name === '┃inactivity-notice');
        if (!inactivityChannel) return client.errorEmbed(message, `The \`#┃inactivity-notice\` channel could not be found.`);

        // Make embed
        const embed = new MessageEmbed()
            .setTitle(`Inactivity Notice:`)
            .setColor(client.colors.purple)
            .addFields(
                { name: `**Reason:**`, value: `\`${reason}\`` },
                { name: `**Start Date:**`, value: `\`${start}\`` },
                { name: `**End Date:**`, value: `\`${end}\`` }
            )
            .setFooter({ text: `Inactivity by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
            .setTimestamp();

        inactivityChannel.send({ embeds: [embed] });
        client.successEmbed(message, `Your inactivity notice was created successfully.`);
    }
});