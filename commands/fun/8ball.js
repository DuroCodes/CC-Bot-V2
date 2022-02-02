const { MessageEmbed } = require('discord.js');
const { Command } = require('reconlx');

module.exports = new Command({
    name: "8ball",
    aliases: ['8', '8b', 'roll', 'ball'],
    description: 'answers your questions with a magic 8-ball.',
    args: '[question]',
    examples: ['example question'],
    run: async ({ client, message, args }) => {

        // List of possible replies
        const replies = [
            "It is certain",
            "Without a doubt",
            "You may rely on it",
            "Yes",
            "Signs point to yes",
            "Don't count on it",
            "My reply is no",
            "My sources say no",
            "Outlook not so good",
            "Very doubtful"
        ];

        // Get random reply from list of replies
        const result = Math.floor(Math.random() * replies.length)
        const reply = replies[result];

        // Get question from args & return error if no question
        let question = args.join(" ")
        if (!question) return client.errorEmbed(message, `Invalid arguments. \`${client.config.prefix}help ${module.exports.name}\``)

        // Set color based on answer
        const color = result <= 4 ? client.colors.green : client.colors.red;

        // Create embed
        const embed = new MessageEmbed()
            .setTitle('🎱 | Magic 8 Ball')
            .setColor(color)
            .setDescription(`**Question:** ${question}\n**Answer:** ${reply}`)
            .setFooter({ text: `Crystals Crescent`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })

        // Send embed
        message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } })

    },
});