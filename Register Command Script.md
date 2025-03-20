# Register Command Script

This script registers slash commands for a Discord bot using the Discord.js library.

## Overview

The script performs the following tasks:

1. Loads environment variables from a `.env` file.
2. Imports necessary classes from the Discord.js library.
3. Defines the slash commands to be registered.
4. Creates a new REST instance and sets the bot token.
5. Registers the slash commands with Discord using the REST API.

## Code Explanation

### Load Environment Variables

```javascript
require('dotenv').config()
```
