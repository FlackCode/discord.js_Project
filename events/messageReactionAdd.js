const { getMessageId } = require('../state')
module.exports = {
    name: 'messageReactionAdd',

    async execute(reaction, user) {
        if (user.bot) return
        if (reaction.partial) {
            try {
                await reaction.fetch()
            } catch (error) {
                console.error('Something went wrong when fetching the reaction: ', error)
                return
            }
        }
        const messageID = getMessageId()
        if (reaction.message.id === messageID) {
            const roleIds = {
                '🔴': '1246723521732935700',
                '🟢': '1246723566133841970',
                '🔵': '1246723598173868137',
            }
    
            const roleId = roleIds[reaction.emoji.name]
            const member = await reaction.message.guild.members.fetch(user.id)
    
            if (roleId) {
                await member.roles.add(roleId)
            }
        }
    }
}