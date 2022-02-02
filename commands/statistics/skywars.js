const { pagination, Command } = require('reconlx');
const Schema = require('../../models/usernames')
const { MessageEmbed } = require('discord.js');


module.exports = new Command({
    name: "skywars",
    aliases: ['sw-stats-stats', 'sw'],
    description: 'retrieves a user\'s skywars stats.',
    args: '[username]',
    examples: ['@Duro#5232', '_Duro_'],
    run: async ({ client, message, args }) => {

        // Function for checking if username is not valid
        const notValid = (str) => {
            var regex = /[!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?]/g;
            return regex.test(str);
        };

        // Function for converting string to string with commas
        const commaNumber = (str) => {
            return str.toLocaleString();
        };

        // Function to create progress bar for leveling up
        const progressBar = (percent, bar) => {
            for (n = 0; n < 20; n++) {
                if (percent > (n + 1) * 5) bar.push('■');
                else bar.push('━');
            }
            return `[${bar.join("")}]`;
        };

        // Colors based on rank 
        const colors = {
            "default": "#AAAAAA",
            "vip": "#55FF55",
            "vip+": "#55FF55",
            "mvp": "#55FFFF",
            "mvp+": "#55FFFF",
            "mvp++": "#FFAA00",
            "helper": "#5555FF",
            "mod": "#00AA00",
            "admin": "#FF5555",
            "owner": "#FF5555",
            "mojang": "#FFAA00",
            "sloth": "#FF5555",
            "events": "#FFAA00",
            "pig+++": "#FF55FF"
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

        // Use hypixel api to get player
        client.hypixel.getPlayer(user).then((player) => {
            // Get player's skywars data
            const { skywars } = player.stats;

            // Create main embed
            const mainEmbed = new MessageEmbed()
                .setTitle(`[${skywars.level}★] [${player.rank}] ${player.nickname} | SkyWars`.replace('_', '\\_'))
                .setFooter({ text: `Crystals Crescent | play.crystals-crescent.com`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
                .setColor(colors[player.rank.toLowerCase()])
                .setThumbnail(`https://minotar.net/helm/${user}/1000.png`)
                .addFields({
                    name: `**Overall**`,
                    value: `Coins: \`${commaNumber(skywars.coins)}\`\nTokens: \`${commaNumber(skywars.tokens)}\`\nSouls: \`${commaNumber(skywars.souls)}\`\nKills: \`${commaNumber(skywars.kills)}\`\nDeaths: \`${commaNumber(skywars.deaths)}\`\nWins: \`${commaNumber(skywars.wins)}\`\nLosses: \`${commaNumber(skywars.losses)}\`\nK/D Ratio: \`${commaNumber(skywars.KDRatio)}\`\nW/L Ratio: \`${commaNumber(skywars.WLRatio)}\`\nPlayed Games: \`${commaNumber(skywars.playedGames)}\``,
                    inline: true
                }, {
                    name: `**Solo**`,
                    value: `Kills: \`${commaNumber(skywars.solo.overall.kills)}\`\nDeaths: \`${commaNumber(skywars.solo.overall.deaths)}\`\nWins: \`${commaNumber(skywars.solo.overall.wins)}\`\nLosses: \`${commaNumber(skywars.solo.overall.losses)}\`\nK/D Ratio: \`${commaNumber(skywars.solo.overall.KDRatio)}\`\nW/L Ratio: \`${commaNumber(skywars.solo.overall.WLRatio)}\`\nPlayed Games: \`${commaNumber(skywars.solo.overall.playedGames)}\``,
                    inline: true
                }, {
                    name: `**Teams**`,
                    value: `Kills: \`${commaNumber(skywars.team.overall.kills)}\`\nDeaths: \`${commaNumber(skywars.team.overall.deaths)}\`\nWins: \`${commaNumber(skywars.team.overall.wins)}\`\nLosses: \`${commaNumber(skywars.team.overall.losses)}\`\nK/D Ratio: \`${commaNumber(skywars.team.overall.KDRatio)}\`\nW/L Ratio: \`${commaNumber(skywars.team.overall.WLRatio)}\`\nPlayed Games: \`${commaNumber(skywars.team.overall.playedGames)}\``,
                    inline: true
                }, {
                    name: `**Ranked**`,
                    value: `Kills: \`${commaNumber(skywars.ranked.kills)}\`\nDeaths: \`${commaNumber(skywars.ranked.deaths)}\`\nWins: \`${commaNumber(skywars.ranked.wins)}\`\nLosses: \`${commaNumber(skywars.ranked.losses)}\`\nK/D Ratio: \`${commaNumber(skywars.ranked.KDRatio)}\`\nW/L Ratio: \`${commaNumber(skywars.ranked.WLRatio)}\`\nPlayed Games: \`${commaNumber(skywars.ranked.playedGames)}\``,
                    inline: true
                }, {
                    name: `**Ranked**`,
                    value: `Kills: \`${commaNumber(skywars.mega.overall.kills)}\`\nDeaths: \`${commaNumber(skywars.mega.overall.deaths)}\`\nWins: \`${commaNumber(skywars.mega.overall.wins)}\`\nLosses: \`${commaNumber(skywars.mega.overall.losses)}\`\nK/D Ratio: \`${commaNumber(skywars.mega.overall.KDRatio)}\`\nW/L Ratio: \`${commaNumber(skywars.mega.overall.WLRatio)}\`\nPlayed Games: \`${commaNumber(skywars.mega.overall.playedGames)}\``,
                    inline: true
                }, {
                    name: `**Lab**`,
                    value: `Kills: \`${commaNumber(skywars.lab.kills)}\`\nDeaths: \`${commaNumber(skywars.lab.deaths)}\`\nWins: \`${commaNumber(skywars.lab.wins)}\`\nLosses: \`${commaNumber(skywars.lab.losses)}\`\nK/D Ratio: \`${commaNumber(skywars.lab.KDRatio)}\`\nW/L Ratio: \`${commaNumber(skywars.lab.WLRatio)}\`\nPlayed Games: \`${commaNumber(skywars.lab.playedGames)}\``,
                    inline: true
                }, {
                    name: `**Level Progress**`,
                    value: `\`${skywars.level} ${progressBar(skywars.levelProgress.percent, [])} ${parseInt(skywars.level) + 1}\`\n${skywars.levelProgress.currentLevelXp}/${skywars.levelProgress.xpNextLevel} (${skywars.levelProgress.percent}%)`
                });

            // Create more info embed
            const moreInfoEmbed = new MessageEmbed()
                .setTitle(`[${skywars.level}★] [${player.rank}] ${player.nickname} | SkyWars`.replace('_', '\\_'))
                .setFooter({ text: `Crystals Crescent | play.crystals-crescent.com`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
                .setColor(colors[player.rank.toLowerCase()])
                .setThumbnail(`https://minotar.net/helm/${user}/1000.png`)
                .addFields({
                    name: `**Solo Normal**`,
                    value: `Kills: \`${skywars.solo.normal.kills}\`\nDeaths: \`${commaNumber(skywars.solo.normal.deaths)}\`\nWins: \`${commaNumber(skywars.solo.normal.wins)}\`\nLosses: \`${commaNumber(skywars.solo.normal.losses)}\`\nK/D Ratio: \`${commaNumber(skywars.solo.normal.KDRatio)}\`\nW/L Ratio: \`${commaNumber(skywars.solo.normal.WLRatio)}\``,
                    inline: true
                }, {
                    name: `**Solo Insane**`,
                    value: `Kills: \`${skywars.solo.insane.kills}\`\nDeaths: \`${commaNumber(skywars.solo.insane.deaths)}\`\nWins: \`${commaNumber(skywars.solo.insane.wins)}\`\nLosses: \`${commaNumber(skywars.solo.insane.losses)}\`\nK/D Ratio: \`${commaNumber(skywars.solo.insane.KDRatio)}\`\nW/L Ratio: \`${commaNumber(skywars.solo.insane.WLRatio)}\``,
                    inline: true
                }, { name: '\u200b', value: '\u200b', inline: true }, {
                    name: `**Teams Normal**`,
                    value: `Kills: \`${skywars.team.normal.kills}\`\nDeaths: \`${commaNumber(skywars.team.normal.deaths)}\`\nWins: \`${commaNumber(skywars.team.normal.wins)}\`\nLosses: \`${commaNumber(skywars.team.normal.losses)}\`\nK/D Ratio: \`${commaNumber(skywars.team.normal.KDRatio)}\`\nW/L Ratio: \`${commaNumber(skywars.team.normal.WLRatio)}\``,
                    inline: true
                }, {
                    name: `**Teams Insane**`,
                    value: `Kills: \`${skywars.team.insane.kills}\`\nDeaths: \`${commaNumber(skywars.team.insane.deaths)}\`\nWins: \`${commaNumber(skywars.team.insane.wins)}\`\nLosses: \`${commaNumber(skywars.team.insane.losses)}\`\nK/D Ratio: \`${commaNumber(skywars.team.insane.KDRatio)}\`\nW/L Ratio: \`${commaNumber(skywars.team.insane.WLRatio)}\``,
                    inline: true
                }, { name: '\u200b', value: '\u200b', inline: true });

            // Pagination for embeds
            pagination({
                author: message.author,
                channel: message.channel,
                embeds: [mainEmbed, moreInfoEmbed],
                fastSkip: 0,
                time: 30000,
            })

        })
            // Error catching
            .catch((e) => {
                client.errorEmbed(message, "This user did not show up in the API.");
            });
    },
});