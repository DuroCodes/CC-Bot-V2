const { Command } = require('reconlx');

module.exports = new Command({
    name: "deny",
    aliases: ['deny-suggestion'],
    description: 'denies a suggestion.',
    args: '[suggestion]',
    examples: ['923691135380103279'],
    run: async ({ client, message, args }) => {

        // Check if user is management staff
        if (!message.member.roles.cache.some(role => role.name === '⸻Management Staff⸻')) return client.errorEmbed(message, "You do not have permissions to use this command.");

        // Create variables for suggestion
        const suggestionID = args[0];
        if (!suggestionID) return client.errorEmbed(message, `Invalid arguments. \`${client.config.prefix}help ${module.exports.name}\``)

        // Find suggestions channel
        const channel = message.guild.channels.cache.find(channel => channel.name === "┃suggestions");
        if (!channel) return client.errorEmbed(message, "Could not find the suggestion channel.");

        // Update embed
        try {

            // Find current embed
            const suggestedEmbed = await channel.messages.fetch(suggestionID);
            if (suggestedEmbed?.embeds[0].title !== 'Suggestion:') return client.errorEmbed(message, `This message is not a suggestion.`);

            // Update data
            const denyEmbed = suggestedEmbed.embeds[0]
                .setColor(client.colors.red)
                .setFooter({ text: `Denied by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })

            // Edit embed
            suggestedEmbed.edit({ embeds: [denyEmbed] });
            suggestedEmbed.reactions.removeAll();

            // Success message
            client.successEmbed(message, `The suggestion has been denied.`);

        } catch (err) {
            return client.errorEmbed(message, `The suggestion could not be found.`);
        }

    },
});