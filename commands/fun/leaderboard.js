const { MessageEmbed } = require('discord.js');
const leaderboardSchema = require('../../models/leaderboard.js');
const { Command } = require('reconlx');

module.exports = new Command({
    name: "leaderboard",
    aliases: ['top', 'lb'],
    description: 'gets the top fifteen trivia players.',
    run: async ({ client, message }) => {

        // Get users from the schema
        const users = await leaderboardSchema.find();

        // Cache user
        const cacheUser = (userID) => {
            const cachedUser = client.users.cache.get(userID);
            return cachedUser;
        }
        // Create array of members
        const lb = users
            .slice(0)
            .sort(({ score: a }, { score: b }) => b - a)
            .map(({ userID, score }, pos) => `**${pos + 1})** \`${cacheUser(userID).tag}\` - **${score}** <:Heads:914010199940038666>`);

        // Make leadeboard and embed
        const leaderboard = lb.slice(0, 15);
        const embed = new MessageEmbed()
            .setTitle(`Leaderboard for Trivia Wins`)
            .setDescription(leaderboard.join('\n'))
            .setColor(client.colors.purple);

        // Send embed
        message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });

    }
});