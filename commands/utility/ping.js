const { Command } = require('reconlx');

module.exports = new Command({
    name: "ping",
    aliases: ['p'],
    description: 'displays current websocket ping.',
    run: async ({ client, message }) => {

        // Send ping of websocket
        message.channel.send(`Pong! (${client.ws.ping}) 🏓`);
    },
});