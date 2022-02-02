const { MessageEmbed } = require('discord.js');
const { Command } = require('reconlx');

module.exports = new Command({
    name: "gayrate",
    aliases: ['gr', 'gay'],
    description: 'detects how gay a user is.',
    args: '(user)',
    examples: ['@Duro#5232'],
    run: async ({ client, message }) => {

        // Set user to the mentioned user or the author & cache the user
        const user = message.mentions.members.first() || message.author;
        const User = client.users.cache.get(user.id);

        // Create the % gay based on random 0-100
        var percentGay;
        if (User.id === "738575340368166964") percentGay = 100;
        else percentGay = Math.floor(Math.random() * 101);
        var desc = (User.id === message.author.id) ? `You are ${percentGay}% gay 🏳️‍🌈` : `${User.username} is ${percentGay}% gay 🏳️‍🌈`;

        // Create embed
        const embed = new MessageEmbed()
            .setTitle("gay r8 machine")
            .setDescription(desc)
            .setColor("RANDOM");

        // Send embed
        message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } })

    },
});