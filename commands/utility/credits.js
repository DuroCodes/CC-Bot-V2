const { MessageEmbed } = require("discord.js");
const { Command } = require('reconlx');

module.exports = new Command({
    name: "credits",
    aliases: ['credit', 'cred'],
    description: "credits for the bot.",
    run: async ({ client, message }) => {

        // Create embed
        const embed = new MessageEmbed()
            .setTitle("Crystals Crescent Bot Credits")
            .addFields(
                { name: "**Discord Bot Developer:**", value: "[Duro#5232](https://durodev.ga)", inline: true },
                { name: "** **", value: "**[SERVER IP](https://discord.com/channels/782480818143756288/782483320470372353) | [WEBSITE](https://crystals-crescent.com)**" }
            )
            .setColor(client.colors.purple);

        // Send embed
        message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } })
    },
});