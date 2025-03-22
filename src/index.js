require('dotenv').config()
const { Client, GatewayIntentBits } = require('discord.js')

// Debug logging for environment variables
console.log('Environment check:')
console.log('NODE_ENV:', process.env.NODE_ENV)
console.log('PWD:', process.env.PWD)
console.log('All environment variables:', Object.keys(process.env))
console.log('DISCORD_TOKEN exists:', !!process.env.DISCORD_TOKEN)
console.log(
    'DISCORD_TOKEN length:',
    process.env.DISCORD_TOKEN ? process.env.DISCORD_TOKEN.length : 0
)

// Create a new client instance with necessary intents
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent, // Required for reading messages
    ],
})

const prefix = '/'

client.once('ready', () => {
    console.log('Bot is online!')
})

client.on('messageCreate', (message) => {
    if (message.author.bot) return // Ignore bot messages

    console.log(`Received message: '${message.content}'`)

    if (message.content.startsWith(`${prefix}hello`)) {
        const firstName = message.author.username // Get sender's first name (Discord username)
        console.log(`Responding with Hello, ${firstName}!`)
        message.channel.send(`Hello, ${firstName}!`)
    }
})

client.on('ready', (c) => {
    console.log(`${c.user.tag} is now online!`)
})

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return

    if (interaction.commandName === 'hello') {
        interaction.reply('Hey there!')
    }

    if (interaction.commandName === 'ping') {
        interaction.reply('Pong!')
    }

    if (interaction.commandName === 'whoisganji') {
        interaction.reply(
            'Ganji is my Mother. I am one of her three dogs. I am 3 days old.'
        )
    }

    if (interaction.commandName === 'add') {
        const num1 = interaction.options.getNumber('num1')
        const num2 = interaction.options.getNumber('num2')
        const sum = num1 + num2
        interaction.reply(`The sum of ${num1} and ${num2} is ${sum}`)
    }

    if (interaction.commandName === 'convert') {
        const amount = interaction.options.getNumber('amount')
        const fromCurrency = interaction.options.getString('currency')
        const toCurrency = fromCurrency === 'GBP' ? 'NPR' : 'GBP'
        const apiKey = process.env.EXCHANGE_RATE_API_KEY
        const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency}`

        try {
            const response = await fetch(url)
            const data = await response.json()
            const exchangeRate = data.conversion_rates[toCurrency]
            const convertedAmount = amount * exchangeRate
            interaction.reply(
                `${amount} ${fromCurrency} is equal to ${convertedAmount.toFixed(
                    2
                )} ${toCurrency}`
            )
        } catch (error) {
            console.error('Error fetching exchange rate data:', error)
            interaction.reply('There was an error converting the currency')
        }
    }

    if (interaction.commandName === 'remindme') {
        const message = interaction.options.getString('message')
        const time = interaction.options.getNumber('time')
        const unit = interaction.options.getString('unit') // hours, days, weeks, months

        // Convert the time to milliseconds
        let timeInMs
        switch (unit) {
            case 'seconds':
                timeInMs = time * 1000
                break
            case 'minutes':
                timeInMs = time * 60 * 1000
                break
            case 'hours':
                timeInMs = time * 60 * 60 * 1000
                break
            case 'days':
                timeInMs = time * 24 * 60 * 60 * 1000
                break
            case 'weeks':
                timeInMs = time * 7 * 24 * 60 * 60 * 1000
                break
            case 'months':
                timeInMs = time * 30 * 24 * 60 * 60 * 1000 // Approximation
                break
            default:
                interaction.reply('Invalid time unit')
                return
        }

        const reminderTime = new Date(Date.now() + timeInMs)
        const reminderTimeStr = reminderTime.toLocaleString()
        interaction.reply(
            `I will remind you in ${time} ${unit} (${reminderTimeStr}) with the message: ${message}`
        )

        // Set a timeout to send the reminder
        setTimeout(() => {
            interaction.followUp(`Reminder: ${message}`)
        }, timeInMs)
    }
    if (interaction.commandName === 'hot') {
        const result = Math.random() < 0.5 ? 'heads' : 'tails'
        interaction.reply(`The coin landed on ${result}!`)
    }
})

// Login to Discord
client.login(process.env.DISCORD_TOKEN)
