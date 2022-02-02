const { MessageEmbed } = require('discord.js');
const { Command } = require('reconlx');
const axios = require('axios');

module.exports = new Command({
    name: "dadjoke",
    aliases: ['dj', 'joke'],
    description: 'returns a dad joke.',
    run: async ({ message }) => {

        // Read data from api
        axios.get(`https://icanhazdadjoke.com`, {
            headers: {
                "Accept": "application/json",
                "User-Agent": "axios"
            }
        })
            .then((res) => {
                // Get joke to api data
                const { joke } = res.data;

                // Create embed
                const embed = new MessageEmbed()
                    .setColor("RANDOM")
                    .setTitle("Dad Joke")
                    .setDescription(joke)

                // Send embed
                message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } })
            })
    },
});