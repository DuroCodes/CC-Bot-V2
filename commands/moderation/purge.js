const { MessageEmbed } = require('discord.js');
const { Command } = require('reconlx');

module.exports = new Command({
    name: "purge",
    aliases: ['clear'],
    description: 'mass-deletes messages.',
    args: '[amount]',
    examples: ['10'],
    run: async ({ client, message, args }) => {

        // Check if member has staff role
        const allowedRoles = ['Admin', '「 Admin 」', '⸻Management Staff⸻', '「 Developer 」', '「 Assistant Manager」', '⸻Management Staff⸻'];
        if (message.member.roles.cache.some(r => allowedRoles.includes(r.name))) {

            // Get amount from args
            const amount = parseInt(args[0]) + 1;
            if (amount < 1 || amount > 100) return client.errorEmbed(message, `You can only purge a range of \`1-100\` messages.`)
            if (!amount) return client.errorEmbed(message, `Invalid arguments. \`${client.config.prefix}help ${module.exports.name}\``)

            try {
                // Fetch messages and check if pins
                const fetched = await message.channel.messages.fetch({ limit: amount });
                const notPinned = fetched.filter(fetchedMsg => !fetchedMsg.pinned);

                const messages = [...fetched];
                messages.shift();

                // Create modlogs embed
                const embed = new MessageEmbed()
                    .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
                    .setDescription(`\`${message.author.tag}\` used command \`${client.config.prefix}purge\` in ${message.channel}`)
                    .setFooter({ text: `Crystals Crescent Bot`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
                    .setColor(client.colors.purple)
                    .setTimestamp();

                // Find modlogs channel and send embed
                const modLogs = message.guild.channels.cache.find(ch => ch.name === "┃mod-logs");
                if (!modLogs) return client.errorEmbed(message, `The \`#┃mod-logs\` channel could not be found.`);
                modLogs.send({ embeds: [embed] });

                // Delete messages
                await message.channel.bulkDelete(notPinned, true);
            } catch (err) {
                // Error catching
                return client.errorEmbed(message, `An error has occured. \`${err}\``);
            }

        } else return client.errorEmbed(message, "You do not have permission to use this command.");
    },
});