const client = require("../index");
const updateMembers = require('../storage/updateMembers')

client.on("guildMemberRemove", (member) => updateMembers(member.guild));