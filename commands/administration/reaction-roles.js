const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js');
const { Command } = require('reconlx');

module.exports = new Command({
    name: "reaction-roles",
    aliases: ['rr'],
    args: '(staff)',
    description: 'creates the message for reaction roles.',
    run: async ({ client, message, args }) => {

        // Check for management staff role
        if (!message.member.roles.cache.some(role => role.name === '⸻Management Staff⸻')) return client.errorEmbed(message, `You do not have permission to use this command.`);

        // Create embeds and dropdowns
        const zodiacEmbed = new MessageEmbed()
            .setFooter({ text: `Crystals Crescent | play.crystals-crescent.com`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
            .setTitle('✧･ﾟ: ✧･ﾟ: Zodiac Sign :･ﾟ✧:･ﾟ✧')
            .setColor(client.colors.purple)
            .setDescription(`\
Select <a:Aries:913294761480318976> if your zodiac sign is Aries
Select <a:Taurus:913294784662208533> if your zodiac sign is Taurus
Select <a:Gemini:913294809328914453> if your zodiac sign is Gemini
Select <a:Cancer:913294834217934878> if your zodiac sign is Cancer
Select <a:Leo:913294885115797526> if your zodiac sign is Leo
Select <a:Virgo:913294916145274951> if your zodiac sign is Virgo
Select <a:Libra:913294962832064553> if your zodiac sign is Libra
Select <a:Scorpio:913294988077588490> if your zodiac sign is Scorpio
Select <a:Sagittarius:913295011930583064> if your zodiac sign is Sagittarius
Select <a:Capricorn:913295036366614579> if your zodiac sign is Capricorn
Select <a:Aquarius:913295061582753792> if your zodiac sign is Aquarius
Select <a:Pisces:913295099239223346> if your zodiac sign is Pisces`);

        const zodiacDropdown = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setMaxValues(12)
                    .setCustomId('zodiac-dropdown')
                    .setPlaceholder('Select roles...')
                    .addOptions([
                        {
                            emoji: '913294761480318976',
                            label: 'Aries',
                            description: 'Select this if your zodiac sign is Aries',
                            value: 'zodiac-aries'
                        },
                        {
                            emoji: '913294784662208533',
                            label: 'Taurus',
                            description: 'Select this if your zodiac sign is Taurus',
                            value: 'zodiac-taurus'
                        },
                        {
                            emoji: '913294809328914453',
                            label: 'Gemini',
                            description: 'Select this if your zodiac sign is Gemini',
                            value: 'zodiac-gemini'
                        },
                        {
                            emoji: '913294834217934878',
                            label: 'Cancer',
                            description: 'Select this if your zodiac sign is Cancer',
                            value: 'zodiac-cancer'
                        },
                        {
                            emoji: '913294885115797526',
                            label: 'Leo',
                            description: 'Select this if your zodiac sign is Leo',
                            value: 'zodiac-leo'
                        },
                        {
                            emoji: '913294916145274951',
                            label: 'Virgo',
                            description: 'Select this if your zodiac sign is Virgo',
                            value: 'zodiac-virgo'
                        },
                        {
                            emoji: '913294962832064553',
                            label: 'Libra',
                            description: 'Select this if your zodiac sign is Libra',
                            value: 'zodiac-libra'
                        },
                        {
                            emoji: '913294988077588490',
                            label: 'Scorpio',
                            description: 'Select this if your zodiac sign is Scorpio',
                            value: 'zodiac-scorpio'
                        },
                        {
                            emoji: '913295011930583064',
                            label: 'Sagittarius',
                            description: 'Select this if your zodiac sign is Sagittarius',
                            value: 'zodiac-sagittarius'
                        },
                        {
                            emoji: '913295036366614579',
                            label: 'Capricorn',
                            description: 'Select this if your zodiac sign is Capricorn',
                            value: 'zodiac-capricorn'
                        },
                        {
                            emoji: '913295061582753792',
                            label: 'Aquarius',
                            description: 'Select this if your zodiac sign is Aquarius',
                            value: 'zodiac-aquarius'
                        },
                        {
                            emoji: '913295099239223346',
                            label: 'Pisces',
                            description: 'Select this if your zodiac sign is Pisces',
                            value: 'zodiac-pisces'
                        }
                    ])
            );

        const sexualityEmbed = new MessageEmbed()
            .setFooter({ text: `Crystals Crescent | play.crystals-crescent.com`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
            .setTitle('✧･ﾟ: ✧･ﾟ: Sexuality :･ﾟ✧:･ﾟ✧')
            .setColor(client.colors.purple)
            .setDescription(`\
Select <:Gay_Flag:913295128058286100> if your sexuality is Gay
Select <:Lesbian_Flag:913295161851772959> if your sexuality is Lesbian
Select <:Bisexual_Flag:913295188061982740> if your sexuality is Bisexual
Select <:Pansexual_Flag:913295212665778176> if your sexuality is Pansexual
Select <:Polysexual_Flag:913295232244797490> if your sexuality is Polysexual
Select <:Omnisexual_Flag:913295255342821396> if your sexuality is Omnisexual
Select <:Asexual_Flag:913295279619461140> if your sexuality is Asexual
Select <:Aromantic_Flag:913295299986980934> if your sexuality is Aromantic.
Select <:Queer_Flag:913295319276609547> if your sexuality is Queer
Select <:Straight_Ally_Flag:913295341556731944> if your sexuality is a straight ally
Select ❓ if you do not want/have a label
Select ❔ if you're questioning your sexual preference`);

        const sexualityDropdown = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setMaxValues(12)
                    .setCustomId('sexuality-dropdown')
                    .setPlaceholder('Select roles...')
                    .addOptions([
                        {
                            emoji: '913295128058286100',
                            label: 'Gay',
                            description: 'Select this if your sexuality is gay',
                            value: 'sexuality-gay'
                        },
                        {
                            emoji: '913295161851772959',
                            label: 'Lesbian',
                            description: 'Select this if your sexuality is Lesbian',
                            value: 'sexuality-lesbian'
                        },
                        {
                            emoji: '913295188061982740',
                            label: 'Bisexual',
                            description: 'Select this if your sexuality is Bisexual',
                            value: 'sexuality-bisexual'
                        },
                        {
                            emoji: '913295212665778176',
                            label: 'Pansexual',
                            description: 'Select this if your sexuality is Pansexual',
                            value: 'sexuality-pansexual'
                        },
                        {
                            emoji: '913295232244797490',
                            label: 'Polysexual',
                            description: 'Select this if your sexuality is Polysexual',
                            value: 'sexuality-polysexual'
                        },
                        {
                            emoji: '913295255342821396',
                            label: 'Omnisexual',
                            description: 'Select this if your sexuality is Omnisexual',
                            value: 'sexuality-omnisexual'
                        },
                        {
                            emoji: '913295279619461140',
                            label: 'Asexual',
                            description: 'Select this if your sexuality is Asexual',
                            value: 'sexuality-asexual'
                        },
                        {
                            emoji: '913295299986980934',
                            label: 'Aromantic',
                            description: 'Select this if your sexuality is Aromantic',
                            value: 'sexuality-aromantic'
                        },
                        {
                            emoji: '913295319276609547',
                            label: 'Queer',
                            description: 'Select this if your sexuality is Queer',
                            value: 'sexuality-queer'
                        },
                        {
                            emoji: '913295341556731944',
                            label: 'Straight Ally',
                            description: 'Select this if your sexuality is a straight ally',
                            value: 'sexuality-straight'
                        },
                        {
                            emoji: '❓',
                            label: 'No Label',
                            description: 'Select this if you do not have/want a label',
                            value: 'sexuality-none'
                        },
                        {
                            emoji: '❔',
                            label: 'Questioning',
                            description: 'Select this if you\'re questioning your sexual preference',
                            value: 'sexuality-questioning'
                        }
                    ])
            );

        const pronounsEmbed = new MessageEmbed()
            .setFooter({ text: `Crystals Crescent | play.crystals-crescent.com`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
            .setTitle('✧･ﾟ: ✧･ﾟ: Pronouns :･ﾟ✧:･ﾟ✧')
            .setColor(client.colors.purple)
            .setDescription(`\
Select <:Heart_Maroon:913293902201634836> if your pronouns are She/Her
Select <:Heart_Neon_Red:913293939484807181> if your pronouns are She/They
Select <:Heart_Orange:913293979993403402> if your pronouns are They/She
Select <:Heart_Yellow:913294010368548934> if your pronouns are They/Them
Select <:Heart_Neon_Green:913294041347661824> if your pronouns are They/He
Select <:Heart_Forest_Green:913294075371859968> if your pronouns are He/They
Select <:Heart_Sky_Blue:913294107156303982> if your pronouns are He/Him
Select <:Heart_Light_Blue:913294150441504779> if your pronouns are She/They/He
Select <:Heart_Blue:913294175867400222> if you use any pronouns
Select <:Heart_Navy_Blue:913294203411365898> if you have no pronouns
Select <:Heart_Pastel_Purple:913294236995170324> if you prefer to be asked
Select <:Heart_Purple:913294262198743040> if your pronouns are It/It's
Select <:Heart_Violet:913294271346536448> if you use neo-pronouns`);

        const pronounsDropdown = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setMaxValues(13)
                    .setCustomId('pronouns-dropdown')
                    .setPlaceholder('Select roles...')
                    .addOptions([
                        {
                            emoji: '913293902201634836',
                            label: 'She/Her',
                            description: 'Select this if your pronouns are She/Her',
                            value: 'pronouns-she/her'
                        },
                        {
                            emoji: '913293939484807181',
                            label: 'She/They',
                            description: 'Select this if your pronouns are She/They',
                            value: 'pronouns-she/they'
                        },
                        {
                            emoji: '913293979993403402',
                            label: 'They/She',
                            description: 'Select this if your pronouns are They/She',
                            value: 'pronouns-they/she'
                        },
                        {
                            emoji: '913294010368548934',
                            label: 'They/Them',
                            description: 'Select this if your pronouns are They/Them',
                            value: 'pronouns-they/them'
                        },
                        {
                            emoji: '913294041347661824',
                            label: 'They/He',
                            description: 'Select this if your pronouns are They/He',
                            value: 'pronouns-they/he'
                        },
                        {
                            emoji: '913294075371859968',
                            label: 'He/They',
                            description: 'Select this if your pronouns are He/They',
                            value: 'pronouns-he/they'
                        },
                        {
                            emoji: '913294107156303982',
                            label: 'He/Him',
                            description: 'Select this if your pronouns are He/Him',
                            value: 'pronouns-he/him'
                        },
                        {
                            emoji: '913294150441504779',
                            label: 'She/They/He',
                            description: 'Select this if your pronouns are She/They/He',
                            value: 'pronouns-she/they/he'
                        },
                        {
                            emoji: '913294175867400222',
                            label: 'Any Pronouns',
                            description: 'Select this if you use any pronouns',
                            value: 'pronouns-any'
                        },
                        {
                            emoji: '913294203411365898',
                            label: 'No Pronouns',
                            description: 'Select this if you have no pronouns',
                            value: 'pronouns-no'
                        },
                        {
                            emoji: '913294236995170324',
                            label: 'Ask',
                            description: 'Select this if you prefer to be asked',
                            value: 'pronouns-ask'
                        },
                        {
                            emoji: '913294262198743040',
                            label: 'It/It\'s',
                            description: 'Select this if your pronouns are It/It\'s',
                            value: 'pronouns-it/its'
                        },
                        {
                            emoji: '913294271346536448',
                            label: 'Neo-Pronouns',
                            description: 'Select this if you use neo-pronouns',
                            value: 'pronouns-neo'
                        }
                    ])
            );

        const platformEmbed = new MessageEmbed()
            .setFooter({ text: `Crystals Crescent | play.crystals-crescent.com`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
            .setTitle('✧･ﾟ: ✧･ﾟ: Platform :･ﾟ✧:･ﾟ✧')
            .setColor(client.colors.purple)
            .setDescription(`\
Select 💻 if your platform is Java
Select 📱 if your platform is Bedrock`);

        const platformDropdown = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setMaxValues(2)
                    .setCustomId('platform-dropdown')
                    .setPlaceholder('Select roles...')
                    .addOptions([
                        {
                            emoji: '💻',
                            label: 'Java',
                            description: 'Select this if your platform is Java',
                            value: 'platform-java'
                        },
                        {
                            emoji: '📱',
                            label: 'Bedrock',
                            description: 'Select this if your platform is Bedrock',
                            value: 'platform-bedrock'
                        }
                    ])
            );

        const continentEmbed = new MessageEmbed()
            .setFooter({ text: `Crystals Crescent | play.crystals-crescent.com`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
            .setTitle('✧･ﾟ: ✧･ﾟ: Continent :･ﾟ✧:･ﾟ✧')
            .setColor(client.colors.purple)
            .setDescription(`\
Select <:Africa:913295372909150228> if your continent is Africa
Select <:Asia:913295399811440682> if your continent is Asia
Select <:Australia:913295423123390474> if your continent is Australia
Select <:Europe:913295447530029087> if your continent is Europe
Select <:North_America:913295470581907477> if your continent is North America
Select <:South_America:913295497295437875> if your continent is South America`);

        const continentDropdown = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setMaxValues(6)
                    .setCustomId('continent-dropdown')
                    .setPlaceholder('Select roles...')
                    .addOptions([
                        {
                            emoji: '913295372909150228',
                            label: 'Africa',
                            description: 'Select this if your continent is Africa',
                            value: 'continent-africa'
                        },
                        {
                            emoji: '913295399811440682',
                            label: 'Asia',
                            description: 'Select this if your continent is Asia',
                            value: 'continent-asia'
                        },
                        {
                            emoji: '913295423123390474',
                            label: 'Australia',
                            description: 'Select this if your continent is Australia',
                            value: 'continent-australia'
                        },
                        {
                            emoji: '913295447530029087',
                            label: 'Europe',
                            description: 'Select this if your continent is Europe',
                            value: 'continent-europe'
                        },
                        {
                            emoji: '913295470581907477',
                            label: 'North America',
                            description: 'Select this if your continent is North America',
                            value: 'continent-north-america'
                        },
                        {
                            emoji: '913295497295437875',
                            label: 'South America',
                            description: 'Select this if your continent is South America',
                            value: 'continent-south-america'
                        }
                    ])
            );

        const updatesEmbed = new MessageEmbed()
            .setFooter({ text: `Crystals Crescent | play.crystals-crescent.com`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
            .setTitle('✧･ﾟ: ✧･ﾟ: Updates :･ﾟ✧:･ﾟ✧')
            .setColor(client.colors.purple)
            .setDescription(`\
Select <:Discord:913294608312696832> if you want to receive Discord updates
Select <:LunarCore_MC:913292253240385536> if you want to receive LunarCore MC updates
Select <:Crystals_Cavern:913292262161645598> if you want to receive Crystals Cavern updates
Select <a:OneBlock:925839178359513178> if you want to receive OneBlock updates
Select <:Creative:913292281908449281> if you want to receive Creative updates`);

        const updatesDropdown = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setMaxValues(5)
                    .setCustomId('updates-dropdown')
                    .setPlaceholder('Select roles...')
                    .addOptions([
                        {
                            emoji: '913294608312696832',
                            label: 'Discord',
                            description: 'Select this if you want to receive Discord updates',
                            value: 'updates-discord'
                        },
                        {
                            emoji: '913292253240385536',
                            label: 'LunarCore MC',
                            description: 'Select this if you want to receive LunarCore MC updates',
                            value: 'updates-lunarcore'
                        },
                        {
                            emoji: '913292262161645598',
                            label: 'Crystals Cavern',
                            description: 'Select this if you want to receive Crystals Cavern updates',
                            value: 'updates-crystalscavern'
                        },
                        {
                            emoji: '925839178359513178',
                            label: 'OneBlock',
                            description: 'Select this if you want to receive OneBlock updates',
                            value: 'updates-oneblock'
                        },
                        {
                            emoji: '913292281908449281',
                            label: 'Creative',
                            description: 'Select this if you want to receive Creative updates',
                            value: 'updates-creative'
                        }
                    ])
            );

        const notificationsEmbed = new MessageEmbed()
            .setFooter({ text: `Crystals Crescent | play.crystals-crescent.com`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
            .setTitle('✧･ﾟ: ✧･ﾟ: Notifications :･ﾟ✧:･ﾟ✧')
            .setColor(client.colors.purple)
            .setDescription(`\
Select <:TikTok:913294634191560704> if you want to receive Tiktok Notifications
Select <:Twitter:913294659701329930> if you want to receive Twitter Notifications
Select <:Instagram:913294683810201630> if you want to receive Instagram Notifications
Select <:Facebook:913294707365388329> if you want to receive Facebook Notifications`);

        const notificationsDropdown = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setMaxValues(4)
                    .setCustomId('notifications-dropdown')
                    .setPlaceholder('Select roles...')
                    .addOptions([
                        {
                            emoji: '913294634191560704',
                            label: 'TikTok',
                            description: 'Select this if you want to receive TikTok updates',
                            value: 'notifications-tiktok'
                        },
                        {
                            emoji: '913294659701329930',
                            label: 'Twitter',
                            description: 'Select this if you want to receive Twitter updates',
                            value: 'notifications-twitter'
                        },
                        {
                            emoji: '913294683810201630',
                            label: 'Instagram',
                            description: 'Select this if you want to receive Instagram updates',
                            value: 'notifications-instagram'
                        },
                        {
                            emoji: '913294707365388329',
                            label: 'Facebook',
                            description: 'Select this if you want to receive Facebook updates',
                            value: 'notifications-facebook'
                        }
                    ])
            );

        message.delete();
        if (['staff', 's'].includes(args[0])) {
            message.channel.send({ embeds: [platformEmbed], components: [platformDropdown] });
            message.channel.send({ embeds: [continentEmbed], components: [continentDropdown] });
            message.channel.send({ embeds: [pronounsEmbed], components: [pronounsDropdown] });
        }
        else {
            message.channel.send({ embeds: [zodiacEmbed], components: [zodiacDropdown] });
            message.channel.send({ embeds: [sexualityEmbed], components: [sexualityDropdown] });
            message.channel.send({ embeds: [pronounsEmbed], components: [pronounsDropdown] });
            message.channel.send({ embeds: [platformEmbed], components: [platformDropdown] });
            message.channel.send({ embeds: [continentEmbed], components: [continentDropdown] });
            message.channel.send({ embeds: [updatesEmbed], components: [updatesDropdown] });
            message.channel.send({ embeds: [notificationsEmbed], components: [notificationsDropdown] });
        }


    }
});