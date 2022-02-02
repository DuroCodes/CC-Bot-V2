const { MessageEmbed } = require('discord.js');
const { pagination } = require('reconlx');
const { Command } = require('reconlx');
const moment = require("moment");

module.exports = new Command({
    name: "snipe",
    description: 'views last deleted message.',
    run: async ({ client, message }) => {

        // Check if member has staff role
        if (message.member.roles.cache.some(role => role.name === '「 Staff 」') || message.member.roles.cache.some(role => role.name === '⸻Management Staff⸻')) {

            // Set snipes to the snipes for the current server & return error if no deleted messages available
            const snipes = client.snipes.get(message.channel.id);
            if (!snipes) return client.errorEmbed(message, "There's nothing to snipe.");

            // Create array of embeds for every snipe in the snipes variable
            let embeds = [];
            snipes.forEach(snipe => {
                const { msg, time, image } = snipe;
                embeds.push(
                    new MessageEmbed()
                        .setAuthor({ name: msg.author.tag, iconURL: msg.author.displayAvatarURL({ dynamic: true }) })
                        .setImage(image)
                        .setDescription(msg.content)
                        .setFooter(`${moment(time).fromNow()}`)
                        .setColor(client.colors.purple)
                );
            });

            // Pagcination for each embed
            pagination({
                author: message.author,
                channel: message.channel,
                embeds: embeds,
                fastSkip: true,
                time: 60000,
            });

            // Create modlogs embed
            const embed = new MessageEmbed()
                .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
                .setDescription(`\`${message.author.tag}\` used command \`${client.config.prefix}snipe\` in ${message.channel}`)
                .setFooter(`Crystals Crescent Bot`, client.user.displayAvatarURL({ dynamic: true }))
                .setColor(client.colors.purple)
                .setTimestamp();

            // Find modlogs channel and send embed
            const modLogs = message.guild.channels.cache.find(ch => ch.name === "┃mod-logs");
            if (!modLogs) return client.errorEmbed(message, `The \`#┃mod-logs\` channel could not be found.`);
            modLogs.send({ embeds: [embed] });

        } else return client.errorEmbed(message, "You do not have permission to use this command.");
    },
});