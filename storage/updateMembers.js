module.exports = (guild) => {
    const members = guild.members.cache.filter((m) => !m.user.bot).size;
    const channel = guild.channels.cache.find(c => c.name.includes("Members:") && c.type == "GUILD_VOICE");

    if (!members || !channel) return;

    channel.setName(`Members: ${members.toLocaleString()}`);
};