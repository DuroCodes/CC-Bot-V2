const { MessageEmbed } = require('discord.js');
const { Command } = require('reconlx');
const axios = require('axios');

module.exports = new Command({
    name: "banner",
    aliases: ['b'],
    description: 'retrieves a user\'s banner.',
    args: '(user)',
    examples: ['@Duro#5232'],
    run: async ({ client, message }) => {

        // Set user to mentioned member or author and cache user
        const user = message.mentions.members.first() || message.author;
        const User = client.users.cache.get(user.id);

        // Get data from api
        axios.get(`https://discord.com/api/users/${User.id}`, {
            headers: {
                Authorization: `Bot ${client.config.token}`
            }
        })
            .then((res) => {
                // Get banner and accent color from api data
                const { banner, accent_color } = res.data;

                // Check if user has a banner
                if (banner) {
                    // Set image to .png or .gif and create banner url
                    const extension = banner.startsWith("a_") ? '.gif' : '.png';
                    const url = `https://cdn.discordapp.com/banners/${User.id}/${banner}${extension}?size=1024`;

                    // Create embed
                    const embed = new MessageEmbed()
                        .setAuthor({ name: `${User.username}'s banner`, iconURL: User.displayAvatarURL({ dynamic: true }) })
                        .setColor(client.colors.purple)
                        .setImage(url);

                    // Send embed
                    message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } })
                } else {
                    // Get accent color if user doesn't have banner
                    if (accent_color) {
                        // Create embed
                        const embed = new MessageEmbed()
                            .setAuthor({ name: `${User.username}'s accent color`, iconURL: User.displayAvatarURL({ dynamic: true }) })
                            .setColor(accent_color);

                        // Send embed
                        message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } })
                    }
                    // Send error if user has no banner or accent color
                    else return client.errorEmbed(message, `\`${User.tag}\` has no banner or accent color.`)
                }
            })
    },
});