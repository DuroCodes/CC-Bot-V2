const { MessageEmbed } = require('discord.js');
const { Command } = require('reconlx');

module.exports = new Command({
    name: "penis",
    aliases: ['pp', 'pen15'],
    description: 'detects the user\'s penis size and displays it.',
    args: '(user)',
    examples: ['@Duro#5232'],
    run: async ({ client, message }) => {

        // Set user to the mentioned member or author and cache user
        const user = message.mentions.members.first() || message.author;
        const User = client.users.cache.get(user.id);

        // Create random number for size
        var size = parseFloat(`${Math.floor(Math.random() * Math.floor(9))}.${Math.floor(Math.random() * Math.floor(9))}`);

        // Create ascii art
        const penis = `8${"=".repeat(Math.round(size))}D`;

        // Create embed
        const embed = new MessageEmbed()
            .setTitle("peepee size machine")
            .setDescription(`${User.username}'s penis:\n${penis}\n(${size} inches)`)
            .setColor("RANDOM");

        // Send embed
        message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
    },
});