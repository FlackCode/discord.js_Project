const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const { setMessageId, setCurrentPage } = require('../../state')
const fs = require('node:fs').promises
const path = require('node:path')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('quotes')
    .setDescription('Shows a list of all quotes'),

    async execute(interaction) {
        await interaction.deferReply({ephemeral: true})
        const { channel } = await interaction
        try {
            const storagePath = path.join(__dirname, '../../storage')
            const quotesFile = 'quotes.json'
            const filePath = path.join(storagePath, quotesFile)
            const storageData = await fs.readFile(filePath)
            const parsedData = storageData.length ? JSON.parse(storageData) : []
            const quotes = parsedData.map(item => item.quote)
            const arrowEmojis = ['⬅️', '➡️']

            let embed = new EmbedBuilder().setTitle('Quotes')
            let currentPage = 1

            if (quotes.length == 0) {
                embed.addFields({
                    name: `No quotes yet...`,
                    value: ' '
                })
            } else {
                const startIndex = (currentPage - 1) * 5
                const endIndex = Math.min(startIndex + 5, quotes.length)

                for (let i = startIndex; i < endIndex; i++) {
                    embed.addFields({ name: `#${i + 1}: ${quotes[i]}`, value: ' ' })
                }

            }

            const message = await channel.send({
                embeds: [embed]
            })

            if (quotes.length > 5) {
                for (const arrow of arrowEmojis) {
                    await message.react(arrow)
                }
            }

            setMessageId(message.id)
            setCurrentPage(1)

            await interaction.editReply({ content: 'Quotes sent!', ephemeral: true })
        } catch (error) {
            console.error(error)
            await interaction.reply({
                content: 'Failed displaying quotes...',
                ephemeral: true
            })
        }
    }
}