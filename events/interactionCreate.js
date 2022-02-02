const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const Ticket = require("../models/ticket.js");
const client = require("../index");

client.on("interactionCreate", async (interaction) => {
    // Slash Command Handling
    if (interaction.isCommand()) {
        await interaction.deferReply({ ephemeral: false }).catch(() => { });

        const cmd = client.slashCommands.get(interaction.commandName);
        if (!cmd) return interaction.followUp({ content: "An error has occured " });

        const args = [];

        for (let option of interaction.options.data) {
            if (option.type === "SUB_COMMAND") {
                if (option.name) args.push(option.name);
                option.options?.forEach((x) => {
                    if (x.value) args.push(x.value);
                });
            } else if (option.value) args.push(option.value);
        }
        interaction.member = interaction?.guild?.members.cache.get(interaction.user.id);

        cmd.run({ client, interaction, args });
    }

    // Check for close ticket button
    if (interaction.customId === 'ticket-close') {

        // Find user from context menu
        const User = interaction.guild.members.cache.get(interaction.user.id);
        if (!User) return;

        // Check if channel is a ticket
        const currentTicket = await Ticket.findOne({ guildID: interaction.guild.id, channelID: interaction.channel.id });
        if (!currentTicket) return client.errorEmbed(interaction, `This channel is not a valid ticket or is not stored in the database.`);

        // Find logs channel
        const logsChannel = interaction.guild.channels.cache.find(ch => ch.name === "┃ticket-logs");
        if (!logsChannel) return client.errorEmbed(interaction, `The \`#┃ticket-logs\` channel could not be found.`);

        // Embed for logs
        const embed = new MessageEmbed()
            .setTitle("🗑️ | Ticket Closed")
            .setDescription("A member has closed the ticket.")
            .addField(`**Information**`, `**Closer:** \`${User.user.tag}\`\n**Closer ID:** \`${User.id}\`\n**Ticket:** \`#${interaction.channel.name}\`\n**Ticket ID:** \`${interaction.channel.id}\``)
            .setColor(client.colors.purple)
            .setTimestamp()
            .setFooter({ text: `Ticket System`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })

        // Delete from schema and delete channel
        Ticket.deleteOne({ guildID: interaction.guild.id, channelID: interaction.channel.id }, function (err) { });
        await interaction.deferUpdate();

        // Delete
        interaction.channel.delete();
        logsChannel.send({ embeds: [embed] });
    }

    if (['zodiac-dropdown', 'sexuality-dropdown', 'pronouns-dropdown', 'platform-dropdown', 'continent-dropdown', 'updates-dropdown', 'notifications-dropdown'].includes(interaction.customId)) {

        // Reaction roles
        const reactionRoles = ["zodiac-aries", "zodiac-taurus", "zodiac-gemini", "zodiac-cancer", "zodiac-leo", "zodiac-virgo", "zodiac-libra", "zodiac-scorpio", "zodiac-sagittarius", "zodiac-capricorn", "zodiac-aquarius", "zodiac-pisces", "sexuality-gay", "sexuality-lesbian", "sexuality-bisexual", "sexuality-pansexual", "sexuality-pansexual", "sexuality-polysexual", "sexuality-omnisexual", "sexuality-asexual", "sexuality-aromantic", "sexuality-queer", "sexuality-none", "sexuality-questioning", "pronouns-she/her", "pronouns-she/they", "pronouns-they/she", "pronouns-they/them", "pronouns-they/he", "pronouns-he/they", "pronouns-he/him", "pronouns-she/they/she", "pronouns-any", "pronouns-none", "pronouns-ask", "pronouns-it/its", "pronouns-neo", "platform-java", "platform-bedrock", "continent-africa", "continent-asia", "continent-australia", "continent-europe", "continent-north-america", "continent-south-america", "updates-discord", "updates-lunarcore", "updates-crystalscavern", "updates-oneblock", "updates-creative", "notifications-tiktok", "notifications-twitter", "notifications-instagram", "notifications-facebook",];

        // Add role function for reaction roles
        const addRole = async (userID, role) => {

            const user = interaction.guild.members.cache.get(userID);

            const roles = {
                // Zodiac roles
                "zodiac-aries": "꒰Aries꒱",
                "zodiac-taurus": "꒰Taurus꒱",
                "zodiac-gemini": "꒰Gemini꒱",
                "zodiac-cancer": "꒰Cancer꒱",
                "zodiac-leo": "꒰Leo꒱",
                "zodiac-virgo": "꒰Virgo꒱",
                "zodiac-libra": "꒰Libra꒱",
                "zodiac-scorpio": "꒰Scorpio꒱",
                "zodiac-sagittarius": "꒰Sagittarius꒱",
                "zodiac-capricorn": "꒰Capricorn꒱",
                "zodiac-aquarius": "꒰Aquarius꒱",
                "zodiac-pisces": "꒰Pisces꒱",

                // Sexuality roles
                "sexuality-gay": "꒰Gay꒱",
                "sexuality-lesbian": "꒰Lesbian꒱",
                "sexuality-bisexual": "꒰Bisexual꒱",
                "sexuality-pansexual": "꒰Pansexual꒱",
                "sexuality-pansexual": "꒰Pansexual꒱",
                "sexuality-polysexual": "꒰Polysexual꒱",
                "sexuality-omnisexual": "꒰Omnisexual꒱",
                "sexuality-asexual": "꒰Asexual꒱",
                "sexuality-aromantic": "꒰Aromantic꒱",
                "sexuality-queer": "꒰Queer꒱",
                "sexuality-none": "꒰Un-Labeled꒱",
                "sexuality-questioning": "꒰Questioning꒱",

                // Pronouns roles
                "pronouns-she/her": "꒰She/Her꒱",
                "pronouns-she/they": "꒰She/They꒱",
                "pronouns-they/she": "꒰They/She꒱",
                "pronouns-they/them": "꒰They/Them꒱",
                "pronouns-they/he": "꒰They/He꒱",
                "pronouns-he/they": "꒰He/They꒱",
                "pronouns-he/him": "꒰He/Him꒱",
                "pronouns-she/they/she": "꒰She/They/He꒱",
                "pronouns-any": "꒰Any Pronouns꒱",
                "pronouns-none": "꒰No Pronouns꒱",
                "pronouns-ask": "꒰Ask For My Pronouns꒱",
                "pronouns-it/its": "꒰It/Its꒱",
                "pronouns-neo": "꒰Neopronouns꒱",

                // Platform roles
                "platform-java": "꒰Java꒱",
                "platform-bedrock": "꒰Bedrock꒱",

                // Continent roles
                "continent-africa": "꒰Africa꒱",
                "continent-asia": "꒰Asia꒱",
                "continent-australia": "꒰Australia꒱",
                "continent-europe": "꒰Europe꒱",
                "continent-north-america": "꒰North America꒱",
                "continent-south-america": "꒰South America꒱",

                // Updates roles
                "updates-discord": "Discord Updates",
                "updates-lunarcore": "LunarCore MC Updates",
                "updates-crystalscavern": "Crystals Cavern Updates",
                "updates-oneblock": "OneBlock Updates",
                "updates-creative": "Creative Updates",

                // Notifications roles
                "notifications-tiktok": "TikTok Notifications",
                "notifications-twitter": "Twitter Notifications",
                "notifications-instagram": "Instagram Notifications",
                "notifications-facebook": "Facebook Notifications",
            };

            // Find role
            const guildRole = interaction.guild.roles.cache.find(r => { return r.name === roles[role] });
            if (!guildRole) return client.errorEmbed(interaction, `The \`${roles[role]}\` role could not be found or does not exist in this server.`);

            // Adds/removes role
            if (user.roles.cache.has(guildRole.id)) {
                await user.roles.remove(guildRole.id);
                return client.successEmbed(interaction, `You have been removed from the \`${roles[role]}\` role.`);
            }
            if (!user.roles.cache.has(guildRole.id)) {
                await user.roles.add(guildRole.id);
                return client.successEmbed(interaction, `You have been added to the \`${roles[role]}\` role.`);
            }

        };

        await interaction.deferUpdate();

        for (const i of interaction.values) if (reactionRoles.includes(i)) addRole(interaction.user.id, i);

    }

    // Select Menu Handling (Dropdown)
    if (interaction.isSelectMenu()) {

        // Ticket topic array
        const ticketTopics = ['ticket-grief', 'ticket-glitch', 'ticket-appeal', 'ticket-report', 'ticket-complaint', 'ticket-checkin'];
        if (!ticketTopics.includes(interaction.values[0])) return;

        // Find user from select menu
        const User = interaction.guild.members.cache.get(interaction.user.id);
        if (!User) return;

        // Find ticket logs channel
        const logsChannel = interaction.guild.channels.cache.find(ch => ch.name === "┃ticket-logs");
        if (!logsChannel) return client.errorEmbed(interaction, `The \`#┃ticket-logs\` channel could not be found.`);

        // Find support role
        const supportRole = interaction.guild.roles.cache.find(r => r.name === "꒰Support Team꒱");
        if (!supportRole) return client.errorEmbed(interaction, `The \`꒰Support Team꒱\` role could not be found.`);

        const managementRole = interaction.guild.roles.cache.find(r => r.name === "⸻Management Staff⸻");
        if (!managementRole) return client.errorEmbed(interaction, `The \`⸻Management Staff⸻\` role could not be found.`)

        // Find ticket category
        const ticketCategory = interaction.guild.channels.cache.find(c => c.name === "˗ˏˋ Support ´ˎ˗" && c.type == "GUILD_CATEGORY");
        if (!ticketCategory) return client.errorEmbed(interaction, `The \`˗ˏˋ Support ´ˎ˗\` category could not be found.`);

        // Send logs function
        const sendLog = (channel) => {
            const embed = new MessageEmbed()
                .setTitle("📝 | Ticket Open")
                .setDescription("A user has opened a ticket and is waiting for their request to be handled.")
                .addField(`**Information**`, `**User:** \`${User.user.tag}\`\n**User ID:** \`${User.id}\`\n**Channel:** \`#${channel.name}\`\n**Channel ID:** \`${channel.id}\``)
                .setFooter({ text: `Ticket System`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
                .setColor(client.colors.purple)
                .setTimestamp();

            logsChannel.send({ embeds: [embed] });
        };

        // Create ticket function
        const createTicket = async (guild, type) => {

            // Create button to close tickets
            const closeButton = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId('ticket-close')
                        .setEmoji('🔒')
                        .setLabel('Close Ticket')
                        .setStyle('DANGER')
                );

            // Embeds for tickets
            const griefEmbed = new MessageEmbed()
                .setColor(client.colors.lightred)
                .setTitle("🎟 | Grief Ticket")
                .setFooter({ text: `Ticket System • play.crystals-crescent.com` })
                .setTimestamp()
                .setDescription(`Hello <@${User.id}>, our support team will be with you soon!
**In the meantime, please answer the following questions:**
**1.** What server is this ticket for?
**2.** What happened?
**3.** Coords to the griefed area.
**4.** What is your in-game name?
**5.** If there are people trusted on your areas, list their in-game names.`);

            const glitchEmbed = new MessageEmbed()
                .setColor(client.colors.lightred)
                .setTitle("🎟 | Server Glitch Ticket")
                .setFooter({ text: `Ticket System • play.crystals-crescent.com` })
                .setTimestamp()
                .setDescription(`Hello <@${User.id}>, our support team will be with you soon!
**In the meantime, please answer the following questions:**
**1.** What server is this ticket for?
**2.** What happened?`);

            const appealEmbed = new MessageEmbed()
                .setColor(client.colors.lightred)
                .setTitle("🎟 | Ban Appeal Ticket")
                .setFooter({ text: `Ticket System • play.crystals-crescent.com` })
                .setTimestamp()
                .setDescription(`Hello <@${User.id}>, our support team will be with you soon!
**In the meantime, please answer the following questions:**
**1.** What is your Minecraft in-game name or Discord username/id?
**2.** Who were you banned by?
**3.** Why were you banned?
**4.** Why do you believe you should be unbanned?
**5.** Do you have anything else to add?`);

            const reportEmbed = new MessageEmbed()
                .setColor(client.colors.lightred)
                .setTitle("🎟 | Player Report Ticket")
                .setFooter({ text: `Ticket System • play.crystals-crescent.com` })
                .setTimestamp()
                .setDescription(`Hello <@${User.id}>, our support team will be with you soon!
**In the meantime, please answer the following questions:**
**1.** What server is this ticket for?
**2.** What is the in-game name or Discord username/id of the player you are reporting?
**3.** What is the reason of the complaint?
**4.** Do you have any evidence to support your claim?`);

            const complaintEmbed = new MessageEmbed()
                .setColor(client.colors.lightred)
                .setTitle("🎟 | Staff Complaint Ticket")
                .setFooter({ text: `Ticket System • play.crystals-crescent.com` })
                .setTimestamp()
                .setDescription(`Hello <@${User.id}>, our support team will be with you soon!
**In the meantime, please answer the following questions:**
**1.** What server is this ticket for?
**2.** What is the in-game name or Discord username/id of the staff member you are reporting?
**3.** What is the reason of the complaint?
**4.** Do you have any evidence to support your claim?`);

            const checkinEmbed = new MessageEmbed()
                .setColor(client.colors.lightred)
                .setTitle("🎟 | Staff Check-In Ticket")
                .setFooter({ text: `Ticket System • play.crystals-crescent.com` })
                .setTimestamp()
                .setDescription(`Hello <@${User.id}>, answer all these questions below, everything here is confidential and anything you tell us we will not share, only Management+ can see your messages:
**1.** Do you feel like you are benefitting the staff team with your presence?
**2.** Are you happy with your current staff position, or do you think you should have another position?
**3.** How many hours have you played this week? (Please run \`-playtime (username)\` in this channel to show your weekly playtime)
**4.** Do you think anyone should be promoted or demoted or fired?
**5.** Is there anyone or anything that you think we should have a look at, or anything else you want to say?`)

            // Put type of ticket to embed
            const typeEmbeds = {
                "ticket-grief": griefEmbed,
                "ticket-glitch": glitchEmbed,
                "ticket-appeal": appealEmbed,
                "ticket-report": reportEmbed,
                "ticket-complaint": complaintEmbed,
                "ticket-checkin": checkinEmbed
            };

            // Create ticket
            const ticket = {};
            let currentTicket = await Ticket.findOne({ guildID: guild.id, creatorID: User.id });
            const shortType = type.replace("ticket-", "");

            // Find current ticket
            if (!currentTicket) {

                if (['ticket-complaint', 'ticket-checkin'].includes(interaction.values[0])) {
                    await guild.channels.create(`ticket-${User.user.username}-${shortType}`, {
                        type: 'text',
                        permissionOverwrites: [
                            { id: guild.id, deny: ['VIEW_CHANNEL'] },
                            { id: managementRole.id, allow: ['VIEW_CHANNEL'] },
                            { id: User.id, allow: ['VIEW_CHANNEL'] }
                        ],
                        parent: ticketCategory.id,
                        reason: `Ticket Creation`,
                        topic: `**ID:** ${User.id} | **Tag:** ${User.user.tag} | ${client.config.prefix}close`
                    }).then(newChannel => {
                        ticket.channelID = newChannel.id;
                        newChannel.send({ content: `${managementRole}`, embeds: [typeEmbeds[type]], components: [closeButton] });
                        sendLog(newChannel);
                    });
                    currentTicket = await new Ticket({
                        creatorID: User.id,
                        channelID: ticket.channelID,
                        guildID: guild.id,
                        createdAt: Date.now(),
                        claimed: 0,
                        addedUsers: []
                    });
                    currentTicket.save();
                    interaction.deferUpdate();
                } else {
                    await guild.channels.create(`ticket-${User.user.username}-${shortType}`, {
                        type: 'text',
                        permissionOverwrites: [
                            { id: guild.id, deny: ['VIEW_CHANNEL'] },
                            { id: supportRole.id, allow: ['VIEW_CHANNEL'] },
                            { id: User.id, allow: ['VIEW_CHANNEL'] }
                        ],
                        parent: ticketCategory.id,
                        reason: `Ticket Creation`,
                        topic: `**ID:** ${User.id} | **Tag:** ${User.user.tag} | ${client.config.prefix}close`
                    }).then(newChannel => {
                        ticket.channelID = newChannel.id;
                        newChannel.send({ content: `${supportRole}`, embeds: [typeEmbeds[type]], components: [closeButton] });
                        sendLog(newChannel);
                    });
                    currentTicket = await new Ticket({
                        creatorID: User.id,
                        channelID: ticket.channelID,
                        guildID: guild.id,
                        createdAt: Date.now(),
                        claimed: 0,
                        addedUsers: []
                    });
                    currentTicket.save();
                    interaction.deferUpdate();
                }

            } else return client.errorEmbed(interaction, `You already have an open ticket. <#${currentTicket.channelID}>`, true);
        };

        for (const i of interaction.values) if (ticketTopics.includes(i)) createTicket(interaction.guild, i);
    };
});