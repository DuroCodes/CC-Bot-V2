const { MessageEmbed } = require('discord.js');
const { Command } = require('reconlx');

module.exports = new Command({
    name: "ip",
    description: 'views the server\'s ip address.',
    run: async ({ client, message }) => {

        // Create embed
        const embed = new MessageEmbed()
            .setColor(client.colors.purple)
            .setTitle("<:Crystals_Crescent:913292239948627999> Crystals Crescent IP")
            .setDescription("**Server IP/Address:** play.crystals-crescent.com\n**Bedrock Port:** 19132")
            .setFooter({ text: `Crystals Crescent | play.crystals-crescent.com`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })

        // Send embed
        message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } })
    },
});