const { MessageEmbed } = require('discord.js');
const { Command } = require('reconlx');

module.exports = new Command({
    name: "poll",
    description: 'creates a poll.',
    args: '[channel] | [ping] | [topic] | [questions]',
    examples: ['#general | @Polls | Topic | 1️⃣ - option 1, 2️⃣ - option 2'],
    run: async ({ client, message, args }) => {

        // Check if member has management staff role
        if (!message.member.roles.cache.some(role => role.name === '⸻Management Staff⸻')) return client.errorEmbed(message, "You do not have permission to use this command.");

        // Get input from args
        const items = args.join(" ").split(" | ");
        const channel = message.mentions.channels.first();
        const ping = items[1];
        const topic = items[2];
        const questions = items[3];

        // Check if missing input
        if (!channel || !ping || !topic || !questions) return client.errorEmbed(message, `Invalid arguments. \`${client.config.prefix}help ${module.exports.name}\``)

        // Split questions for multiple questions
        const splittedQuestions = questions.split(',');

        // Setup arrays for emojis and questions
        let pollEmojis = [];
        let pollQuestions = [];

        // For loop to make question and emoji array
        for (const ques of splittedQuestions)
            if (ques.includes('-')) {
                const split = ques.split('-');
                pollQuestions.push(split[1].trim())
                pollEmojis.push(split[0].trim());
            }
            else return client.errorEmbed(message, `Could not find questions in the command. \`${client.config.prefix}help ${module.exports.name}\``)

        // Make questions with a foor loop
        let questionDesc = '';
        for (let i = 0; i < pollEmojis.length; i++) questionDesc += `${pollEmojis[i]} - ${pollQuestions[i]}\n`;

        // Create embed
        const embed = new MessageEmbed()
            .setTitle(topic)
            .setDescription(questionDesc)
            .setColor(client.colors.purple)
            .setFooter({ text: `Crystals Crescent Bot` })
            .setAuthor({ name: `Poll by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
            .setTimestamp();


        // Send poll and react
        channel.send({ content: ping, embeds: [embed] }).then(async (m) => {
            for (let i = 0; i < pollEmojis.length; i++) {
                try { await m.react(pollEmojis[i]) }
                catch (err) { return client.errorEmbed(message, `The emoji \`${pollEmojis[i]}\` could not be found.`); };

            }
        });

        // Send success message
        client.successEmbed(message, `The poll was created successfully.`);

    },
});