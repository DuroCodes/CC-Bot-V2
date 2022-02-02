const { MessageEmbed } = require('discord.js');
const { getNameHistory, getSkin } = require('mc-names');
const Schema = require('../../models/usernames')
const { Command } = require('reconlx');

module.exports = new Command({
    name: "names",
    aliases: ['name', 'nh'],
    description: 'retrieves a user\'s name history.',
    args: '[username]',
    examples: ['@Duro#5232', '_Duro_'],
    run: async ({ client, message, args }) => {

        // Function to check if username is not valid
        function notValid(str) {
            var regex = /[!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?]/g;
            return regex.test(str);
        }

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

        // Get skin, name, and cape data
        const skin = await getSkin(user);
        const names = await getNameHistory(user);

        // Error for no data found for username
        if (!names) return client.errorEmbed(message, "No data found for this username.")

        // Get data from names variable
        const { username, history } = names;

        // For loop to add data to data variable
        let data = "";
        for (var i in history) {
            x = i -= 1;

            const username = history[i + 1]["username"];
            const date = history[i + 1]["date"] || 'First Username.';

            if (date !== 'First Username.') {
                const msDate = Math.round(parseInt(date) / 1000);
                data += `**${x + 2}.** \`${username}\` - <t:${msDate.toString()}:R>\n`;
            }
            else data += `**${x + 2}.** \`${username}\` - ${date}\n`;
        }

        // Create embed
        const embed = new MessageEmbed()
            .setColor(client.colors.purple)
            .setTitle(`Name History for ${user}`.replaceAll('_', '\\_'))
            .setDescription(`Current Username: \`${username}\``)
            .setThumbnail(skin.head)
            .addFields(
                { name: `Textures`, value: `Skin: [View Skin](${skin.download})`, inline: true },
                { name: `Information`, value: `Username Changes: \`${history.length - 1}\``, inline: true },
                { name: `Previous Usernames:`, value: data, inline: false }
            );

        // Send embed
        message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
    },
});