const { MessageEmbed } = require('discord.js');
const { Color, isColor } = require('coloras');
const { Command } = require('reconlx');

module.exports = new Command({
    name: "color",
    description: 'gets info about a color or a random color.',
    args: '(color)',
    examples: ['#FFFFFF'],
    run: async ({ client, message, args }) => {

        let random;
        if (!args.join(' ')) random = true;
        else if (!isColor(args.join(' ')).color) return client.errorEmbed(message, `Please input a valid color.`);

        const value = random ? null : args.join(' ');
        const color = new Color(value);

        const embed = new MessageEmbed()
            .setColor(color.toHex())
            .addFields([
                { name: "HEX", value: color.toHex(), inline: true },
                { name: "RGB", value: color.toRgb(), inline: true },
                { name: "HSL", value: color.toHsl(), inline: true },
                { name: "HSV", value: color.toHsv(), inline: true },
                { name: "CMYK", value: color.toCmyk(), inline: true },
                { name: "ㅤ", value: `[Image Url](${color.imageUrl})`, inline: true }
            ])
            .setImage(color.imageUrl);

        return message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });

    },
});