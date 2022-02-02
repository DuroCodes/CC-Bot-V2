const { MessageEmbed, MessageAttachment } = require('discord.js');
const { generateTranscript } = require("reconlx");
const Ticket = require("../../models/ticket.js");
const { Command } = require('reconlx');

module.exports = new Command({
    name: "close",
    aliases: ['fc', 'c'],
    description: 'closes a ticket.',
    args: '(reason)',
    examples: ['Resolved'],
    run: async ({ client, message, args }) => {

        // Check if channel is a ticket
        const currentTicket = await Ticket.findOne({ guildID: message.guild.id, channelID: message.channel.id });
        if (!currentTicket) return client.errorEmbed(message, `This channel is not a valid ticket or is not stored in the database.`);

        // Find ticket logs channel
        const logsChannel = message.guild.channels.cache.find(ch => ch.name === "┃ticket-logs");
        if (!logsChannel) return client.errorEmbed(message, `The \`#┃ticket-logs\` channel could not be found.`);

        // Get reason from args
        const reason = args.join(" ") || 'No Reason Specified';

        // Get messages
        const obj = await message.channel.messages.fetch({ limit: 100 });

        // Flip object
        const flipObj = (object) => { return object.sort((b, a) => b.createdTimestamp - a.createdTimestamp) }

        // Make transcript
        generateTranscript({ messages: flipObj(obj), guild: message.guild, channel: message.channel })
            .then(data => {
                const file = new MessageAttachment(data, 'index.html');

                const transcriptEmbed = new MessageEmbed()
                    .setTitle("🎟 | Ticket Closed")
                    .setDescription(`To view the transcript of ticket \`#${message.channel.name}\`, download the file below and open it.`)
                    .setColor(client.colors.lightred)
                    .setFooter({ text: `Ticket System • play.crystals-crescent.com`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
                    .setTimestamp();

                const closedEmbed = new MessageEmbed()
                    .setTitle("🎟 | Ticket Closed")
                    .setDescription(`Your ticket, \`#${message.channel.name}\`, has been closed with reason \`${reason}\`. To view the transcript, download the file below and open it.`)
                    .setColor(client.colors.lightred)
                    .setFooter({ text: `Ticket System • play.crystals-crescent.com`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
                    .setTimestamp();

                const creator = client.users.cache.get(currentTicket.creatorID);

                creator.send({ embeds: [closedEmbed] }); creator.send({ files: [file] });

                message.author.send({ embeds: [transcriptEmbed] }); message.author.send({ files: [file] });
            })

        // Get user that runs command 
        const user = message.author;

        // Embed for logs
        const embed = new MessageEmbed()
            .setTitle("🗑️ | Ticket Closed")
            .setDescription("A member has closed the ticket.")
            .addField(`**Information**`, `**Closer:** \`${user.tag}\`\n**Closer ID:** \`${user.id}\`\n**Ticket:** \`#${message.channel.name}\`\n**Ticket ID:** \`${message.channel.id}\`\n**Reason:** \`${reason}\``)
            .setColor(client.colors.purple)
            .setTimestamp()
            .setFooter({ text: `Ticket System`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })

        // Delete from schema and delete channel
        Ticket.deleteOne({ guildID: message.guild.id, channelID: message.channel.id }, function (err) { });
        message.channel.delete();

        // Send logs
        logsChannel.send({ embeds: [embed] });

    },
});