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
        name: 'add',
        description: 'Adds two numbers together',
        options: [
            {
                name: 'num1',
                description: 'First number',
                type: ApplicationCommandOptionType.Number,
                required: true, // Ensure this option is required
            },
            {
                name: 'num2',
                description: 'Second number',
                type: ApplicationCommandOptionType.Number,
                required: true, // Ensure this option is required
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
