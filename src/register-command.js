// Load environment variables from .env file
require('dotenv').config()

// Import necessary classes from discord.js
const { REST, Routes, ApplicationCommandOptionType } = require('discord.js')

// Define the slash commands to be registered
const commands = [
    {
        name: 'hello',
        description: 'Responds with a friendly hello',
    },
    {
        name: 'ping',
        description: 'Responds with Pong!',
    },
    {
        name: 'whoisganji', // Command name must be lowercase
        description: 'Who is Ganji?',
    },
    {
        name: 'remindme',
        description: 'Remind me to do something',
        options: [
            {
                name: 'message',
                description: 'What do you want to be reminded of?',
                type: ApplicationCommandOptionType.String,
                required: true,
            },
            {
                name: 'time',
                description: 'When do you want to be reminded?',
                type: ApplicationCommandOptionType.Number,
                required: true,
            },
            {
                name: 'unit',
                description: 'Unit of time',
                type: ApplicationCommandOptionType.String,
                required: true,
                choices: [
                    { name: 'seconds', value: 'seconds' },
                    { name: 'minutes', value: 'minutes' },
                    { name: 'hours', value: 'hours' },
                    { name: 'days', value: 'days' },
                    { name: 'weeks', value: 'weeks' },
                    { name: 'months', value: 'months' },
                ],
            },
        ],
    },
    {
        name: 'add',
        description: 'Adds two numbers together',
        options: [
            {
                name: 'num1',
                description: 'First number',
                type: ApplicationCommandOptionType.Number,
                required: true,
            },
            {
                name: 'num2',
                description: 'Second number',
                type: ApplicationCommandOptionType.Number,
                required: true,
            },
        ],
    },
    {
        name: 'convert',
        description: 'Convert between GBP and NPR',
        options: [
            {
                name: 'amount',
                description: 'Amount to convert',
                type: ApplicationCommandOptionType.Number,
                required: true,
            },
            {
                name: 'currency',
                description: 'Currency to convert from (GBP/NPR)',
                type: ApplicationCommandOptionType.String,
                required: true,
                choices: [
                    { name: 'GBP', value: 'GBP' },
                    { name: 'NPR', value: 'NPR' },
                ],
            },
        ],
    },
]

// Create a new REST instance and set the bot token
const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN)

// Register the slash commands with Discord
;(async () => {
    try {
        console.log('Registering slash (/) commands.')

        // Use the REST API to register the commands
        await rest.put(
            Routes.applicationCommands(
                process.env.CLIENT_ID,
                process.env.GUILD_ID
            ),
            { body: commands }
        )

        console.log('Successfully registered slash (/) commands.')
    } catch (error) {
        console.error(error)
    }
})()
