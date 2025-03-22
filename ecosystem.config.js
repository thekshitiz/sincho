module.exports = {
    apps: [
        {
            name: 'sincho-bot',
            script: 'src/index.js', // Adjust if your main file is different
            instances: 1,
            autorestart: true,
            watch: false,
            max_memory_restart: '200M',
        },
        {
            name: 'discord-ai-bot',
            script: 'index.js',
            watch: true,
            env: {
                NODE_ENV: 'development',
            },
            env_production: {
                NODE_ENV: 'production',
            },
        },
    ],
}
