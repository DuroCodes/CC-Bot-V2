const { MessageEmbed, MessageAttachment } = require('discord.js');
const { Command } = require('reconlx');

module.exports = new Command({
    name: "compare",
    aliases: ['comp', 'cmpr'],
    description: 'compares stats of two users.',
    args: '[username] [username] [gamemode]',
    examples: ['_Duro_ LY5S skywars', '_Duro_ LY5S bedwars', '_Duro_ LY5S murder_mystery', '_Duro_ LY5S duels'],
    run: async ({ client, message, args }) => {

        // Create variables and check if all variables are included
        const firstPlayer = await client.hypixel.getPlayer(args[0]).catch(console.log);
        const secondPlayer = await client.hypixel.getPlayer(args[1]).catch(console.log);
        const gamemode = args[2]?.toLowerCase();
        if (!firstPlayer || !secondPlayer || !gamemode) return client.errorEmbed(message, `Invalid arguments. \`${client.config.prefix}help ${module.exports.name}\``)

        // Matching list for each gamemode
        const matchSkywars = ["skywars", "sw", "skyw", "swars", "sky-wars", "sky_wars"];
        const matchBedwars = ["bedwars", "bw", "bedw", "bwars", "bed-wars", "bed_wars"];
        const matchMurder = ["murder", "mm", "murdermystery", "murderm", "mmystery", "mystery", "murder_mystery", "murder-mystery"];
        const matchDuels = ["duels", "1v1", "duel", "1v1s", "d"];

        // Function for comparing users and return the difference and emoji
        const compare = (a, b) => {
            a = (a - Math.floor(a)) === false ? Math.floor(a) : a;
            b = (b - Math.floor(b)) === false > 1 ? Math.floor(b) : b;
            return `\`${a.toLocaleString()}\` | \`${b.toLocaleString()}\`\n${a > b ? '<:green_triangle_up:914180319710687232>' : (a === b ? '<:equal:914180319819751474>' : '🔻')} \`${Math.abs(a - b).toLocaleString()}\``;
        };

        // Compare skywars function
        const compareSkywars = (first, second) => {

            const fps = first.stats.skywars;
            const sps = second.stats.skywars;
            if (!fps || !sps) return client.errorEmbed(message, `One of the players has no stats in SkyWars.`);
            const embed = new MessageEmbed()
                .setTitle(`Comparing ${first.nickname} with ${second.nickname}`.replace("_", "\\_"))
                .setColor(client.colors.purple)
                .addFields(
                    { name: `**Level**`, value: `${compare(Math.floor(fps.level), Math.floor(sps.level))}`, inline: true },
                    { name: `**Coins**`, value: `${compare(fps.coins, sps.coins)}`, inline: true },
                    { name: `**Winstreak**`, value: `${compare(fps.winstreak, sps.winstreak)}`, inline: true },
                    { name: `**Souls**`, value: `${compare(fps.souls, sps.souls)}`, inline: true },
                    { name: `**Shards**`, value: `${compare(fps.shards, sps.shards)}`, inline: true },
                    { name: `**Heads**`, value: `${compare(fps.heads, sps.heads)}`, inline: true },
                    { name: `**Wins**`, value: `${compare(fps.wins, sps.wins)}`, inline: true },
                    { name: `**Losses**`, value: `${compare(fps.losses, sps.losses)}`, inline: true },
                    { name: `**W/L Ratio**`, value: `${compare(fps.WLRatio, sps.WLRatio)}`, inline: true },
                    { name: `**Kills**`, value: `${compare(fps.kills, sps.kills)}`, inline: true },
                    { name: `**Deaths**`, value: `${compare(fps.deaths, sps.deaths)}`, inline: true },
                    { name: `**K/D Ratio**`, value: `${compare(fps.KDRatio, sps.KDRatio)}`, inline: true },
                    { name: `**Played Games**`, value: `${compare(fps.playedGames, sps.playedGames)}`, inline: true },
                )
                .setTimestamp();
            message.reply({ embeds: [embed], files: [attachment], allowedMentions: { repliedUser: false } });
        };

        // Compare bedwars function
        const compareBedwars = (first, second) => {

            const fps = first.stats.bedwars;
            const sps = second.stats.bedwars;
            if (!fps || !sps) return client.errorEmbed(message, `One of the players has no stats in BedWars.`);
            const embed = new MessageEmbed()
                .setTitle(`Comparing ${first.nickname} with ${second.nickname}`.replace("_", "\\_"))
                .setColor(client.colors.purple)
                .setThumbnail(`attachment://heads.png`)
                .addFields(
                    { name: `**Level**`, value: `${compare(Math.floor(fps.level), Math.floor(sps.level))}`, inline: true },
                    { name: `**Played Games**`, value: `${compare(fps.playedGames, sps.playedGames)}`, inline: true },
                    { name: '\u200b', value: '\u200b', inline: true },
                    { name: `**Coins**`, value: `${compare(fps.coins, sps.coins)}`, inline: true },
                    { name: `**Winstreak**`, value: `${compare(fps.winstreak, sps.winstreak)}`, inline: true },
                    { name: `**Wins**`, value: `${compare(fps.wins, sps.wins)}`, inline: true },
                    { name: `**Losses**`, value: `${compare(fps.losses, sps.losses)}`, inline: true },
                    { name: `**W/L Ratio**`, value: `${compare(fps.WLRatio, sps.WLRatio)}`, inline: true },
                    { name: `**Kills**`, value: `${compare(fps.kills, sps.kills)}`, inline: true },
                    { name: `**Deaths**`, value: `${compare(fps.deaths, sps.deaths)}`, inline: true },
                    { name: `**K/D Ratio**`, value: `${compare(fps.KDRatio, sps.KDRatio)}`, inline: true },
                    { name: `**Beds Broken**`, value: `${compare(fps.beds.broken, sps.beds.broken)}`, inline: true },
                    { name: `**Beds Lost**`, value: `${compare(fps.beds.lost, sps.beds.lost)}`, inline: true },
                    { name: `**B/L Ratio**`, value: `${compare(fps.beds.BLRatio, sps.beds.BLRatio)}`, inline: true },
                )
                .setTimestamp();
            message.reply({ embeds: [embed], files: [attachment], allowedMentions: { repliedUser: false } });
        };

        // Compare duels function
        const compareDuels = (first, second) => {

            const fps = first.stats.duels;
            const sps = second.stats.duels;
            if (!fps || !sps) return client.errorEmbed(message, `One of the players has no stats in Duels.`);
            const embed = new MessageEmbed()
                .setTitle(`Comparing ${first.nickname} with ${second.nickname}`.replace("_", "\\_"))
                .setColor(client.colors.purple)
                .setThumbnail(`attachment://heads.png`)
                .addFields(
                    { name: `**Coins**`, value: `${compare(fps.coins, sps.coins)}`, inline: true },
                    { name: `**Played Games**`, value: `${compare(fps.playedGames, sps.playedGames)}`, inline: true },
                    { name: '\u200b', value: '\u200b', inline: true },
                    { name: `**Wins**`, value: `${compare(fps.wins, sps.wins)}`, inline: true },
                    { name: `**Losses**`, value: `${compare(fps.losses, sps.losses)}`, inline: true },
                    { name: `**W/L Ratio**`, value: `${compare(fps.WLRatio, sps.WLRatio)}`, inline: true },
                    { name: `**Kills**`, value: `${compare(fps.kills, sps.kills)}`, inline: true },
                    { name: `**Deaths**`, value: `${compare(fps.deaths, sps.deaths)}`, inline: true },
                    { name: `**K/D Ratio**`, value: `${compare(fps.KDRatio, sps.KDRatio)}`, inline: true },
                )
                .setTimestamp();
            message.reply({ embeds: [embed], files: [attachment], allowedMentions: { repliedUser: false } });
        };

        // Compare murder mystery function
        const compareMurder = (first, second) => {

            const fps = first.stats.murdermystery;
            const sps = second.stats.murdermystery;
            if (!fps || !sps) return client.errorEmbed(message, `One of the players has no stats in Duels.`);
            const embed = new MessageEmbed()
                .setTitle(`Comparing ${first.nickname} with ${second.nickname}`.replace("_", "\\_"))
                .setColor(client.colors.purple)
                .setThumbnail(`attachment://heads.png`)
                .addFields(
                    { name: `**Coins**`, value: `${compare(fps.coins, sps.coins)}`, inline: true },
                    { name: `**Kills**`, value: `${compare(fps.kills, sps.kills)}`, inline: true },
                    { name: `**Deaths**`, value: `${compare(fps.deaths, sps.deaths)}`, inline: true },
                    { name: `**K/D Ratio**`, value: `${compare(fps.KDRatio, sps.KDRatio)}`, inline: true },
                    { name: `**Wins as Murderer**`, value: `${compare(fps.winsAsMurderer, sps.winsAsMurderer)}`, inline: true },
                    { name: `**Wins as Detective**`, value: `${compare(fps.winsAsDetective, sps.winsAsDetective)}`, inline: true },
                    { name: `**Played Games**`, value: `${compare(fps.playedGames, sps.playedGames)}`, inline: true },
                )
                .setTimestamp();
            message.reply({ embeds: [embed], file: [attachment], allowedMentions: { repliedUser: false } });
        };

        // Checking if the gamemode is in the gamemodes list and sending the embed for the compared stats
        if (matchSkywars.includes(gamemode)) compareSkywars(firstPlayer, secondPlayer);
        else if (matchBedwars.includes(gamemode)) compareBedwars(firstPlayer, secondPlayer);
        else if (matchMurder.includes(gamemode)) compareMurder(firstPlayer, secondPlayer);
        else if (matchDuels.includes(gamemode)) compareDuels(firstPlayer, secondPlayer);
        else return client.errorEmbed(message, `Please enter a valid gamemode \`[bw, sw, duels, mm]\``);

    },
});