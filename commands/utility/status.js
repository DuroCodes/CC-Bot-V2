const { MessageEmbed } = require('discord.js');
const { Command } = require('reconlx');
const axios = require('axios');

module.exports = new Command({
    name: "status",
    args: '(ip)',
    examples: ['play.crystals-crescent.com'],
    description: "displays a minecraft server's status.",
    run: async ({ client, message, args }) => {

        const ip = args[0]?.toLowerCase() || 'play.crystals-crescent.com';

        try {
            axios.get(`https://api.mcsrvstat.us/1/${ip}`)
                .then((res) => {

                    // Get variables from the api data
                    const { motd, players, version, software } = res?.data;

                    // Create embed
                    const embed = new MessageEmbed()
                        .setTitle("Server Status")
                        .setColor(client.colors.purple)
                        .addFields(
                            { name: "Description", value: `\`\`\`${motd?.clean}\`\`\``.replaceAll(",", "\n") },
                            { name: "Players:", value: `Online: \`${players?.online}\``, inline: true },
                            { name: "Version", value: `Running: \`${software} ${version}\``, inline: true },
                        )
                        .setFooter({ text: `Crystals Crescent | play.crystals-crescent.com`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })

                    // Send embed
                    message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
                });
        } catch (err) {
            client.errorEmbed(message, `An error has occured. The server may be offline.`)
        }

    },
});