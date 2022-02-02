const { MessageEmbed } = require("discord.js");
const { Command } = require('reconlx');

module.exports = {
    name: "eval",
    description: 'runs code from input.',
    args: '[code]',
    examples: ['2+2'],
    run: async ({ client, message, args }) => {

        if (message.author.id !== '283312847478325251') return client.errorEmbed(message, `You do not have permission to use this command.`);

        const code = args.join(' ');
        if (!code) return client.errorEmbed(message, `Invalid arguments. \`${client.config.prefix}help ${module.exports.name}\``)

        try {
            let evaled = eval(code);
            if (typeof evaled !== 'string') evaled = require('util').inspect(evaled);

            const embed = new MessageEmbed()
                .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
                .addFields(
                    { name: '**Input:**', value: `\`\`\`js\n${code}\`\`\`` },
                    { name: '**Output:**', value: `\`\`\`js\n${evaled}\`\`\`` }
                )
                .setColor(client.colors.purple)
                .setFooter({ text: `Crystals Crescent`, iconURL: client.user.displayAvatarURL({ dynamic: true }) });

            message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
        } catch (err) {
            client.errorEmbed(message, `An error has occured. \n\`\`\`xl\n${err}\`\`\``);
        }
    }
};