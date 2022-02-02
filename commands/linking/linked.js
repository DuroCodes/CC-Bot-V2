const { MessageEmbed } = require('discord.js');
const Schema = require('../../models/usernames')
const { Command } = require('reconlx');

module.exports = new Command({
    name: "linked",
    aliases: ['account', 'acc'],
    description: 'views a user\'s linked minecraft account.',
    args: '(user)',
    examples: ['@Duro#5232'],
    run: async ({ client, message }) => {

        // Create variables for member, cached member (user) and find from mongodb 
        const member = message.mentions.members.first() || message.author;
        const User = client.users.cache.get(member.id);
        const mongo = await Schema.findOne({ userID: member.id });

        // Create embed for current username and check if there is no username linked
        var user;
        if (mongo !== null) user = mongo;
        else return client.errorEmbed(message, `\`${User.tag}\` could not be found in the database.`)

        // Create embed
        const embed = new MessageEmbed()
            .setTitle("Current Linked Account")
            .setColor(client.colors.purple)
            .setDescription(`\`${User.tag}\`'s current linked account is: \`${user.username}\``);

        // Send embed
        message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });

    },
});