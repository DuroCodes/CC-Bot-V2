const { Trivia } = require('weky');
const { Command } = require('reconlx');

module.exports = new Command({
    name: "trivia",
    aliases: ["riddle", "triv"],
    description: 'creates a trivia to answer.',
    args: '(difficulty)',
    cooldown: 60000,
    examples: ['easy', 'medium', 'hard'],
    run: async ({ client, message, args }) => {

        // Create difficulty variables
        let difficulty;
        if (['easy', 'medium', 'hard'].includes(args[0])) difficulty = args[0];
        else difficulty = 'easy';

        // Create trivia game
        await Trivia({
            message: message,
            embed: {
                title: 'Trivia',
                description: 'You only have **{{time}}** to guess the answer!',
                color: client.colors.blurple,
                footer: 'Crystals Crescent Bot',
                timestamp: true
            },
            difficulty,
            thinkMessage: 'Thinking',
            winMessage: 'Correct! It was **{{answer}}**. You gave the correct answer in **{{time}}**. You earned 1 <:Heads:914010199940038666>.',
            loseMessage: 'Better luck next time! The correct answer was **{{answer}}**.',
            emojis: {
                one: '1️⃣',
                two: '2️⃣',
                three: '3️⃣',
                four: '4️⃣',
            },
            othersMessage: 'Only <@{{author}}> can use the buttons!',
            returnWinner: 0
        })

    }
});