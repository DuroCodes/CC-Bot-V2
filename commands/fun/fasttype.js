const { Command } = require('reconlx');
const { FastType } = require('weky');
const txtgen = require('txtgen');

module.exports = new Command({
    name: "fast-type",
    aliases: ["fasttype", "ft", "wpm"],
    description: 'tests how fast you can type.',
    args: '(sentence)',
    examples: ['this is a sentence'],
    run: async ({ client, message, args }) => {

        // Generate sentence
        const sentence = args[0] ? args.join(" ") : txtgen.sentence();

        // Generate fast type game
        await FastType({
            message: message,
            embed: {
                title: 'Fast Type',
                description: 'You have **{{time}}** to type the sentence below.',
                color: client.colors.blurple,
                footer: 'Crystals Crescent Bot',
                timestamp: true
            },
            sentence,
            winMessage: 'You have a wpm of **{{wpm}}**. You typed the prompt in **{{time}}**.',
            loseMessage: 'Better luck next time!',
            cancelMessage: 'You ended the game!',
            time: 60000,
            buttonText: 'Cancel',
            othersMessage: 'Only <@{{author}}> can use the buttons!'
        });

    }
});