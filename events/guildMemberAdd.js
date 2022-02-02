const updateMembers = require('../storage/updateMembers')
const { MessageEmbed } = require('discord.js');
const muteSchema = require('../models/mute');
const client = require("../index");

client.on("guildMemberAdd", async member => {

    const { guild, id } = member;
    updateMembers(guild);

    const welcome = (User, ChannelID, Title, Description, Roles) => {
        const embed = new MessageEmbed()
            .setFooter({ text: `Crystals Crescent`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
            .setColor(client.colors.purple)
            .setDescription(Description)
            .setTitle(Title)
            .setTimestamp();

        User.roles.add(Roles);

        const channel = guild.channels.cache.get(ChannelID);
        return channel.send({ content: `Welcome, ${User}`, embeds: [embed] });
    };

    if (guild.id === '782480818143756288') {
        const defaultRoles = [
            '817179553189330944', // Rank
            '817160423815643138', // Pronouns
            '818300618627481641', // Sexuality
            '819883689508732928', // Continent
            '818678244244062238', // Zodiac
            '817162575803973706', // Platform
            '817186872509202432', // Announcement
            '818313068580438026', // Other
            '784688720074768394', // Member
            '784918467370942464', // LunarCore MC
            '853141960603860992', // Crystals Cavern
            '873796331477557248', // Infinity MC
            '887406135404019772', // OneBlock
            '860382701769064469', // Creative
            '817186608205660180', // Discord
            '826249671222624316', // TikTok
            '882057484884402176', // Twitter
            '882057483751915530', // Instagram
            '882057482481045535' // Facebook
        ];
        welcome(member, '817158958719696948', `Welcome to Crystals Crescent!`, `Make sure to check out <#810055153184145429> <#783830294490644502> <#782483320470372353> <#819860756878196736>!`, defaultRoles);

    }
    else if (guild.id === '853052160438829066') {
        const staffRoles = [
            '853052160467140619', // Pronouns
            '853073456576725003', // Continent
            '853073546184228894', // Platform
            '853073633038303261' // Other
        ];
        welcome(member, '853052160487718948', `Welcome to Crystals Crescent Staff!`, `Make sure to check out <#853112937875243018> <#853111415015211048> <#853052160487718949>!`, staffRoles);
    }

    const currentMute = await muteSchema.findOne({ userID: id, guildID: guild.id, current: true });
    if (currentMute) {
        const mutedRole = guild.roles.cache.find(r => { r.name === 'Muted' });
        if (mutedRole) member.roles.add(mutedRole);
    };

});