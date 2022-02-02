const { Command } = require('reconlx');

module.exports = new Command({
    name: "embed",
    aliases: ['emb'],
    description: 'creates an embed.',
    args: '[channel] [json data]',
    examples: ['#general { "title": "this is a title" }'],
    run: async ({ client, message, args }) => {

        // Check for management staff role
        if (!message.member.roles.cache.some(role => role.name === '⸻Management Staff⸻')) return client.errorEmbed(message, `You do not have permission to use this command.`);

        const hasStuff = (obj) => {
            for (var x in obj) { return true; }
            return false;
        }

        // Get arguments
        const channel = message.mentions.channels.first();
        args.shift();
        const jsonData = args.join(" ");
        if (!channel || !jsonData) return client.errorEmbed(message, `Invalid arguments. \`${client.config.prefix}help ${module.exports.name}\``);

        try {
            const json = JSON.parse(jsonData);
            if (hasStuff(json) && (json.description || json.title)) {
                json.plainText ? channel.send({ content: json.plainText, embeds: [json] }) : channel.send({ embeds: [json] });
                client.successEmbed(message, `Your embed was successfully sent.`);
            } else return client.errorEmbed(message, `Empty JSON. Create one [__here__](https://embedbuilder.nadekobot.me/)`);
        } catch (err) {
            return client.errorEmbed(message, `Invalid JSON. Create one [__here__](https://embedbuilder.nadekobot.me/)`);
        }

    }
});