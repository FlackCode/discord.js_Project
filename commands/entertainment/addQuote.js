const { SlashCommandBuilder } = require('discord.js')
const fs = require('node:fs').promises
const path = require('node:path')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('addquote')
    .setDescription('Make a new quote and add it to the file system!')
    .addStringOption(option => option
        .setName('quote')
        .setDescription('Enter your quote')
        .setRequired(true)
        .setMaxLength(64)
        .setMinLength(3)
    )
    ,

    async execute(interaction) {
        const quote = interaction.options.getString('quote')

        try {
            const storagePath = path.join(__dirname, '../storage')
            const quotesFile = 'quotes.json'
            const filePath = path.join(storagePath, quotesFile)
            const storageData = await fs.readFile(filePath)
            const parsedData = storageData.length ? JSON.parse(storageData) : []

            parsedData.push({ quote })
            await fs.writeFile(filePath, JSON.stringify(parsedData))
            await interaction.reply({
                content: 'Quote successfully added!',
                ephemeral: true
            })
        } catch (error) {
            console.error(error)
            await interaction.reply({
                content: 'Failed adding a new quote...',
                ephemeral: true
            })
        }
    }
}