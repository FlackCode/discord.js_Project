const { getMessageId, getCurrentPage, setCurrentPage } = require('../state')
const { EmbedBuilder } = require('discord.js')
const fs = require('fs').promises
const path = require('path')

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
            const arrowEmojis = ['⬅️', '➡️']
            const currentPage = getCurrentPage()
            
            if (arrowEmojis.includes(reaction.emoji.name)) {
                const storagePath = path.join(__dirname, '../storage')
                const quotesFile = 'quotes.json'
                const filePath = path.join(storagePath, quotesFile)

                try {
                    const storageData = await fs.readFile(filePath)
                    const parsedData = storageData.length ? JSON.parse(storageData) : []
                    const quotes = parsedData.map(item => item.quote)

                    let newPage = currentPage

                    if (reaction.emoji.name === '⬅️') {
                        if (currentPage > 1) {
                            newPage--
                        }
                    } else if (reaction.emoji.name === '➡️') {
                        if (currentPage < Math.ceil(quotes.length / 5)) {
                            newPage++
                        }
                    }

                    setCurrentPage(newPage)

                    let embed = new EmbedBuilder().setTitle('Quotes')
                    const startIndex = (newPage - 1) * 5
                    const endIndex = Math.min(startIndex + 5, quotes.length)

                    for (let i = startIndex; i < endIndex; i++) {
                        embed.addFields({ name: `#${i + 1}: ${quotes[i]}`, value: ' ' })
                    }

                    await reaction.message.edit({ embeds: [embed] })
                    await reaction.users.remove(user.id)

                } catch (error) {
                    console.error('Error updating quotes message: ', error)
                }
            } else {
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
}