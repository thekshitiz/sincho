module.exports = {
    apps: [
        {
            name: 'discord-ai-bot',
            script: 'src/index.js',
            instances: 1,
            autorestart: true,
            watch: false,
            max_memory_restart: '200M',
            env: {
                NODE_ENV: 'development',
            },
            env_production: {
                NODE_ENV: 'production',
            },
        },
    ],
}
