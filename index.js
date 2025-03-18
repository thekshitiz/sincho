require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js'); 

// Create a new client instance with necessary intents
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent // Required for reading messages
    ]
});

const prefix = "/";

client.once('ready', () => {
    console.log('Bot is online!');
});

client.on('messageCreate', (message) => {
    if (message.author.bot) return; // Ignore bot messages

    console.log(`Received message: '${message.content}'`);

    if (message.content.startsWith(`${prefix}hello`)) {
        const firstName = message.author.username; // Get sender's first name (Discord username)
        console.log(`Responding with Hello, ${firstName}!`);
        message.channel.send(`Hello, ${firstName}!`);
    }
});

// Login to Discord
client.login(process.env.DISCORD_TOKEN);
