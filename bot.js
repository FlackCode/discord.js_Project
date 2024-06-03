import { Client, GatewayIntentBits, Partials } from "discord.js"
import { EmbedBuilder } from "discord.js"
import { DisTube } from 'distube'
require('dotenv').config()
const fs = require('node:fs')
const path = require('node:path')

const client = new Client(
    {
        intents: [GatewayIntentBits.Guilds] |
        [GatewayIntentBits.GuildMembers] |
        [GatewayIntentBits.MessageContent] |
        [GatewayIntentBits.GuildMessages] |
        [GatewayIntentBits.GuildMessageReactions] |
        [GatewayIntentBits.GuildVoiceStates]
        ,
        partials: [Partials.Message, Partials.Reaction, Partials.Channel]
    }
)

client.DisTube = new DisTube(client, 
    {
        leaveOnStop: false,
        emitNewSongOnly: true,
        emitAddSongWhenCreatingQueue: false,
        emitAddListWhenCreatingQueue: false
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

client.DisTube.on('playSong', (queue, song) => {
    const embed = new EmbedBuilder()
        .setTitle('Playing song!')
        .setDescription(`Now playing: ${song.name}`)
        .setColor('White')

    queue.textChannel.send({ embeds: [embed] })
})

client.login(process.env.TOKEN)