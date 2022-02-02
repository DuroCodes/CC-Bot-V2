const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require("discord.js");
const { Command } = require('reconlx');
const { promisify } = require("util");
const { glob } = require("glob");
const globPromise = promisify(glob);
const ms = require("ms")

module.exports = new Command({
    name: "help",
    aliases: ['h'],
    args: '(category/command/all)',
    description: "displays information on available commands.",
    run: async ({ client, message, args }) => {

        // Create emojis for each category
        const emojis = {
            "action": "💥",
            "administration": "⚙️",
            "fun": "🎲",
            "giveaways": "🎉",
            "linking": "🔗",
            "moderation": "🛡",
            "music": "🎵",
            "staff": "🛠",
            "suggestions": "💡",
            "statistics": "📊",
            "tickets": "🎟",
            "utility": "⚒️",
        };

        // Create colors for each category
        const colors = {
            "action": "#AC2D39",
            "administration": "#66757F",
            "fun": "#EA596E",
            "giveaways": "#CB3F49",
            "linking": "#8B99A5",
            "moderation": "#55ACEE",
            "music": "#71ABE7",
            "staff": "#F3900C",
            "suggestions": "#F9DA8F",
            "statistics": "#5C913B",
            "tickets": "#BE1931",
            "utility": "#D3780A",
        };

        // Set dictionaries to each command and their directory
        const directories = [...new Set(client.commands.map(cmd => cmd.directory))];

        // Format string function
        const formatString = (str) => `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`;

        // Create categories for each directory
        const categories = directories.map((dir) => {

            // Get commands from each directory
            const getCommands = client.commands.filter((cmd) => cmd.directory === dir)
                .map(cmd => {
                    // Get command args (name, description, and args)
                    if (!cmd.args) {
                        return {
                            name: cmd.name || "N/A",
                            description: cmd.description || "no description.",
                            args: ""
                        }
                        // Get command args (name, description, and args)
                    } else {
                        return {
                            name: cmd.name || "N/A",
                            description: cmd.description || "no description.",
                            args: ` ${cmd.args}`
                        }
                    }
                });

            // Return directory and commands in the directory
            return {
                directory: formatString(dir),
                commands: getCommands
            };
        });

        // Check if no category is in the message
        if (!args[0]) {
            // Create embed
            const embed = new MessageEmbed()
                .setColor(client.colors.purple)
                .setImage("https://cdn.discordapp.com/attachments/913320412224561192/913338227837001728/Crystals_Crescent_Discovery_Imaghe.png")
                .setTitle("Crystals Crescent Help Menu")
                .setFooter({ text: `Crystals Crescent | play.crystals-crescent.com`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })

            // Create dropdown
            const components = (state) => [
                new MessageActionRow().addComponents(
                    new MessageSelectMenu()
                        .setCustomId("help-menu")
                        .setPlaceholder('Please select a category...')
                        .setDisabled(state)
                        .addOptions(
                            categories.map((cmd) => {
                                return {
                                    label: cmd.directory,
                                    value: cmd.directory.toLowerCase(),
                                    description: `Commands from ${cmd.directory} category`,
                                    emoji: emojis[cmd.directory.toLowerCase()] || null
                                };
                            })
                        )
                ),
            ];

            // Create initial message
            const initialMessage = await message.reply({
                allowedMentions: { repliedUser: false },
                embeds: [embed],
                components: components(false)
            });

            // Create filter to make sure the interaction user is the author
            const filter = (interaction) => interaction.user.id === message.author.id;

            // Create collector for dropdown selection
            const collector = message.channel.createMessageComponentCollector({
                filter,
                componentType: 'SELECT_MENU',
                time: 30000
            });

            // Collect stuff from information
            collector.on('collect', (interaction) => {

                // Create directory and category
                const [directory] = interaction.values;
                const category = categories.find(x => x.directory.toLowerCase() === directory);

                // Create embed
                const categoryEmbed = new MessageEmbed()
                    .setTitle(`${emojis[directory] || null} | ${formatString(directory)} Commands`)
                    .setColor(colors[directory] || client.colors.invisible)
                    .setDescription(
                        category.commands.map((cmd) => {
                            return `\`${client.config.prefix}${cmd.name}${cmd.args}\` - ${cmd.description}`
                        }).toString().replaceAll(',', '\n')
                    )
                    .setFooter({ text: `Crystals Crescent Bot`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
                    .setTimestamp();

                // Update message with new embed
                interaction.update({ embeds: [categoryEmbed], ephermal: true });
            });

            // Make the dropdown not work after the collector ends
            collector.on("end", () => {
                initialMessage.edit({ components: components(true) })
            });

        }
        // List all commands
        else if (args[0] === 'all' || args[0] === 'a') {
            let cmds = '';

            // Read all commands from files
            const commandFiles = await globPromise(`${process.cwd()}/commands/**/*.js`);
            commandFiles.map((value) => {
                const file = require(value);
                if (file.args) cmds += `\`${client.config.prefix}${file.name} ${file.args}\` - ${file.description}\n`;
                else cmds += `\`${client.config.prefix}${file.name}\` - ${file.description}\n`;
            });

            // Create embed
            const embed = new MessageEmbed()
                .setTitle(`Crystals Crescent Help`)
                .setColor(client.colors.purple)
                .setFooter({ text: `Crystals Crescent Bot`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
                .setTimestamp()
                .setDescription(cmds);

            // Send embed
            message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });

        }
        // Check if args are in client commands
        else if (client.commands.get(args[0].toLowerCase().replace(client.config.prefix, "")) || client.commands.find(c => c.aliases?.includes(args[0].toLowerCase().replace(client.config.prefix, "")))) {

            // Get command from args
            const cmd = client.commands.get(args[0].toLowerCase().replace(client.config.prefix, "")) || client.commands.find(c => c.aliases?.includes(args[0].toLowerCase().replace(client.config.prefix, "")));

            // Set info for command
            const aliases = cmd.aliases ? cmd.aliases.map(c => `${client.config.prefix}${c}`).join(', ') : 'No aliases.';
            const description = cmd.description ? formatString(cmd.description) : 'No description.';
            const cooldown = (cmd.cooldown && cmd.cooldown !== 0) ? ms(cmd.cooldown, { long: true }) : 'No cooldown.';
            const cmdArgs = cmd.args ? ` ${cmd.args}` : '';

            let desc;
            let examples = [];
            if (cmd.examples) {
                cmd.examples.forEach((e, i) => examples.push(`**${i + 1})** \`${client.config.prefix}${cmd.name} ${e}\``));
                desc = `**Aliases:** \`${aliases}\`\n**Description:** \`${description}\`\n**Cooldown:** \`${cooldown}\`\n**Usage:** \`${client.config.prefix}${cmd.name}${cmdArgs}\`\n**Example${examples.length > 1 ? 's' : ''}:** \n${examples.join("\n")}`;
            }
            else desc = `**Aliases:** \`${aliases}\`\n**Description:** \`${description}\`\n**Cooldown:** \`${cooldown}\`\n**Usage:** \`${client.config.prefix}${cmd.name}${cmdArgs}\``;
            // Make embed with command info
            const embed = new MessageEmbed()
                .setTitle(`Command: ${client.config.prefix}${cmd.name}`)
                .setDescription(desc)
                .setFooter({ text: `Crystals Crescent Bot`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
                .setColor(client.colors.purple)
                .setTimestamp();

            // Send embed
            message.reply({ embeds: [embed], allowedMentions: { repliedUser: false }, });

        }
        // Check if there is a category from args
        else if (categories.find(x => x.directory.toLowerCase() === args[0])) {

            // Find category from arguments
            const dir = args[0];
            const cat = categories.find(x => x.directory.toLowerCase() === dir);

            // Create embed
            const categoryEmbed = new MessageEmbed()
                .setTitle(`${emojis[dir] || null} | ${formatString(dir)} Commands`)
                .setColor(colors[dir] || client.colors.invisible)
                .setDescription(
                    cat.commands.map((cmd) => { return `\`${client.config.prefix}${cmd.name}${cmd.args}\` - ${cmd.description}` }).toString().replaceAll(',', '\n')
                )
                .setFooter({ text: `Crystals Crescent Bot`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
                .setTimestamp();

            // Send embed
            message.reply({ embeds: [categoryEmbed], allowedMentions: { repliedUser: false } })
        }
        else return client.errorEmbed(message, `The command/category \`${args[0]}\` could not be found.`)
    },
});