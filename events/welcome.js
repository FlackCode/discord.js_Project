const fs = require('node:fs').promises
const path = require('node:path')

module.exports = {
    name: 'guildMemberAdd',
    async execute(client) {
        const storagePath = path.join(__dirname, '../storage')
        const welcomeFile = 'welcome.json'
        const filePath = path.join(storagePath, welcomeFile)
        const welcomeData = await fs.readFile(filePath)
        const parsedData = welcomeData.length ? JSON.parse(welcomeData) : []

        const welcomeMessageString = parsedData[0].welcomeMessage

        const welcomeChannel = await client.guild.channels.cache.find(channel => channel.name === 'welcome')
        await welcomeChannel.fetch()
        welcomeChannel.send(`${welcomeMessageString} ${client.user}`)
    }
}