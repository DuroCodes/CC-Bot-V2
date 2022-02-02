const { MessageEmbed } = require('discord.js');
const { Command } = require('reconlx');

module.exports = new Command({
    name: "colors",
    aliases: ['colorcodes', 'cc'],
    description: 'view minecraft color codes.',
    run: async ({ client, message }) => {

        // Create embed
        const embed = new MessageEmbed()
            .setColor(client.colors.purple)
            .setTitle("Minecraft Color Codes")
            .setDescription(`Text in Minecraft is formatted with the section symbol: \`§\`\nText in [Essentials](https://essentialsx.net/) is formatted with the ampersand symbol: \`&\``)
            .addFields(
                { name: `Color Codes`, value: `<:DARKRED_4:914007285066518558> - **Dark Red** (\`4\`)\n<:RED_c:914007284202487838> - **Red** (\`c\`)\n<:GOLD_6:914007284991025232> - **Gold** (\`6\`)\n<:YELLOW_e:914007285578215484> - **Yellow** (\`e\`)\n<:DARKGREEN_2:914007284978450462> - **Dark Green** (\`2\`)\n<:GREEN_a:914007284798062622> - **Green** (\`a\`)\n<:DARKAQUA_3:914007285376876565> - **Dark Aqua** (\`3\`)\n<:AQUA_b:914007284961640469> - **Aqua** (\`b\`)`, inline: true },
                { name: `Color Codes`, value: `<:DARKBLUE_1:914007284923908156> - **Dark Blue** (\`1\`)\n<:INDIGO_9:914007284529635349> - **Indigo** (\`9\`)\n<:DARKPURPLE_5:914007284689023026> - **Purple** (\`5\`)\n<:PINK_d:914007285582401626> - **Pink** (\`d\`)\n<:WHITE_f:914007284735172618> - **White** (\`f\`)\n<:GRAY_7:914007284655476777> - **Gray** (\`7\`)\n<:DARKGRAY_8:914007285636956190> - **Dark Gray** (\`8\`)\n<:BLACK_0:914007284877770752> - **Black** (\`0\`)`, inline: true },
                { name: `Formatting Codes`, value: `<:MAGIC_k:914007284110217256> - **Obfuscated** (\`k\`)\n<:BOLD_l:914007284202475560> - **Bold** (\`l\`)\n<:STRIKETHROUGH_m:914007284408008754> - **Strikethrough** (\`m\`)\n<:UNDERLINE_n:914017224891719700> - **Underline** (\`n\`)\n<:ITALIC_o:914007285284614155> - **Italic** (\`o\`)`, inline: true }
            )
            .setFooter({ text: `Crystals Crescent | play.crystals-crescent.com`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })

        // Send embed
        message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } })
    },
});