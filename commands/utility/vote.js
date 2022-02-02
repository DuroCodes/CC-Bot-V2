const { MessageEmbed } = require('discord.js');
const { Command } = require('reconlx');

module.exports = new Command({
    name: "vote",
    description: 'vote to receieve in-game rewards.',
    run: async ({ client, message }) => {

        // Create embed
        const embed = new MessageEmbed()
            .setColor(client.colors.purple)
            .setTitle("<:Crystals_Crescent:913292239948627999> Crystals Crescent Voting")
            .setDescription("Voting is a free way to show your support for Crystals Crescent. It helps increase Crystals Crescent ranking on listing websites.\n\n[Vote Here](https://crystals-crescent.com/vote/)")
            .setFooter({ text: `Crystals Crescent | play.crystals-crescent.com`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })

        // Send embed
        message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } })

    },
});