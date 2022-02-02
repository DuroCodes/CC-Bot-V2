const { MessageEmbed } = require('discord.js');
const { Command } = require('reconlx');

module.exports = new Command({
    name: "suggest",
    aliases: ['suggestion'],
    description: 'creates a suggestion from input.',
    args: '[server] | [suggestion]',
    examples: ['LunarCore MC | Remove phantoms'],
    run: async ({ client, message, args }) => {

        // Create variables for suggestion
        const argsList = args.join(" ").split('|')

        const server = argsList[0];
        const suggestion = argsList[1];

        if (!server || !suggestion) return client.errorEmbed(message, `Invalid arguments. \`${client.config.prefix}help ${module.exports.name}\``)

        // Find category
        const channel = message.guild.channels.cache.find(channel => channel.name === "┃suggestions");
        if (!channel) return client.errorEmbed(message, "Could not find the suggestion channel.");

        // Create embed
        const embed = new MessageEmbed()
            .setTitle("Suggestion:")
            .addFields(
                { name: 'Server:', value: server, inline: false },
                { name: 'Suggestion:', value: suggestion, inline: false },
            )
            .setColor(client.colors.purple)
            .setFooter({ text: `Suggestion by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
            .setTimestamp();

        // Send embed
        channel.send({ embeds: [embed] }).then(m => {
            m.react(client.config.check)
                .then(m.react(client.config.wrong))
        });

        // Sucess message
        client.successEmbed(message, `Your suggestion has been successfully sent.`);

    },
});