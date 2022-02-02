const strikeSchema = require('../../models/strike');
const { Command } = require('reconlx');

module.exports = new Command({
    name: 'strike',
    description: 'creates a strike for a user.',
    args: '[user] (reason)',
    examples: ['@Duro#5232 Abusing Permissions', '283312847478325251 Abusing Permissions'],
    run: async ({ client, message, args }) => {

        // Check for management staff role
        if (!message.member.roles.cache.some(role => role.name === '⸻Management Staff⸻')) return client.errorEmbed(message, `You do not have permission to use this command.`);

        // Variables for strike
        const user = client.users.cache.get(message.mentions.members.first()?.id) || client.users.cache.get(args[0]);
        if (!user) return client.errorEmbed(message, `Invalid arguments. \`${client.config.prefix}help ${module.exports.name}\``)
        const reason = args.slice(1).join(" ") || 'N/A';

        // Make strike from arguments
        const strike = {
            author: message.author.tag,
            timestamp: Date.now(),
            reason
        };

        // Update database
        await strikeSchema.findOneAndUpdate(
            {
                userID: user.id
            },
            {
                userID: user.id,
                $push: {
                    strikes: strike
                }
            },
            {
                upsert: true
            }
        );

        // Sucess message
        client.successEmbed(message, `\`${user.tag}\` has received a strike.`);

    }
});