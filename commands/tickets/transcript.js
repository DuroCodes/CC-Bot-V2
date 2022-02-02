const { MessageEmbed, MessageAttachment } = require('discord.js');
const { generateTranscript } = require("reconlx");
const Ticket = require("../../models/ticket.js");
const { Command } = require('reconlx');

module.exports = new Command({
    name: "transcript",
    aliases: ['trans', 'tr', 'tran'],
    description: 'gets transcript data from ticket.',
    run: async ({ client, message }) => {

        if (await Ticket.findOne({ guildID: message.guild.id, channelID: message.channel.id }) !== null) {
            // Get messages
            const obj = await message.channel.messages.fetch({ limit: 100 });

            // Flip object
            const flipObj = (object) => { return object.sort((b, a) => b.createdTimestamp - a.createdTimestamp) }

            // Make transcript
            generateTranscript({ messages: flipObj(obj), guild: message.guild, channel: message.channel })
                .then(data => {
                    const file = new MessageAttachment(data, 'index.html');

                    const embed = new MessageEmbed()
                        .setTitle("🎟 | Ticket Transcript")
                        .setDescription(`To view the transcript of ticket \`#${message.channel.name}\`, download the file below and open it.`)
                        .setColor(client.colors.lightred)
                        .setFooter({ text: `Ticket System • play.crystals-crescent.com`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
                        .setTimestamp();

                    message.channel.send({ embeds: [embed] });
                    message.channel.send({ files: [file] });
                })
        } else return client.errorEmbed(message, `This channel is not a valid ticket or is not stored in the database.`);
    },
});