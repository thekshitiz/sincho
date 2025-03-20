require('dotenv').config()
const { Client, GatewayIntentBits } = require('discord.js')

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
        interaction.reply('Ganji is my Mother. I am one of her three dogs. I am 3 days old.')

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
})

// Login to Discord
client.login(process.env.DISCORD_TOKEN)
