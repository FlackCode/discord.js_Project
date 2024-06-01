module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log(`Client started as ${client.user.tag}`)
    }
}