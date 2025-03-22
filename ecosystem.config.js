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
    ],
}
