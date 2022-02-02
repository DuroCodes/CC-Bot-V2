const { MessageEmbed } = require('discord.js');
const { Command } = require('reconlx');

module.exports = new Command({
    name: "announce",
    description: 'creates an announcement.',
    args: '[channel] | [ping] | [announcement] | (color)',
    examples: ['#announcements | @Updates | Announcement | #ffffff'],
    run: async ({ client, message, args }) => {

        // Check if member has management staff role
        if (!message.member.roles.cache.some(role => role.name === '⸻Management Staff⸻')) return client.errorEmbed(message, "You do not have permission to use this command.");

        // Get arguments from message
        const totalArgs = args.join(" ").split("|");

        // Set arguments and check if they are undefined
        const channel = message.mentions.channels.first();
        const ping = totalArgs[1] ? totalArgs[1].trim() : undefined;
        const announcement = totalArgs[2] ? totalArgs[2].trim() : undefined;
        const color = totalArgs[3] && /^#[0-9A-F]{6}$/i.test(totalArgs[3].trim()) ? totalArgs[3].trim() : client.colors.purple;
        if (!channel || !ping || !announcement || !color) return client.errorEmbed(message, `Invalid arguments. \`${client.config.prefix}help ${module.exports.name}\``)

        // Create embed
        const embed = new MessageEmbed()
            .setFooter({ text: `Announcement by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
            .setTitle(`📢 | Announcement`)
            .setDescription(announcement)
            .setColor(color);

        // Send success message
        client.successEmbed(message, `Your announcement was created successfully.`);

        // Send embed
        channel.send({ content: ping, embeds: [embed] })
    },
});