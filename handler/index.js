const { glob } = require("glob");
const { promisify } = require("util");
const globPromise = promisify(glob);
const mongoose = require("mongoose");
const chalk = require("chalk");

// Pterodactyl panel things
console.log(`"done": "change this part"`);
console.clear();

module.exports = async (client) => {

    // Commands
    const commandFiles = await globPromise(`${process.cwd()}/commands/**/*.js`);
    commandFiles.map((value) => {
        const file = require(value);
        const splitted = value.split("/");
        const directory = splitted[splitted.length - 2];

        if (file.name) {
            const properties = { directory, ...file };
            client.commands.set(file.name, properties);
        }
    });

    console.log(chalk.green.bold('COMMANDS━━━━━━━━━━━━━━━━━━━━━━━━━━┓'));

    const commandsDir = await globPromise(`${process.cwd()}/commands/**/*.js`);
    const commandsArray = [];
    commandsDir.map((value) => {
        const file = require(value);
        let cmdName;
        let cmdOption;
        if (!file?.name) return cmdName = 'No cmd name', cmdOption = '❌';
        else {
            cmdName = file.name;
            cmdOption = '✅';
        }
        if (cmdOption == '✅') {
            commandsArray.push(file);
        }
        console.log(`${chalk.green.bold('┃')} Loaded: ${cmdOption} ${chalk.green.bold('┃')} ${cmdName}.js ${' '.repeat(16 - cmdName.length)}${chalk.green.bold('┃')}`);
    })
    console.log(chalk.green.bold('┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛'));

    // Events
    const eventFiles = await globPromise(`${process.cwd()}/events/*.js`);
    eventFiles.map((value) => require(value));

    // Slash Commands
    const slashCommands = await globPromise(
        `${process.cwd()}/SlashCommands/*/*.js`
    );

    const arrayOfSlashCommands = [];
    slashCommands.map((value) => {
        const file = require(value);
        if (!file?.name) return;
        client.slashCommands.set(file.name, file);

        if (["MESSAGE", "USER"].includes(file.type)) delete file.description;
        arrayOfSlashCommands.push(file);
    });
    client.on("ready", async () => {
        await client.application.commands.set(arrayOfSlashCommands);
    });

    // MongoDB
    const { mongooseConnectionString } = require("../storage/config.json")
    if (!mongooseConnectionString) return;

    mongoose.connect(mongooseConnectionString).then(() => console.log('Connected to MongoDB ✅'));
};
