const giveawayClient = require('../../handler/giveaway.js');
const { Command } = require('reconlx');
const ms = require('ms');

module.exports = new Command({
    name: "create",
    description: 'creates a giveaway.',
    args: '[channel] | [ping] | [time] | [winners] | [prize]',
    examples: ['#Giveaways | @Giveaways | 1d | 1 | Free Rank'],
    run: async ({ client, message, args }) => {

        // Check if member has management staff role
        if (!message.member.roles.cache.some(role => role.name === '⸻Management Staff⸻')) return client.errorEmbed(message, "You do not have permission to use this command.");

        // Get arguments from message
        const totalArgs = args.join(" ").split("|");

        // Set arguments and check if they are undefined
        const channel = message.mentions.channels.first();
        const ping = totalArgs[1] ? totalArgs[1].trim() : undefined;
        const unformattedTime = totalArgs[2] ? totalArgs[2].trim() : undefined;
        const numWinners = totalArgs[3] ? totalArgs[3].trim() : undefined;
        const prize = totalArgs[4] ? totalArgs[4].trim() : undefined;
        if (!channel || !ping || !unformattedTime || !numWinners || !prize) return client.errorEmbed(message, `Invalid arguments. \`${client.config.prefix}help ${module.exports.name}\``)

        // Set time and winner variables
        const time = ms(unformattedTime);
        const winners = parseInt(numWinners);

        // Start giveaway
        giveawayClient.start({
            ping,
            channel,
            time,
            hostedBy: message.author,
            winners,
            prize
        });

        client.successEmbed(message, `The giveaway was successfully created.`);

    }
});