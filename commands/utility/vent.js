const { MessageEmbed } = require('discord.js');
const { Command } = require('reconlx');

module.exports = new Command({
    name: "vent",
    aliases: ['v'],
    description: 'creates an anonymous message for vents.',
    args: '[message]',
    examples: ['this is a vent message'],
    run: async ({ client, message, args }) => {

        // Find vent channel & auto-delete message
        const channel = message.guild.channels.cache.find((ch) => ch.name === "┃vent");
        message.delete();

        errorEmbed = (message, argument) => {
            embed = new MessageEmbed()
                .setDescription(`${client.config.wrong} **Error:** ${argument}`)
                .setColor(client.colors.red);

            return message.channel.send({ embeds: [embed], allowedMentions: { repliedUser: false }, ephemeral: true });
        };

        // Create text and check if there is no text
        let text = args.join(" ");
        if (!text) return errorEmbed(message, `Invalid arguments. \`${client.config.prefix}help ${module.exports.name}\``)

        // Create embed
        embed = new MessageEmbed()
            .setTitle("📝 | Vent")
            .setColor(client.colors.black)
            .setDescription(text)
            .setFooter({ text: `Anonymous Vent` })
            .setTimestamp();

        // Send embed
        channel.send({ embeds: [embed] })
    },
});