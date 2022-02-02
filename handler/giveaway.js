const { GiveawayClient } = require('reconlx');
const client = require('../index');

const giveaway = new GiveawayClient({
    client: client,
    mongooseConnectionString: client.config.mongooseConnectionString,
    emoji: '🎉',
    defaultColor: client.colors.purple
});

module.exports = giveaway;