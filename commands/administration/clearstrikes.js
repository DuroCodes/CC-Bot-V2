const strikeSchema = require('../../models/strike');
const { Command } = require('reconlx');

module.exports = new Command({
    name: 'clearstrikes',
    aliases: ['cstrikes'],
    description: 'removes all strikes for a user.',
    args: '[user]',
    examples: ['@Duro#5232', '283312847478325251'],
    run: async ({ client, message, args }) => {

        // Check if member has management staff role
        if (!message.member.roles.cache.some(role => role.name === '⸻Management Staff⸻')) return client.errorEmbed(message, `You do not have permission to use this command.`);

        // Variables for strike
        const user = client.users.cache.get(message.mentions.members.first()?.id) || client.users.cache.get(args[0]);
        if (!user) return client.errorEmbed(message, `Invalid arguments. \`${client.config.prefix}help ${module.exports.name}\``)

        const userID = user.id;

        // Get results
        const results = await strikeSchema.findOne({ userID });
        if (!results || results === null) return client.errorEmbed(message, `This user does not have any strikes.`);

        // Clear database
        await strikeSchema.deleteOne({ userID });
        client.successEmbed(message, `\`${user.tag}\`'s strikes have been cleared.`)

    }
});