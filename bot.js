import { Client, GatewayIntentBits } from "discord.js"
require('dotenv').config()
const fs = require('node:fs')
const path = require('node:path')

const client = new Client(
    {
        intents: [GatewayIntentBits.Guilds] |
        [GatewayIntentBits.GuildMembers] |
        [GatewayIntentBits.MessageContent] |
        [GatewayIntentBits.GuildMessages]
    }
)

const eventPath = path.join(__dirname, 'events')
const eventFiles = fs.readdirSync(eventPath).filter(file => file.endsWith('.js'))

for (const file of eventFiles) {
    const filePath = path.join(eventPath, file)
    const event = require(filePath)
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args))
    } else {
        client.on(event.name, (...args) => event.execute(...args))
    }
}

client.login(process.env.TOKEN)