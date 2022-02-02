const { Util } = require('discord.js');
const { Command } = require('reconlx');

module.exports = new Command({
    name: "steal",
    aliases: ['emoji', 'addemoji'],
    description: 'steals an emoji.',
    args: '[emojis]',
    examples: [':Pepega:', ':Emoji 1: :Emoji 2:'],
    run: async ({ client, message, args }) => {

        // Check for management role and args
        if (!message.member.roles.cache.some(role => role.name === '⸻Management Staff⸻')) return client.errorEmbed(message, `You do not have permission to use this command.`);
        if (!args.length) return client.errorEmbed(message, `Invalid arguments. \`${client.config.prefix}help ${module.exports.name}\``)

        // Parse multiple emojis
        for (const rawEmoji of args) {

            const parsedEmoji = Util.parseEmoji(rawEmoji);

            if (parsedEmoji.id) {
                const extension = parsedEmoji.animated ? '.gif' : '.png';
                const url = `https://cdn.discordapp.com/emojis/${parsedEmoji.id + extension}`;
                message.guild.emojis.create(url, parsedEmoji.name)
                    .then(e => client.successEmbed(message, `Added: ${e} (\`:${e.name}:\`)`));
            }
            else return client.errorEmbed(`The emoji could not be found, please try again with a valid emoji.`)
        }
    }
});