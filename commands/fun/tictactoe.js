const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');
const { Command } = require('reconlx');

module.exports = ({
    name: "ttt",
    aliases: ['tictactoe'],
    description: 'plays a game of tic-tac-toe with the mentioned user.',
    args: '[user]',
    examples: ['@Duro#5232'],
    run: async ({ client, message }) => {

        // Tic-tac-toe function
        async function tictactoe(message, options = {}) {
            try {

                const opponent = message.mentions.members.first()?.user
                if (!opponent) return client.errorEmbed(message, 'No opponent mentioned!')
                if (opponent.bot) return client.errorEmbed(message, 'You cannot play against bots.')
                if (opponent.id === message.author.id) return client.errorEmbed(message, 'You cannot play by yourself!')

                if (options.credit === 0) {
                    foot = options.embedFoot || 'Crystals Crescent Bot | Tic-Tac-Toe'
                } else {
                    foot = 'Crystals Crescent Bot | Tic-Tac-Toe'
                }

                let acceptEmbed = new MessageEmbed()
                    .setTitle(`Waiting for ${opponent.tag} to accept!`)
                    .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
                    .setColor(options.embedColor || client.colors.purple)
                    .setFooter({ text: foot })

                let accept = new MessageButton()
                    .setLabel('Accept')
                    .setStyle('SUCCESS')
                    .setCustomId('acceptttt')

                let decline = new MessageButton()
                    .setLabel('Decline')
                    .setStyle('DANGER')
                    .setCustomId('declinettt')

                let accep = new MessageActionRow().addComponents([
                    accept,
                    decline
                ])
                message
                    .reply({
                        content: `Hey <@${opponent.id}>, you received a Tic-Tac-Toe invite`,
                        embeds: [acceptEmbed],
                        components: [accep]
                    })
                    .then((m) => {
                        const collector = m.createMessageComponentCollector({
                            type: 'BUTTON',
                            time: 30000
                        })
                        collector.on('collect', async (button) => {
                            if (button.user.id !== opponent.id)
                                return button.reply({
                                    content: 'You cant play the game as they didn\'t call you to play.',
                                    ephemeral: true
                                })

                            if (button.customId == 'declinettt') {
                                button.deferUpdate()
                                return collector.stop('decline')
                            } else if (button.customId == 'acceptttt') {
                                button.deferUpdate()
                                collector.stop()
                                button.message.delete()

                                let fighters = [message.member.id, opponent.id].sort(() =>
                                    Math.random() > 0.5 ? 1 : -1
                                )

                                let x_emoji = options.xEmoji || '❌'
                                let o_emoji = options.oEmoji || '⭕'

                                let dashmoji = options.idleEmoji || '➖'

                                let Args = {
                                    user: 0,
                                    a1: {
                                        style: 'SECONDARY',
                                        emoji: dashmoji,
                                        disabled: 0
                                    },
                                    a2: {
                                        style: 'SECONDARY',
                                        emoji: dashmoji,
                                        disabled: 0
                                    },
                                    a3: {
                                        style: 'SECONDARY',
                                        emoji: dashmoji,
                                        disabled: 0
                                    },
                                    b1: {
                                        style: 'SECONDARY',
                                        emoji: dashmoji,
                                        disabled: 0
                                    },
                                    b2: {
                                        style: 'SECONDARY',
                                        emoji: dashmoji,
                                        disabled: 0
                                    },
                                    b3: {
                                        style: 'SECONDARY',
                                        emoji: dashmoji,
                                        disabled: 0
                                    },
                                    c1: {
                                        style: 'SECONDARY',
                                        emoji: dashmoji,
                                        disabled: 0
                                    },
                                    c2: {
                                        style: 'SECONDARY',
                                        emoji: dashmoji,
                                        disabled: 0
                                    },
                                    c3: {
                                        style: 'SECONDARY',
                                        emoji: dashmoji,
                                        disabled: 0
                                    }
                                }

                                let epm = new MessageEmbed()
                                    .setTitle('Tac-Tac-Toe')
                                    .setColor(client.colors.purple)
                                    .setFooter({ text: foot })
                                    .setTimestamp()

                                let msgReply = await message.reply({
                                    allowedMentions: { repliedUser: false },
                                    content: `<@${Args.userid}>`,
                                    embeds: [
                                        epm.setDescription(
                                            `Waiting for Input | <@!${Args.userid}>, Your Emoji: ${client.emojis.cache.get(o_emoji) || '⭕'
                                            }`
                                        )
                                    ]
                                })
                                tictactoe(msgReply)

                                async function tictactoe(m) {
                                    Args.userid = fighters[Args.user]
                                    let won = {
                                        '<:O_:863314110560993340>': 0,
                                        '<:X_:863314044781723668>': 0
                                    }
                                    if (
                                        Args.a1.emoji == o_emoji &&
                                        Args.b1.emoji == o_emoji &&
                                        Args.c1.emoji == o_emoji
                                    )
                                        won['<:O_:863314110560993340>'] = true
                                    if (
                                        Args.a2.emoji == o_emoji &&
                                        Args.b2.emoji == o_emoji &&
                                        Args.c2.emoji == o_emoji
                                    )
                                        won['<:O_:863314110560993340>'] = true
                                    if (
                                        Args.a3.emoji == o_emoji &&
                                        Args.b3.emoji == o_emoji &&
                                        Args.c3.emoji == o_emoji
                                    )
                                        won['<:O_:863314110560993340>'] = true
                                    if (
                                        Args.a1.emoji == o_emoji &&
                                        Args.b2.emoji == o_emoji &&
                                        Args.c3.emoji == o_emoji
                                    )
                                        won['<:O_:863314110560993340>'] = true
                                    if (
                                        Args.a3.emoji == o_emoji &&
                                        Args.b2.emoji == o_emoji &&
                                        Args.c1.emoji == o_emoji
                                    )
                                        won['<:O_:863314110560993340>'] = true
                                    if (
                                        Args.a1.emoji == o_emoji &&
                                        Args.a2.emoji == o_emoji &&
                                        Args.a3.emoji == o_emoji
                                    )
                                        won['<:O_:863314110560993340>'] = true
                                    if (
                                        Args.b1.emoji == o_emoji &&
                                        Args.b2.emoji == o_emoji &&
                                        Args.b3.emoji == o_emoji
                                    )
                                        won['<:O_:863314110560993340>'] = true
                                    if (
                                        Args.c1.emoji == o_emoji &&
                                        Args.c2.emoji == o_emoji &&
                                        Args.c3.emoji == o_emoji
                                    )
                                        won['<:O_:863314110560993340>'] = true

                                    if (
                                        Args.a1.emoji == x_emoji &&
                                        Args.b1.emoji == x_emoji &&
                                        Args.c1.emoji == x_emoji
                                    )
                                        won['<:X_:863314044781723668>'] = true
                                    if (
                                        Args.a2.emoji == x_emoji &&
                                        Args.b2.emoji == x_emoji &&
                                        Args.c2.emoji == x_emoji
                                    )
                                        won['<:X_:863314044781723668>'] = true
                                    if (
                                        Args.a3.emoji == x_emoji &&
                                        Args.b3.emoji == x_emoji &&
                                        Args.c3.emoji == x_emoji
                                    )
                                        won['<:X_:863314044781723668>'] = true
                                    if (
                                        Args.a1.emoji == x_emoji &&
                                        Args.b2.emoji == x_emoji &&
                                        Args.c3.emoji == x_emoji
                                    )
                                        won['<:X_:863314044781723668>'] = true
                                    if (
                                        Args.a3.emoji == x_emoji &&
                                        Args.b2.emoji == x_emoji &&
                                        Args.c1.emoji == x_emoji
                                    )
                                        won['<:X_:863314044781723668>'] = true
                                    if (
                                        Args.a1.emoji == x_emoji &&
                                        Args.a2.emoji == x_emoji &&
                                        Args.a3.emoji == x_emoji
                                    )
                                        won['<:X_:863314044781723668>'] = true
                                    if (
                                        Args.b1.emoji == x_emoji &&
                                        Args.b2.emoji == x_emoji &&
                                        Args.b3.emoji == x_emoji
                                    )
                                        won['<:X_:863314044781723668>'] = true
                                    if (
                                        Args.c1.emoji == x_emoji &&
                                        Args.c2.emoji == x_emoji &&
                                        Args.c3.emoji == x_emoji
                                    )
                                        won['<:X_:863314044781723668>'] = true

                                    let a1 = new MessageButton()
                                        .setStyle(Args.a1.style)
                                        .setEmoji(Args.a1.emoji)
                                        .setCustomId('a1')
                                        .setDisabled(Args.a1.disabled)
                                    let a2 = new MessageButton()
                                        .setStyle(Args.a2.style)
                                        .setEmoji(Args.a2.emoji)
                                        .setCustomId('a2')
                                        .setDisabled(Args.a2.disabled)
                                    let a3 = new MessageButton()
                                        .setStyle(Args.a3.style)
                                        .setEmoji(Args.a3.emoji)
                                        .setCustomId('a3')
                                        .setDisabled(Args.a3.disabled)
                                    let b1 = new MessageButton()
                                        .setStyle(Args.b1.style)
                                        .setEmoji(Args.b1.emoji)
                                        .setCustomId('b1')
                                        .setDisabled(Args.b1.disabled)
                                    let b2 = new MessageButton()
                                        .setStyle(Args.b2.style)
                                        .setEmoji(Args.b2.emoji)
                                        .setCustomId('b2')
                                        .setDisabled(Args.b2.disabled)
                                    let b3 = new MessageButton()
                                        .setStyle(Args.b3.style)
                                        .setEmoji(Args.b3.emoji)
                                        .setCustomId('b3')
                                        .setDisabled(Args.b3.disabled)
                                    let c1 = new MessageButton()
                                        .setStyle(Args.c1.style)
                                        .setEmoji(Args.c1.emoji)
                                        .setCustomId('c1')
                                        .setDisabled(Args.c1.disabled)
                                    let c2 = new MessageButton()
                                        .setStyle(Args.c2.style)
                                        .setEmoji(Args.c2.emoji)
                                        .setCustomId('c2')
                                        .setDisabled(Args.c2.disabled)
                                    let c3 = new MessageButton()
                                        .setStyle(Args.c3.style)
                                        .setEmoji(Args.c3.emoji)
                                        .setCustomId('c3')
                                        .setDisabled(Args.c3.disabled)
                                    let a = new MessageActionRow().addComponents([a1, a2, a3])
                                    let b = new MessageActionRow().addComponents([b1, b2, b3])
                                    let c = new MessageActionRow().addComponents([c1, c2, c3])
                                    let buttons = { components: [a, b, c] }

                                    m.edit({
                                        content: `<@${Args.userid}>`,
                                        embeds: [
                                            epm.setDescription(
                                                `Waiting for Input | <@!${Args.userid}> | Your Emoji: ${Args.user == 0
                                                    ? client.emojis.cache.get(o_emoji) || '⭕'
                                                    : client.emojis.cache.get(x_emoji) || '❌'
                                                }`
                                            )
                                        ],
                                        components: [a, b, c]
                                    })

                                    if (won['<:O_:863314110560993340>'] != 0) {
                                        if (Args.user == 0) {
                                            if (options.resultBtn === true)
                                                return m
                                                    .edit({
                                                        content: `<@${fighters[1]}> \`(${client.emojis.cache.get(o_emoji) || '⭕'
                                                            })\` won.`,
                                                        embeds: [
                                                            epm.setDescription(
                                                                `<@!${fighters[1]}> (${client.emojis.cache.get(o_emoji) || '⭕'
                                                                }) won.. That was a nice game.`
                                                            )
                                                        ]
                                                    })
                                                    .then((m) => {
                                                        m.react('⭕')
                                                    })
                                            else
                                                return m
                                                    .edit({
                                                        content: `<@${fighters[1]}> \`(${client.emojis.cache.get(o_emoji) || '⭕'
                                                            })\` won.`,

                                                        embeds: [
                                                            epm.setDescription(
                                                                `<@!${fighters[1]}> (${client.emojis.cache.get(o_emoji) || '⭕'
                                                                    }) won.. That was a nice game.\n\`\`\`\n${Args.a1.emoji
                                                                        .replace(o_emoji, '⭕')
                                                                        .replace(x_emoji, '❌')} | ${Args.a2.emoji
                                                                            .replace(o_emoji, '⭕')
                                                                            .replace(x_emoji, '❌')} | ${Args.a3.emoji
                                                                                .replace(o_emoji, '⭕')
                                                                                .replace(x_emoji, '❌')}\n${Args.b1.emoji
                                                                                    .replace(o_emoji, '⭕')
                                                                                    .replace(x_emoji, '❌')} | ${Args.b2.emoji
                                                                                        .replace(o_emoji, '⭕')
                                                                                        .replace(x_emoji, '❌')} | ${Args.b3.emoji
                                                                                            .replace(o_emoji, '⭕')
                                                                                            .replace(x_emoji, '❌')}\n${Args.c1.emoji
                                                                                                .replace(o_emoji, '⭕')
                                                                                                .replace(x_emoji, '❌')} | ${Args.c2.emoji
                                                                                                    .replace(o_emoji, '⭕')
                                                                                                    .replace(x_emoji, '❌')} | ${Args.c3.emoji
                                                                                                        .replace(o_emoji, '⭕')
                                                                                                        .replace(x_emoji, '❌')}\n\`\`\``.replaceAll(
                                                                                                            dashmoji,
                                                                                                            '➖'
                                                                                                        )
                                                            )
                                                        ],
                                                        components: []
                                                    })
                                                    .then((m) => {
                                                        m.react('⭕')
                                                    })
                                        } else if (Args.user == 1) {
                                            if (options.resultBtn === true)
                                                return m
                                                    .edit({
                                                        content: `<@${fighters[0]}> \`(${client.emojis.cache.get(o_emoji) || '⭕'
                                                            })\` won.`,

                                                        embeds: [
                                                            epm.setDescription(
                                                                `<@!${fighters[0]}> (${client.emojis.cache.get(o_emoji) || '⭕'
                                                                }) won.. That was a nice game.`
                                                            )
                                                        ]
                                                    })
                                                    .then((m) => {
                                                        m.react('⭕')
                                                    })
                                            else
                                                return m
                                                    .edit({
                                                        content: `<@${fighters[0]}> \`(${client.emojis.cache.get(o_emoji) || '⭕'
                                                            })\` won.`,

                                                        embeds: [
                                                            epm.setDescription(
                                                                `<@!${fighters[0]}> (${client.emojis.cache.get(o_emoji) || '⭕'
                                                                    }) won.. That was a nice game.\n\`\`\`\n${Args.a1.emoji
                                                                        .replace(o_emoji, '⭕')
                                                                        .replace(x_emoji, '❌')} | ${Args.a2.emoji
                                                                            .replace(o_emoji, '⭕')
                                                                            .replace(x_emoji, '❌')} | ${Args.a3.emoji
                                                                                .replace(o_emoji, '⭕')
                                                                                .replace(x_emoji, '❌')}\n${Args.b1.emoji
                                                                                    .replace(o_emoji, '⭕')
                                                                                    .replace(x_emoji, '❌')} | ${Args.b2.emoji
                                                                                        .replace(o_emoji, '⭕')
                                                                                        .replace(x_emoji, '❌')} | ${Args.b3.emoji
                                                                                            .replace(o_emoji, '⭕')
                                                                                            .replace(x_emoji, '❌')}\n${Args.c1.emoji
                                                                                                .replace(o_emoji, '⭕')
                                                                                                .replace(x_emoji, '❌')} | ${Args.c2.emoji
                                                                                                    .replace(o_emoji, '⭕')
                                                                                                    .replace(x_emoji, '❌')} | ${Args.c3.emoji
                                                                                                        .replace(o_emoji, '⭕')
                                                                                                        .replace(x_emoji, '❌')}\n\`\`\``.replaceAll(
                                                                                                            dashmoji,
                                                                                                            '➖'
                                                                                                        )
                                                            )
                                                        ],
                                                        components: []
                                                    })
                                                    .then((m) => {
                                                        m.react('⭕')
                                                    })
                                        }
                                    }

                                    if (won['<:X_:863314044781723668>'] != 0) {
                                        if (Args.user == 0) {
                                            if (options.resultBtn === true)
                                                return m
                                                    .edit({
                                                        content: `<@${fighters[1]}> \`(${client.emojis.cache.get(x_emoji) || '❌'
                                                            })\` won.`,
                                                        embeds: [
                                                            epm.setDescription(
                                                                `<@!${fighters[1]}> (${client.emojis.cache.get(x_emoji) || '❌'
                                                                }) won.. That was a nice game.`
                                                            )
                                                        ]
                                                    })
                                                    .then((m) => {
                                                        m.react('❌')
                                                    })
                                            else
                                                return m
                                                    .edit({
                                                        content: `<@${fighters[1]}> \`(${client.emojis.cache.get(x_emoji) || '❌'
                                                            })\` won.`,

                                                        embeds: [
                                                            epm.setDescription(
                                                                `<@!${fighters[1]}> (${client.emojis.cache.get(x_emoji) || '❌'
                                                                    }) won.. That was a nice game.\n\`\`\`\n${Args.a1.emoji
                                                                        .replace(o_emoji, '⭕')
                                                                        .replace(x_emoji, '❌')} | ${Args.a2.emoji
                                                                            .replace(o_emoji, '⭕')
                                                                            .replace(x_emoji, '❌')} | ${Args.a3.emoji
                                                                                .replace(o_emoji, '⭕')
                                                                                .replace(x_emoji, '❌')}\n${Args.b1.emoji
                                                                                    .replace(o_emoji, '⭕')
                                                                                    .replace(x_emoji, '❌')} | ${Args.b2.emoji
                                                                                        .replace(o_emoji, '⭕')
                                                                                        .replace(x_emoji, '❌')} | ${Args.b3.emoji
                                                                                            .replace(o_emoji, '⭕')
                                                                                            .replace(x_emoji, '❌')}\n${Args.c1.emoji
                                                                                                .replace(o_emoji, '⭕')
                                                                                                .replace(x_emoji, '❌')} | ${Args.c2.emoji
                                                                                                    .replace(o_emoji, '⭕')
                                                                                                    .replace(x_emoji, '❌')} | ${Args.c3.emoji
                                                                                                        .replace(o_emoji, '⭕')
                                                                                                        .replace(x_emoji, '❌')}\n\`\`\``.replaceAll(
                                                                                                            dashmoji,
                                                                                                            '➖'
                                                                                                        )
                                                            )
                                                        ],
                                                        components: []
                                                    })
                                                    .then((m) => {
                                                        m.react('❌')
                                                    })
                                        } else if (Args.user == 1) {
                                            if (options.resultBtn === true)
                                                return m
                                                    .edit({
                                                        content: `<@${fighters[0]}> \`(${client.emojis.cache.get(x_emoji) || '❌'
                                                            })\` won.`,
                                                        embeds: [
                                                            epm.setDescription(
                                                                `<@!${fighters[0]}> (${client.emojis.cache.get(x_emoji) || '❌'
                                                                }) won.. That was a nice game.`
                                                            )
                                                        ]
                                                    })
                                                    .then((m) => {
                                                        m.react('❌')
                                                    })
                                            else
                                                return m
                                                    .edit({
                                                        content: `<@${fighters[0]}> \`(${client.emojis.cache.get(x_emoji) || '❌'
                                                            })\` won.`,
                                                        embeds: [
                                                            epm.setDescription(
                                                                `<@!${fighters[0]}> (${client.emojis.cache.get(x_emoji) || '❌'
                                                                    }) won.. That was a nice game.\n\`\`\`\n${Args.a1.emoji
                                                                        .replace(o_emoji, '⭕')
                                                                        .replace(x_emoji, '❌')} | ${Args.a2.emoji
                                                                            .replace(o_emoji, '⭕')
                                                                            .replace(x_emoji, '❌')} | ${Args.a3.emoji
                                                                                .replace(o_emoji, '⭕')
                                                                                .replace(x_emoji, '❌')}\n${Args.b1.emoji
                                                                                    .replace(o_emoji, '⭕')
                                                                                    .replace(x_emoji, '❌')} | ${Args.b2.emoji
                                                                                        .replace(o_emoji, '⭕')
                                                                                        .replace(x_emoji, '❌')} | ${Args.b3.emoji
                                                                                            .replace(o_emoji, '⭕')
                                                                                            .replace(x_emoji, '❌')}\n${Args.c1.emoji
                                                                                                .replace(o_emoji, '⭕')
                                                                                                .replace(x_emoji, '❌')} | ${Args.c2.emoji
                                                                                                    .replace(o_emoji, '⭕')
                                                                                                    .replace(x_emoji, '❌')} | ${Args.c3.emoji
                                                                                                        .replace(o_emoji, '⭕')
                                                                                                        .replace(x_emoji, '❌')}\n\`\`\``.replaceAll(
                                                                                                            dashmoji,
                                                                                                            '➖'
                                                                                                        )
                                                            )
                                                        ],
                                                        components: []
                                                    })
                                                    .then((m) => {
                                                        m.react('❌')
                                                    })
                                        }
                                    }

                                    const collector = m.createMessageComponentCollector({
                                        componentType: 'BUTTON',
                                        max: 1,
                                        time: 30000
                                    })

                                    collector.on('collect', (b) => {
                                        if (b.user.id !== Args.userid) {
                                            b.reply({
                                                content: 'You cant play now',
                                                ephemeral: true
                                            })

                                            tictactoe(m)
                                        } else {
                                            if (Args.user == 0) {
                                                Args.user = 1
                                                Args[b.customId] = {
                                                    style: 'SUCCESS',
                                                    emoji: o_emoji,
                                                    disabled: true
                                                }
                                            } else {
                                                Args.user = 0
                                                Args[b.customId] = {
                                                    style: 'DANGER',
                                                    emoji: x_emoji,
                                                    disabled: true
                                                }
                                            }
                                            b.deferUpdate()
                                            const map = (obj, fun) =>
                                                Object.entries(obj).reduce(
                                                    (prev, [key, value]) => ({
                                                        ...prev,
                                                        [key]: fun(key, value)
                                                    }),
                                                    {}
                                                )
                                            const objectFilter = (obj, predicate) =>
                                                Object.keys(obj)
                                                    .filter((key) => predicate(obj[key]))
                                                    .reduce((res, key) => ((res[key] = obj[key]), res), {})
                                            let Brgs = objectFilter(
                                                map(Args, (_, fruit) => fruit.emoji == dashmoji),
                                                (num) => num == true
                                            )

                                            if (Object.keys(Brgs).length == 0) {
                                                if (
                                                    Args.a1.emoji == o_emoji &&
                                                    Args.b1.emoji == o_emoji &&
                                                    Args.c1.emoji == o_emoji
                                                )
                                                    won['<:O_:863314110560993340>'] = true
                                                if (
                                                    Args.a2.emoji == o_emoji &&
                                                    Args.b2.emoji == o_emoji &&
                                                    Args.c2.emoji == o_emoji
                                                )
                                                    won['<:O_:863314110560993340>'] = true
                                                if (
                                                    Args.a3.emoji == o_emoji &&
                                                    Args.b3.emoji == o_emoji &&
                                                    Args.c3.emoji == o_emoji
                                                )
                                                    won['<:O_:863314110560993340>'] = true
                                                if (
                                                    Args.a1.emoji == o_emoji &&
                                                    Args.b2.emoji == o_emoji &&
                                                    Args.c3.emoji == o_emoji
                                                )
                                                    won['<:O_:863314110560993340>'] = true
                                                if (
                                                    Args.a3.emoji == o_emoji &&
                                                    Args.b2.emoji == o_emoji &&
                                                    Args.c1.emoji == o_emoji
                                                )
                                                    won['<:O_:863314110560993340>'] = true
                                                if (
                                                    Args.a1.emoji == o_emoji &&
                                                    Args.a2.emoji == o_emoji &&
                                                    Args.a3.emoji == o_emoji
                                                )
                                                    won['<:O_:863314110560993340>'] = true
                                                if (
                                                    Args.b1.emoji == o_emoji &&
                                                    Args.b2.emoji == o_emoji &&
                                                    Args.b3.emoji == o_emoji
                                                )
                                                    won['<:O_:863314110560993340>'] = true
                                                if (
                                                    Args.c1.emoji == o_emoji &&
                                                    Args.c2.emoji == o_emoji &&
                                                    Args.c3.emoji == o_emoji
                                                )
                                                    won['<:O_:863314110560993340>'] = true

                                                if (won['<:O_:863314110560993340>'] == true)
                                                    return tictactoe(m)
                                                else if (won['<:X_:863314044781723668>'] == true) return
                                                else {
                                                    tictactoe(m)

                                                    if (options.resultBtn === true)
                                                        return m
                                                            .edit({
                                                                embeds: [epm.setDescription(`It's a tie!`)]
                                                            })
                                                            .then((m) => {
                                                                m.react(dashmoji)
                                                            })
                                                    else
                                                        return m
                                                            .edit({
                                                                content: `Tie`,
                                                                embeds: [
                                                                    epm.setDescription(
                                                                        `It's a tie!\n\`\`\`\n${Args.a1.emoji
                                                                            .replace(o_emoji, '⭕')
                                                                            .replace(x_emoji, '❌')} | ${Args.a2.emoji
                                                                                .replace(o_emoji, '⭕')
                                                                                .replace(x_emoji, '❌')} | ${Args.a3.emoji
                                                                                    .replace(o_emoji, '⭕')
                                                                                    .replace(x_emoji, '❌')}\n${Args.b1.emoji
                                                                                        .replace(o_emoji, '⭕')
                                                                                        .replace(x_emoji, '❌')} | ${Args.b2.emoji
                                                                                            .replace(o_emoji, '⭕')
                                                                                            .replace(x_emoji, '❌')} | ${Args.b3.emoji
                                                                                                .replace(o_emoji, '⭕')
                                                                                                .replace(x_emoji, '❌')}\n${Args.c1.emoji
                                                                                                    .replace(o_emoji, '⭕')
                                                                                                    .replace(x_emoji, '❌')} | ${Args.c2.emoji
                                                                                                        .replace(o_emoji, '⭕')
                                                                                                        .replace(x_emoji, '❌')} | ${Args.c3.emoji
                                                                                                            .replace(o_emoji, '⭕')
                                                                                                            .replace(
                                                                                                                x_emoji,
                                                                                                                '❌'
                                                                                                            )}\n\`\`\``.replaceAll(dashmoji, '➖')
                                                                    )
                                                                ],
                                                                components: []
                                                            })
                                                            .then((m) => {
                                                                m.react(dashmoji)
                                                            })
                                                            .catch(() => { })
                                                }
                                            }

                                            tictactoe(m)
                                        }
                                    })
                                    collector.on('end', (collected) => {
                                        if (collected.size == 0)
                                            m.edit({
                                                content: `<@${Args.userid}> didn\'t react in time! (30s)`,
                                                components: []
                                            })
                                    })
                                }
                            }
                        })

                        collector.on('end', (collected, reason) => {
                            if (reason == 'time') {
                                let embed = new MessageEmbed()
                                    .setTitle('Challenge Not Accepted in Time')
                                    .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
                                    .setColor(options.timeoutEmbedColor || client.colors.red)
                                    .setFooter({ text: 'Timeout' })
                                    .setDescription('Ran out of time!\nTime limit: 30s')
                                m.edit({
                                    embeds: [embed],
                                    components: []
                                })
                            }
                            if (reason == 'decline') {
                                let embed = new MessageEmbed()
                                    .setTitle('Game Declined!')
                                    .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
                                    .setColor(options.timeoutEmbedColor || client.colors.red)
                                    .setFooter({ text: 'Declined the game...' })
                                    .setDescription(`${opponent.tag} has declined your game!`)
                                m.edit({
                                    content: '<@' + opponent.id + '>. Didn\'t accept in time',
                                    embeds: [embed],
                                    components: []
                                })
                            }
                        })
                    })

            } catch (err) {
                console.log(`Error Occured. | tic-tac-toe | Error: ${err.stack}`)
            }
        }

        // Use tic-tac-toe function
        tictactoe(message)
    },
});