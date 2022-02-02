const { MessageEmbed, Collection } = require("discord.js");
const client = require("../index");
const Timeout = new Collection();
const ms = require("ms");

client.on("messageCreate", async (message) => {

    // Ip embed
    const ipEmbed = new MessageEmbed()
        .setColor(client.colors.purple)
        .setTitle("<:Crystals_Crescent:913292239948627999> Crystals Crescent IP")
        .setDescription("**Server IP/Address:** play.crystals-crescent.com\n**Bedrock Port:** 19132")
        .setFooter({ text: `Crystals Crescent | play.crystals-crescent.com`, iconURL: client.user.displayAvatarURL({ dynamic: true }) });

    // Auto response array for ip
    const autoResponse = ['whats the ip', 'what is the ip', 'whats the port', 'what is the port'];

    // Check if content is equal to something in the auto response array
    if (!message.author.bot && message.guild && autoResponse.includes(message.content.toLowerCase().replace(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,\-.\/:;<=>?@\[\]^_`{|}~]/g, ''))) return message.reply({ embeds: [ipEmbed], allowedMentions: { repliedUser: false } });

    // Ignore message if it's from the bot or if the message doesn't start with the prefix
    else if (message.author.bot || !message.guild || !message.content.toLowerCase().startsWith(client.config.prefix)) return;

    // Create cmd and args from message content
    const [cmd, ...args] = message.content.slice(client.config.prefix.length).trim().split(/ +/g);

    // Create command
    const command = client.commands.get(cmd.toLowerCase()) || client.commands.find(c => c.aliases?.includes(cmd.toLowerCase()));

    // If no command, return
    if (!command) return;

    // Cooldowns
    if (command.cooldown) {
        if (Timeout.has(`${command.name}${message.author.id}`)) return client.errorEmbed(message, `You are on a \`${ms(Timeout.get(`${command.name}${message.author.id}`) - Date.now(), { long: true })}\` cooldown.`);
        command.run({ client, message, args });
        Timeout.set(`${command.name}${message.author.id}`, Date.now() + command.cooldown);
        setTimeout(() => Timeout.delete(`${command.name}${message.author.id}`), command.cooldown);
    } else await command.run({ client, message, args });
});