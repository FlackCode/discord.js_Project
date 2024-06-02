module.exports = {
    name: 'guildMemberRemove',
    async execute(member) {
        const guild = member.guild
        const welcomeChannel = guild.channels.cache.find(channel => channel.name == 'welcome')

        try {
            await welcomeChannel.send(`Goodbye, ${member.user}`)
        } catch (error) {
            console.error(`Failed to send message in welcome channel: ${error}`)
        }
    }
}
