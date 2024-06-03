const fs = require('node:fs').promises
const path = require('node:path')

module.exports = {
    name: 'guildMemberRemove',
    async execute(member) {
        const guild = member.guild
        const welcomeChannel = guild.channels.cache.find(channel => channel.name == 'welcome')

        const storagePath = path.join(__dirname, '../storage')
        const welcomeFile = 'welcome.json'
        const filePath = path.join(storagePath, welcomeFile)
        const welcomeData = await fs.readFile(filePath)
        const parsedData = welcomeData.length ? JSON.parse(welcomeData) : []

        const goodbyeMessageString = parsedData[1].goodbyeMessage

        try {
            await welcomeChannel.send(`${goodbyeMessageString} ${member.user}`)
        } catch (error) {
            console.error(`Failed to send message in welcome channel: ${error}`)
        }
    }
}
