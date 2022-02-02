const { MessageEmbed } = require('discord.js');
const { Command } = require('reconlx');

module.exports = new Command({
    name: "coinflip",
    aliases: ['cf', 'coin'],
    description: 'flips a coin.',
    run: async ({ client, message }) => {

        // Get random 
        const num = Math.random();

        // Set based on random
        let cf;
        if (num < 0.5) cf = 'Heads';
        else cf = 'Tails';

        // Emojis for coinflip
        const emojis = {
            "Heads": "<:Heads:914010199940038666>",
            "Tails": "<:Tails:914010137621065769>"
        }

        // Create embed
        const embed = new MessageEmbed()
            .setTitle(`Coinflip | ${cf}`)
            .setDescription(`The coinflip resulted in ${cf} ${emojis[cf]}`)
            .setColor(client.colors.purple);

        // Send embed
        message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } })

    },
});