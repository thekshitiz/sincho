// Load environment variables from .env file
require('dotenv').config()

// Import necessary classes from discord.js
const { REST, Routes, ApplicationCommandOptionType } = require('discord.js')

// Validate required environment variables
const requiredEnvVars = ['DISCORD_TOKEN', 'CLIENT_ID', 'GUILD_ID']
const missingEnvVars = requiredEnvVars.filter(
    (varName) => !process.env[varName]
)

if (missingEnvVars.length > 0) {
    console.error(
        'Error: Missing required environment variables:',
        missingEnvVars.join(', ')
    )
    console.error('Please make sure these variables are set in your .env file')
    process.exit(1)
}

// Debug logging
console.log('Environment check:')
console.log('CLIENT_ID exists:', !!process.env.CLIENT_ID)
console.log('GUILD_ID exists:', !!process.env.GUILD_ID)
console.log('DISCORD_TOKEN exists:', !!process.env.DISCORD_TOKEN)

// Define the slash commands to be registered
const commands = [
    {
        name: 'hello',
        description: 'Responds with a friendly hello',
    },
    {
        name: 'hot',
        description: 'Flip a coin and get heads or tails',
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
        console.log(`Application ID: ${process.env.CLIENT_ID}`)
        console.log(`Guild ID: ${process.env.GUILD_ID}`)

        // Use the REST API to register the commands
        await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
            body: commands,
        })

        console.log('Successfully registered slash (/) commands.')
    } catch (error) {
        if (error.status === 401) {
            console.error(
                'Error: Invalid Discord token. Please check your DISCORD_TOKEN in .env'
            )
        } else if (error.status === 403) {
            console.error(
                "Error: Bot lacks permissions. Please check bot permissions and ensure it's added to the server"
            )
        } else {
            console.error('Error registering commands:', error)
        }
        process.exit(1)
    }
})()
