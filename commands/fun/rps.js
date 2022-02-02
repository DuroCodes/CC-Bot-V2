const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');
const { Command } = require('reconlx');

module.exports = new Command({
    name: "rps",
    aliases: ['rockpaperscissors'],
    description: 'plays a game of rock paper scissors with the mentioned user.',
    args: '[user]',
    examples: ['@Duro#5232'],
    run: async ({ client, message }) => {

        // Colors for rock paper scissors
        const colorMap = {
            grey: 'SECONDARY',
            red: 'DANGER',
            green: 'SUCCESS',
            blurple: 'PRIMARY'
        }

        // Rock paper scissors function
        async function rps(msgOrInter, options = {}) {
            //Default values
            options.credit ??= true

            options.embedColor ??= client.colors.purple;
            options.timeoutEmbedColor ??= client.colors.red;
            options.drawEmbedColor ??= client.colors.purple;
            options.winEmbedColor ??= client.colors.red;

            options.rockColor = colorMap[options.rockColor] || options.rockColor || 'SECONDARY'
            options.paperColor = colorMap[options.paperColor] || options.paperColor || 'SECONDARY'
            options.scissorsColor = colorMap[options.scissorsColor] || options.scissorsColor || 'SECONDARY'

            let foot = options.embedFoot
            if (options.credit === 0) foot ??= 'Crystals Crescent Bot | Rock Paper Scissors'
            else foot ??= 'Crystals Crescent Bot | Rock Paper Scissors'

            //Accept decline buttons
            const accept = new MessageButton()
                .setLabel('Accept')
                .setStyle('SUCCESS')
                .setCustomId('accept')

            const decline = new MessageButton()
                .setLabel('Decline')
                .setStyle('DANGER')
                .setCustomId('decline')

            const acceptComponents = new MessageActionRow().addComponents([
                accept,
                decline
            ])

            //RPS Buttons
            const rock = new MessageButton()
                .setLabel('ROCK')
                .setCustomId('rock')
                .setStyle(options.rockColor)
                .setEmoji('🪨')

            const paper = new MessageButton()
                .setLabel('PAPER')
                .setCustomId('paper')
                .setStyle(options.paperColor)
                .setEmoji('📄')

            const scissors = new MessageButton()
                .setLabel('SCISSORS')
                .setCustomId('scissors')
                .setStyle(options.scissorsColor)
                .setEmoji('✂️')

            const rpsComponents = new MessageActionRow().addComponents([
                rock,
                paper,
                scissors
            ])

            //Embeds
            const timeoutEmbed = new MessageEmbed()
                .setTitle('Game Timed Out!')
                .setColor(options.timeoutEmbedColor)
                .setDescription('One or more players did not make a move in time (30s)')
                .setFooter({ foot })

            try {
                /** @type {Message} */
                const message = msgOrInter

                const opponent = message.mentions.members.first()?.user
                if (!opponent) return client.errorEmbed(message, 'No opponent mentioned!')
                if (opponent.bot) return client.errorEmbed(message, 'You cannot play against bots.')
                if (opponent.id === message.author.id) return client.errorEmbed(message, 'You cannot play by yourself!')

                const acceptEmbed = new MessageEmbed()
                    .setTitle(`Waiting for ${opponent.tag} to accept!`)
                    .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
                    .setColor(options.embedColor)
                    .setFooter({ text: foot })

                const { channel } = message

                /** @type {Message} */
                let m = await message.reply({
                    content: `Hey ${opponent.toString()}. You got a RPS invite`,
                    embeds: [acceptEmbed],
                    components: [acceptComponents],
                    allowedMentions: { repliedUser: false }
                })

                const acceptCollector = m.createMessageComponentCollector({
                    type: 'BUTTON',
                    time: 30000
                })

                acceptCollector.on('collect', async (button) => {
                    if (button.user.id !== opponent.id)
                        return await button.reply({
                            content: 'You cant play the game as they didn\'t call you to play.',
                            ephemeral: true
                        })

                    if (button.customId == 'decline') {
                        await button.deferUpdate()
                        return acceptCollector.stop('decline')
                    }

                    await button.deferUpdate()
                    let selectEmbed = new MessageEmbed()
                        .setTitle(`${message.author.tag} VS. ${opponent.tag}`)
                        .setColor(options.embedColor)
                        .setFooter({ text: foot })
                        .setDescription('Select 🪨, 📄, or ✂️')

                    await m.edit({
                        embeds: [selectEmbed],
                        components: [rpsComponents]
                    })

                    acceptCollector.stop()
                    let ids = new Set()
                    ids.add(message.author.id)
                    ids.add(opponent.id)

                    let op, auth

                    const btnCollector = m.createMessageComponentCollector({
                        type: 'BUTTON',
                        time: 30000
                    })
                    btnCollector.on('collect', async (b) => {
                        if (!ids.has(b.user.id))
                            return await button.reply({
                                content: 'You cant play the game as they didn\'t call you to play.',
                                ephemeral: true
                            })
                        ids.delete(b.user.id)

                        await b.deferUpdate()
                        if (b.user.id === opponent.id) op = b.customId
                        if (b.user.id === message.author.id) auth = b.customId

                        if (ids.size == 0) btnCollector.stop()
                    })

                    btnCollector.on('end', async (coll, reason) => {
                        if (reason === 'time') {
                            await m.edit({
                                embeds: [timeoutEmbed],
                                components: []
                            })
                        } else {
                            const winnerMap = {
                                rock: 'scissors',
                                scissors: 'paper',
                                paper: 'rock'
                            }

                            if (op === auth) {
                                await m.edit({
                                    embeds: [
                                        new MessageEmbed()
                                            .setTitle('Draw!')
                                            .setColor(options.drawEmbedColor)
                                            .setDescription(`Both players chose **${op}**`)
                                            .setTimestamp()
                                            .setFooter({ text: foot })
                                    ],
                                    components: []
                                })
                            } else if (winnerMap[op] === auth) {
                                //op - won
                                await m.edit({
                                    embeds: [
                                        new MessageEmbed()
                                            .setTitle(`${opponent.tag} Wins!`)
                                            .setColor(options.winEmbedColor)
                                            .setDescription(`**${op}** defeats **${auth}**`)
                                            .setFooter({ text: foot })
                                    ],
                                    components: []
                                })
                            } else {
                                //auth - won
                                await m.edit({
                                    embeds: [
                                        new MessageEmbed()
                                            .setTitle(`${message.author.tag} Wins!`)
                                            .setColor(options.winEmbedColor)
                                            .setDescription(`**${auth}** defeats **${op}**`)
                                            .setFooter({ text: foot })
                                    ],
                                    components: []
                                })
                            }
                        }
                    })
                })

                acceptCollector.on('end', async (coll, reason) => {
                    if (reason === 'time') {
                        await m.edit({
                            embeds: [
                                new MessageEmbed()
                                    .setTitle('Challenge Not Accepted in Time')
                                    .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
                                    .setColor(options.timeoutEmbedColor)
                                    .setFooter({ text: foot })
                                    .setDescription('Ran out of time!\nTime limit: 30s')
                            ],
                            components: []
                        })
                    } else if (reason === 'decline') {
                        await m.edit({
                            embeds: [
                                new MessageEmbed()
                                    .setTitle('Game Declined!')
                                    .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
                                    .setColor(options.timeoutEmbedColor || client.colors.red)
                                    .setFooter({ text: foot })
                                    .setDescription(
                                        `${opponent.toString()} has declined your game!`
                                    )
                            ],
                            components: []
                        })
                    }
                })
            } catch (err) {
                console.log(`Error Occured. | rps | Error: ${err.stack}`)
            }
        }

        // Use rock paper scissors function
        rps(message);

    },
});