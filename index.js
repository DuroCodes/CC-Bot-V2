const { Client, Collection, MessageEmbed } = require("discord.js");
const muteSchema = require('./models/mute');

// Initializing client
const client = new Client({ intents: 32767 });
module.exports = client;

// Global Variables
client.commands = new Collection();
client.slashCommands = new Collection();
client.config = require("./storage/config.json");
client.colors = require("./storage/colors.json");
client.snipes = new Collection();

// Hypixel API
const apiKey = client.config.apiKey;
const Hypixel = require('hypixel-api-reborn');
client.hypixel = new Hypixel.Client(apiKey, { cache: true });

// Global Functions
client.successEmbed = (message, argument, end) => {
    embed = new MessageEmbed()
        .setDescription(`${client.config.check} **Success:** ${argument}`)
        .setColor(client.colors.green);

    if (message?.values && end !== true) return message.followUp({ embeds: [embed], allowedMentions: { repliedUser: false }, ephemeral: true });
    else return message.reply({ embeds: [embed], allowedMentions: { repliedUser: false }, ephemeral: true });

};
client.errorEmbed = (message, argument, end) => {
    embed = new MessageEmbed()
        .setDescription(`${client.config.wrong} **Error:** ${argument}`)
        .setColor(client.colors.red);

    if (message?.values && end !== true) return message.followUp({ embeds: [embed], allowedMentions: { repliedUser: false }, ephemeral: true });
    else return message.reply({ embeds: [embed], allowedMentions: { repliedUser: false }, ephemeral: true });
};

// Initializing the project
require("./handler")(client);

// Checking for active mutes
const checkMutes = async () => {

    const now = Date.now();
    const conditional = { expires: { $lt: now }, current: true };

    const results = await muteSchema.find(conditional)
    if (results && results.length) {
        for (const result of results) {
            const { guildID, userID } = result;

            const guild = client.guilds.cache.get(guildID);
            const member = (await guild.members.fetch()).get(userID);

            const mutedRole = guild.roles.cache.find(r => { return r.name === 'Muted' });
            member.roles.remove(mutedRole);
        }

        await muteSchema.updateMany(conditional, {
            current: false
        });
    }

    setTimeout(checkMutes, 1000 * 60 * 10);
}
checkMutes();

// Error handling
process.on('unhandledRejection', error => {
    console.log(error);
    client.channels.cache.get('922323386611429426').send(`\`\`\`js\n${error}\`\`\``);
});
process.on("uncaughtException", error => {
    console.log(error);
    client.channels.cache.get('922323386611429426').send(`\`\`\`js\n${error}\`\`\``);
});
process.on('multipleResolves', error => {
    console.log(error);
    client.channels.cache.get('922323386611429426').send(`\`\`\`js\n${error}\`\`\``);
});
process.on('exit', error => {
    console.log(error);
    client.channels.cache.get('922323386611429426').send(`\`\`\`${error}\`\`\``);
});

// Login to bot
client.login(client.config.token);