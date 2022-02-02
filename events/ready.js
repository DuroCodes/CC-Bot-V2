const client = require("../index");
client.on("ready", () => {

    // Log that the bot is online
    console.log(`${client.user.tag} is online! ✅`);

    client.user.setActivity({ name: 'play.crystals-crescent.com', type: "PLAYING" });

});