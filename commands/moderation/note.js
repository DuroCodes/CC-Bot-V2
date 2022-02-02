const noteSchema = require('../../models/notes');
const MessageEmbed = require('discord.js');
const { Command } = require('reconlx');

module.exports = new Command({
    name: 'note',
    aliases: ['addnote', 'anote'],
    description: 'creates a note for a user.',
    args: '[user] [note]',
    examples: ['@Duro#5232 Suspicious', '283312847478325251 Suspicious'],
    run: async ({ client, message, args }) => {

        // Check for staff role
        if (!message.member.roles.cache.some(role => role.name === '「 Staff 」') && !message.member.roles.cache.some(role => role.name === '⸻Management Staff⸻')) return client.errorEmbed(message, `You do not have permission to use this command.`);

        // Variables for notes
        const user = client.users.cache.get(message.mentions.members.first()?.id) || client.users.cache.get(args[0]);
        const note = args.slice(1).join(" ");
        if (!user || !note) return client.errorEmbed(message, `Invalid arguments. \`${client.config.prefix}help ${module.exports.name}\``)

        // Make note from variables
        const noteObject = {
            author: message.author.tag,
            timestamp: Date.now(),
            note
        };

        // Update database
        await noteSchema.findOneAndUpdate(
            {
                userID: user.id
            },
            {
                userID: user.id,
                $push: {
                    notes: noteObject
                }
            },
            {
                upsert: true
            }
        );

        // Create modlogs embed
        const embed = new MessageEmbed()
            .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
            .setDescription(`\`${message.author.tag}\` used command \`${client.config.prefix}${module.exports.name} ${user} ${note}\` in ${message.channel}`)
            .setFooter({ text: `Crystals Crescent Bot`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
            .setColor(client.colors.purple)
            .setTimestamp();

        // Find modlogs channel and send embed
        const modLogs = message.guild.channels.cache.find(ch => ch.name === "┃mod-logs");
        if (!modLogs) return client.errorEmbed(message, `The \`#┃mod-logs\` channel could not be found.`);
        modLogs.send({ embeds: [embed] });


        // Sucess message
        client.successEmbed(message, `\`${user.tag}\` has received a note.`);

    }
});