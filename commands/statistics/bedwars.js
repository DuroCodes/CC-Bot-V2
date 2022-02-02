const { MessageEmbed } = require('discord.js');
const Schema = require('../../models/usernames')
const { Command } = require('reconlx');

module.exports = new Command({
    name: "bedwars",
    aliases: ['bw-stats', 'bw'],
    description: 'retrieves a user\'s bedwars stats.',
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
            // Get player's bedwars data
            const { bedwars } = player.stats;

            // Create embed
            const mainEmbed = new MessageEmbed()
                .setTitle(`[${bedwars.level}✫] [${player.rank}] ${player.nickname} | BedWars`.replace('_', '\\_'))
                .setFooter({ text: `Crystals Crescent | play.crystals-crescent.com`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
                .setColor(colors[player.rank.toLowerCase()])
                .setThumbnail(`https://minotar.net/helm/${user}/1000.png`)
                .addFields({
                    name: '**Overall**',
                    value: `Coins: \`${commaNumber(bedwars.coins)}\`\nPrestige: \`${(bedwars.prestige)}\`\nKills: \`${commaNumber(bedwars.kills)}\`\nDeaths: \`${commaNumber(bedwars.deaths)}\`\nWins: \`${commaNumber(bedwars.wins)}\`\nWinstreak \`${commaNumber(bedwars.winstreak)}\`\nLosses: \`${commaNumber(bedwars.losses)}\`\nK/D Ratio: \`${bedwars.KDRatio}\`\nW/L Ratio: \`${bedwars.WLRatio}\`\nFK/D Ratio: \`${bedwars.finalKDRatio}\``,
                    inline: true
                }, {
                    name: '**Solo**',
                    value: `Kills: \`${commaNumber(bedwars.solo.kills)}\`\nDeaths: \`${commaNumber(bedwars.solo.deaths)}\`\nWins: \`${commaNumber(bedwars.solo.wins)}\`\nLosses: \`${commaNumber(bedwars.solo.losses)}\`\nK/D Ratio: \`${commaNumber(bedwars.solo.KDRatio)}\`\nW/L Ratio: \`${commaNumber(bedwars.solo.WLRatio)}\`\nFK/D Ratio: \`${commaNumber(bedwars.solo.finalKDRatio)}\`\nPlayed Games: \`${commaNumber(bedwars.solo.playedGames)}\`\nBeds Broken: \`${bedwars.solo.beds.broken}\`\nB/L Ratio: \`${bedwars.solo.beds.BLRatio}\``,
                    inline: true
                }, {
                    name: '**Doubles**',
                    value: `Kills: \`${commaNumber(bedwars.doubles.kills)}\`\nDeaths: \`${commaNumber(bedwars.doubles.deaths)}\`\nWins: \`${commaNumber(bedwars.doubles.wins)}\`\nLosses: \`${commaNumber(bedwars.doubles.losses)}\`\nK/D Ratio: \`${commaNumber(bedwars.doubles.KDRatio)}\`\nW/L Ratio: \`${commaNumber(bedwars.doubles.WLRatio)}\`\nFK/D Ratio: \`${commaNumber(bedwars.doubles.finalKDRatio)}\`\nPlayed Games: \`${commaNumber(bedwars.doubles.playedGames)}\`\nBeds Broken: \`${bedwars.doubles.beds.broken}\`\nB/L Ratio: \`${bedwars.doubles.beds.BLRatio}\``,
                    inline: true
                }, {
                    name: '**3v3v3v3**',
                    value: `Kills: \`${commaNumber(bedwars.threes.kills)}\`\nDeaths: \`${commaNumber(bedwars.threes.deaths)}\`\nWins: \`${commaNumber(bedwars.threes.wins)}\`\nLosses: \`${commaNumber(bedwars.threes.losses)}\`\nK/D Ratio: \`${commaNumber(bedwars.threes.KDRatio)}\`\nW/L Ratio: \`${commaNumber(bedwars.threes.WLRatio)}\`\nFK/D Ratio: \`${commaNumber(bedwars.threes.finalKDRatio)}\`\nPlayed Games: \`${commaNumber(bedwars.threes.playedGames)}\`\nBeds Broken: \`${bedwars.threes.beds.broken}\`\nB/L Ratio: \`${bedwars.threes.beds.BLRatio}\``,
                    inline: true
                }, {
                    name: '**4v4v4v4**',
                    value: `Kills: \`${commaNumber(bedwars.fours.kills)}\`\nDeaths: \`${commaNumber(bedwars.fours.deaths)}\`\nWins: \`${commaNumber(bedwars.fours.wins)}\`\nLosses: \`${commaNumber(bedwars.fours.losses)}\`\nK/D Ratio: \`${commaNumber(bedwars.fours.KDRatio)}\`\nW/L Ratio: \`${commaNumber(bedwars.fours.WLRatio)}\`\nFK/D Ratio: \`${commaNumber(bedwars.fours.finalKDRatio)}\`\nPlayed Games: \`${commaNumber(bedwars.fours.playedGames)}\`\nBeds Broken: \`${bedwars.fours.beds.broken}\`\nB/L Ratio: \`${bedwars.fours.beds.BLRatio}\``,
                    inline: true
                }, {
                    name: '**4v4**',
                    value: `Kills: \`${commaNumber(bedwars['4v4'].kills)}\`\nDeaths: \`${commaNumber(bedwars['4v4'].deaths)}\`\nWins: \`${commaNumber(bedwars['4v4'].wins)}\`\nLosses: \`${commaNumber(bedwars['4v4'].losses)}\`\nK/D Ratio: \`${commaNumber(bedwars['4v4'].KDRatio)}\`\nW/L Ratio: \`${commaNumber(bedwars['4v4'].WLRatio)}\`\nFK/D Ratio: \`${commaNumber(bedwars['4v4'].finalKDRatio)}\`\nPlayed Games: \`${commaNumber(bedwars['4v4'].playedGames)}\`\nBeds Broken: \`${bedwars['4v4'].beds.broken}\`\nB/L Ratio: \`${bedwars['4v4'].beds.BLRatio}\``,
                    inline: true
                });

            // Send embed
            message.reply({ embeds: [mainEmbed], allowedMentions: { repliedUser: false } })
        })
            // Error catching
            .catch((e) => {
                client.errorEmbed(message, "This user did not show up in the API.");
            });


    },
});