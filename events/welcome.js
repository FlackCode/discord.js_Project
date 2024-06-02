module.exports = {
    name: 'guildMemberAdd',
    async execute(client) {
        const welcomeChannel = await client.guild.channels.cache.find(channel => channel.name === 'welcome')
        await welcomeChannel.fetch()
        welcomeChannel.send(`Welcome to the test server ${client.user}`)
    }
}