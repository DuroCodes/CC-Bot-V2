const client = require('../index');

client.on('messageDelete', (message) => {
  // Set snipes to the message content
  let snipes = client.snipes.get(message.channel.id) || [];
  if (snipes.length > 5) snipes = snipes.slice(0, 4);

  // Add data to snipes
  snipes.unshift({
    msg: message,
    image: message.attachments.first()?.proxyURL || null,
    time: Date.now(),
  });

  // Set snipes to the data
  client.snipes.set(message.channel.id, snipes);
})