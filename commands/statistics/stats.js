const Schema = require('../../models/usernames')
const { MessageEmbed } = require('discord.js');
const { Command } = require('reconlx');
const axios = require('axios');

module.exports = new Command({
    name: "stats",
    aliases: ['playtime'],
    description: 'retrieves a user\'s crystals crescent stats.',
    args: '[username]',
    examples: ['@Duro#5232', '_Duro_'],
    run: async ({ client, message, args }) => {

        // Function for checking if username is not valid
        const notValid = (str) => {
            var regex = /[!@#$%^&()+\-=\[\]{};':"\\|,.<>\/?]/g;
            return regex.test(str);
        };

        // Get data from mongodb for mentioned user and author
        const mentionedMember = message.mentions.members.first();
        const mentionedMongo = await Schema.findOne({ userID: mentionedMember?.id });
        const authorMongo = await Schema.findOne({ userID: message.author.id });

        // Create user variable and set it to mentioned user's linked account or args[0] or the author
        var user;
        if (mentionedMongo !== null) user = mentionedMongo.username;
        else if (notValid(args[0]) === false && (args[0])) user = args[0];
        else if (authorMongo !== null) user = authorMongo.username;
        if (!user) return client.errorEmbed(message, `Please mention a user with a linked account, include a username or link your account (\`${client.config.prefix}link [username]\`)`);

        axios.get(`https://stats.crystals-crescent.com/v1/player?player=${user}`)
            .then(res => {
                const { info, online_activity } = res.data;

                const embed = new MessageEmbed()
                    .setThumbnail(`https://minotar.net/helm/${user}/1000.png`)
                    .setTitle(`${user} | Statistics`.replace('_', '\\_'))
                    .setDescription(`\
**Mob Kills:** \`${info.mob_kill_count}\`
**Player Kills:** \`${info.player_kill_count}\`
**Death Count:** \`${info.death_count}\`
**Last Seen:** \`${info.last_seen}\`
**Registered:** \`${info.registered}\`
**Playtime:** \`${info.playtime}\`
**Activity:** \`${info.activity_index} (${info.activity_index_group})\`
**Average Ping:** \`${info.average_ping}\`
**Active Playtime (7d):** \`${online_activity.active_playtime_7d}\``)
                    .setColor(client.colors.purple)
                    .setFooter({ text: `Crystals Crescent Bot`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
                    .setTimestamp();

                message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
            })
            .catch(error => {
                client.errorEmbed(message, `\`${user}\` was not found in the database.`)
            });

    },
});