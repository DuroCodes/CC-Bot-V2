const noteSchema = require('../../models/notes');
const { MessageEmbed } = require('discord.js');
const { Command } = require('reconlx');

module.exports = new Command({
    name: 'notes',
    description: 'lists notes for a user.',
    args: '[user]',
    examples: ['@Duro#5232', '283312847478325251'],
    run: async ({ client, message, args }) => {

        // Check for staff role
        if (!message.member.roles.cache.some(role => role.name === '「 Staff 」') && !message.member.roles.cache.some(role => role.name === '⸻Management Staff⸻')) return client.errorEmbed(message, `You do not have permission to use this command.`);

        // Variables for notes
        const user = client.users.cache.get(message.mentions.members.first()?.id) || client.users.cache.get(args[0]);
        if (!user) return client.errorEmbed(message, `Invalid arguments. \`${client.config.prefix}help ${module.exports.name}\``)

        const userID = user.id;

        // Get results
        const results = await noteSchema.findOne({ userID });
        if (!results || results === null) return client.errorEmbed(message, `This user does not have any notes.`);

        // Make embed
        const embed = new MessageEmbed()
            .setFooter({ text: `Crystals Crescent Bot`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
            .setColor(client.colors.purple)
            .setTimestamp();

        let totalResults = [];
        for (const noteInfo of results.notes) {
            const { author, timestamp, note } = noteInfo;

            // Push to totalResults to get a length 
            totalResults.push({ author, timestamp, note });

            // Add embed fields for every result
            embed.addField(`${new Date(timestamp).toLocaleDateString()}`, `Moderator: \`${author}\`\nNote: \`${note}\``);
        }

        // Edit embed
        totalResults.length < 1 ? embed.setTitle(`${totalResults.length} notes found`) : embed.setTitle(`${totalResults.length} note found`);
        message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });

    }
});