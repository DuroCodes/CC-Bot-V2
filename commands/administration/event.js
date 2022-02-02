const { MessageEmbed } = require('discord.js');
const { Command } = require('reconlx');

module.exports = new Command({
    name: "event",
    description: 'creates an event.',
    args: '[subcommand]',
    examples: ['list (category)', 'preview [event]', 'create [event] | [date]'],
    run: async ({ client, message, args }) => {

        // Chcek for management staff role
        if (!message.member.roles.cache.some(role => role.name === '⸻Management Staff⸻')) return client.errorEmbed(message, `You do not have permission to use this command.`);

        const capitalize = (phrase) => {
            return phrase
                .toLowerCase()
                .split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
        };

        const eventNames = {
            single_events: [
                'olympics',
                'save the turtles',
                'grief town',
                'storage wars',
                'capture the banner',
                'hide and seek',
                'arctic submarine mini golf',
                'ender golf',
                'archery',
                'quests',
                'wipeout',
                'skin competition'
            ],
            group_events: [
                'ender dragon and wither fight',
                'town vs town',
                'big group caving',
                'giant boss fight',
                'floating island factions',
                'race track',
            ],
            building_events: [
                'sandcastle build contest',
                'ecc spirit build contest',
                'holiday build contest',
                'holiday spawn build contest',
                'spawn build competition',
                'market build competition',
                'pvp arena build competition',
                'medieval themed build competition',
                'futuristic themed build competition',
                'fantasy themed build competition',
                'steampunk themed build competition',
                'underwater themed build competition'
            ],
            pvp_events: [
                'pvp/pve battledome',
                'manhunt',
                'vehicle wars',
                'pvp combat',
                'tower challenge',
                'spleef'
            ],
            treasure_hunt_events: [
                'fishing tournament',
                'easter egg hunt',
                'scavenger hunt',
                'treasure hunt'
            ],
            maze_parkour_events: [
                'noob tower',
                'maze',
                'parkour course'
            ]
        };

        const events = {
            // Single Events
            'olympics': {
                description: `The Olympics is an extravagant festival with a variety of events that players will partake in. The player with the most points from all the events wins.
<:Dot_White:913295566287544361>**Horse Racing-** Players will be given dyed leather horse armor at the beginning of the game. After you take your place in the lineup, each player will  be provided with snowballs to throw at other players while racing as well as jumps, obstacles, and traps to avoid!
<:Dot_White:913295566287544361>**Archery-** Hit as many targets in the allotted time as possible, watch out for moving targets! The player with the most points wins!  
<:Dot_White:913295566287544361>**Boat Racing Ice-** Players must avoid obstacles and drops while racing to the icy finish line, the first person to finish three laps wins!
<:Dot_White:913295566287544361>**Boat Racing Water-** Players must avoid obstacles and drops while racing against other players slipping to the finish line, the first person to finish three laps wins!
<:Dot_White:913295566287544361>**Elytra Racing-** Players must go through various checkpoints inside the planets while dodging obstacles throughout the solar system. The first person to reach the sun wins! 
<:Dot_White:913295566287544361>**PvP-** Two players go head to head against one another, the last player standing wins!`,
                prizes: `*The winner of an individual event will win one key on the server of their choice, the top 3 players with the most wins at the of ALL the events win these special prizes:*
<:First_Place:913294506596659220> **1st Place:** free rank or free rank upgrade if you already have one on your server of choice (does not apply to the $50 or $100 ranks), and a feature on the Crystals Crescent TikTok!
<:Second_Place:913294539148636201> **2nd Place:** free tag on your server of choice, and a feature on the Crystals Crescent TikTok!
<:Third_Place:913294577203544084> **3rd Place:** free key on your server of choice, and a feature on the Crystals Crescent TikTok!`,
                color: '#ff8fce'
            },
            'save the turtles': {
                description: `Each player will spawn with basic survival necessities. The objective is to SAVE THE TURTLES!! The turtles will be in the center pond, mobs will come in waves with the goal of killing the turtles. Each wave the mobs will get increasingly more difficult as you fight for your turtle's lives. Players will have two lives, you need two turtles left at the end of the game to win.`,
                prizes: `<:First_Place:913294506596659220> **1st Place:** free tag on your server of choice, and a feature on the Crystals Crescent TikTok!
<:Second_Place:913294539148636201> **2nd Place**: two free keys on your server of choice, and a feature on the Crystals Crescent TikTok!
<:Third_Place:913294577203544084> **3rd Place**: free key on your server of choice, and a feature on the Crystals Crescent TikTok! `,
                color: '#ff8fce'
            },
            'storage wars': {
                description: `Crates will be auctioned off one by one and players will bid for each crate until all twenty are sold. After all crates are auctioned off players can open their crates. Be careful which crate you bid on as each crate can range from having from, no items, to thousands of dollars, or even a good pair of diamond boots!`,
                prizes: `<:Dot_White:913295566287544361> If you like what you received in your crate, you are able to transfer your crate from the Event to the server of your choice with the help of an staff member!`,
                color: '#ff8fce'
            },
            'capture the banner': {
                description: `The objective of the game is to capture the opposite team's banner and bring it back to your side to win the game. Each player will spawn with basic armor and supplies. In the middle of both sides, there will be no man's land where a special sword will spawn. The player who gets it will have it only while they’re alive and when they die, it will respawn in no man's land. If your banner is picked up by the opposite team, you have a chance to get it back while they run back to their side.`,
                prizes: `<:First_Place:913294506596659220> **1st Place**: free rank or free rank upgrade if you already have one on your server of choice (does not apply to the $50 or $100 ranks), and a feature on the Crystals Crescent TikTok!
<:Second_Place:913294539148636201> **2nd Place**: free tag on your server of choice, and a feature on the Crystals Crescent TikTok!
<:Third_Place:913294577203544084> **3rd Place**: free key on your server of choice, and a feature on the Crystals Crescent TikTok!`,
                color: '#ff8fce'
            },
            'hide and seek': {
                description: `The game will have two, five minute rounds. The game starts with three seekers. The hiders will have two minutes to hide in the arena before the seekers are released. The seekers will have to hit the hiders two times the kill them, once they are dead they will become a seeker as well. Hiders must live to the end of the game to win. The seeker with the highest kill count will also win a bonus if all the hiders are dead.`,
                prizes: `<:First_Place:913294506596659220> **1st Place:** free rank or free rank upgrade if you already have one on your server of choice (does not apply to the $50 or $100 ranks), and a feature on the Crystals Crescent TikTok!
<:Second_Place:913294539148636201> **2nd Place:** free tag on your server of choice, and a feature on the Crystals Crescent TikTok!
<:Third_Place:913294577203544084> **3rd Place:** free key on your server of choice, and a feature on the Crystals Crescent TikTok!`,
                color: '#ff8fce'
            },
            'arctic submarine mini golf': {
                description: `Your submarine has dipped down to a dangerous depth and is struggling in the icy cold waters. Your job is to warm up the “pipes” by dropping special “warming packets” down the drain holes. Time is of the essence, and accuracy is the name of the game. Essentially, it is themed mini-golf. The player with the lowest score wins.`,
                prizes: `<:First_Place:913294506596659220> **1st Place:** free rank or free rank upgrade if you already have one on your server of choice (does not apply to the $50 or $100 ranks), and a feature on the Crystals Crescent TikTok!
<:Second_Place:913294539148636201> **2nd Place:** free tag on your server of choice, and a feature on the Crystals Crescent TikTok!
<:Third_Place:913294577203544084> **3rd Place:** free key on your server of choice, and a feature on the Crystals Crescent TikTok!`,
                color: '#ff8fce'
            },
            'ender golf': {
                description: `Each player will be given ender pearls with the goal of landing as close to the beacon as possible. You will land wherever your pearl is thrown to. The player with the least amount of throws wins!`,
                prizes: `<:First_Place:913294506596659220> **1st Place:** free tag on your server of choice, and a feature on the Crystals Crescent TikTok!
<:Second_Place:913294539148636201> **2nd Place:** two free keys on your server of choice, and a feature on the Crystals Crescent TikTok!
<:Third_Place:913294577203544084> **3rd Place:** free key on your server of choice, and a feature on the Crystals Crescent TikTok!`,
                color: '#ff8fce'
            },
            'archery': {
                description: `Hit as many targets in the allotted time as possible, watch out for moving targets! The player with the most points wins!`,
                prizes: `<:First_Place:913294506596659220> **1st Place:** free tag on your server of choice, and a feature on the Crystals Crescent TikTok!
<:Second_Place:913294539148636201> **2nd Place:** two free keys on your server of choice, and a feature on the Crystals Crescent TikTok!
<:Third_Place:913294577203544084> **3rd Place:** free key on your server of choice, and a feature on the Crystals Crescent TikTok!`,
                color: '#ff8fce'
            },
            'quests': {
                description: `Players will be presented with five quests to complete in twenty minutes. Each player will have to go through each quest to get to the last checkpoint. The first person to finish all quests and reach the endpoint wins!`,
                prizes: `<:First_Place:913294506596659220> **1st Place:** free rank or free rank upgrade if you already have one on your server of choice (does not apply to the $50 or $100 ranks), and a feature on the Crystals Crescent TikTok!
<:Second_Place:913294539148636201> **2nd Place:** free tag on your server of choice, and a feature on the Crystals Crescent TikTok!
<:Third_Place:913294577203544084> **3rd Place:** free key on your server of choice, and a feature on the Crystals Crescent TikTok!`,
                color: '#ff8fce'
            },
            'wipeout': {
                description: `Players will compete to have the shortest time while running on an obstacle course made to trick you.`,
                prizes: `<:First_Place:913294506596659220> **1st Place:** free tag on your server of choice, and a feature on the Crystals Crescent TikTok!
<:Second_Place:913294539148636201> **2nd Place:** two free keys on your server of choice, and a feature on the Crystals Crescent TikTok!
<:Third_Place:913294577203544084> **3rd Place:** free key on your server of choice, and a feature on the Crystals Crescent TikTok!`,
                color: '#ff8fce'
            },
            'skin competition': {
                description: `Each player will have 5 days to submit the best skin they can edit/create. The skin with the most votes wins!`,
                prizes: `<:First_Place:913294506596659220> **1st Place:** free tag on your server of choice, and a feature on the Crystals Crescent TikTok!
<:Second_Place:913294539148636201> **2nd Place:** two free keys on your server of choice, and a feature on the Crystals Crescent TikTok!
<:Third_Place:913294577203544084> **3rd Place:** free key on your server of choice, and a feature on the Crystals Crescent TikTok!`,
                color: '#ff8fce'
            },
            'grief town': {
                description: `Each player will spawn with a set of stone tools, the first player to demolish their home wins!`,
                prizes: `<:First_Place:913294506596659220> **1st Place:** free tag on your server of choice, and a feature on the Crystals Crescent TikTok!
<:Second_Place:913294539148636201> **2nd Place:** two free keys on your server of choice, and a feature on the Crystals Crescent TikTok!
<:Third_Place:913294577203544084> **3rd Place:** free key on your server of choice, and a feature on the Crystals Crescent TikTok!`,
                color: '#ff8fce'
            },
            // Group Events
        };

        const subcommand = args[0]?.toLowerCase() || 'none';

        // Check if args are = 'List'
        if (subcommand === 'list') {

            if (args[1] && eventNames.hasOwnProperty((args.slice(1).join(' ').replace(' ', '_').replace('/', '_')).toLowerCase())) {

                const sub = eventNames[(args.slice(1).join(' ').replace(' ', '_').replace('/', '_')).toLowerCase()];
                var description = '';

                sub.forEach(event => description += `<:Dot_White:913295566287544361> ${capitalize(event)}\n`);

                const embed = new MessageEmbed()
                    .setTitle(`${(args.slice(1).join(' ').replace(' ', '_').replace('/', '_')).toUpperCase()} Events`)
                    .setColor(client.colors.invisible)
                    .setDescription(description);

                message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
            }
            else {
                const embed = new MessageEmbed()
                    .setTitle('Available Events')
                    .setColor(client.colors.invisible)
                    .setDescription(`__**Events List:**__
<:Dot_Pink:913295787021180948> **Single Events:** \`${capitalize(eventNames.single_events.join(', '))}\`
<:Dot_Teal:913295696109645876> **Group Events:** \`${capitalize(eventNames.group_events.join(', '))}\`
<:Dot_Blue:913295722659594320> **Building Events:** \`${capitalize(eventNames.building_events.join(', '))}\`
<:Dot_Red:913295589821784074> **PvP Events:** \`${capitalize(eventNames.pvp_events.join(', '))}\`
<:Dot_Yellow:913295645975130123> **Treasure Hunt Events:** \`${capitalize(eventNames.treasure_hunt_events.join(', '))}\`
<:Dot_Purple:913295745606647850> **Maze/Parkour Events:** \`${capitalize(eventNames.maze_parkour_events.join(', '))}\``);

                message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
            }
        }
        else if (subcommand === 'preview') {
            const type = (args.slice(1).join(' ').replaceAll('_', ' ')).toLowerCase();
            if (args[1] && events.hasOwnProperty(type)) {

                const eventInfo = events[type];

                const embed = new MessageEmbed()
                    .setTitle(`🗓 New Event | ${capitalize(type)}`)
                    .setDescription(`<a:Arrow_White:913294475437174785> **Date/Time:** \`${new Date().toLocaleString()}\`

**<a:Arrow_White:913294475437174785> Description of Event:**
${eventInfo.description}

**<a:Arrow_White:913294475437174785> Rules:**
<:One:913309473412628490> All <#810055153184145429> already in place by Crystals Crescent apply for events.\n<:Two:913309473978867713> Any use of unfair advantages will result in a disqualification.\n<:Three:913547003747790848> Stay in the designated event area at all times.\n<:Four:913547038317215794> Remember that this is just an event, so have fun.\n**__Failure to follow these rules will result in immediate disqualification.__**

**<a:Arrow_White:913294475437174785> Placement and Prizes:**
${eventInfo.prizes}`)
                    .setColor(eventInfo.color)
                    .setFooter({ text: `Crystals Crescent | play.crystals-crescent.com`, iconURL: client.user.displayAvatarURL({ dynamic: true }) });

                message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
            }
            else return client.errorEmbed(message, `The event could not be found.`);
        }
        else return client.errorEmbed(message, `Invalid arguments. \`${client.config.prefix}help ${module.exports.name}\``);

    },
});