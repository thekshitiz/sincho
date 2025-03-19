require('dotenv').config();
const { REST, Routes } = require('discord.js');

const commands = [
    {
        name: 'hello',
        description: 'Responds with a friendly hello'},
        {
            name: 'ping',
            description: 'Responds with Pong!', 
        
        }
];

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
    try {
        console.log('Registering slash (/) commands.');

        await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            { body: commands },
        );

        console.log('Successfully registered slash (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();