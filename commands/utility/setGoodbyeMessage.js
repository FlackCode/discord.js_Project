const { SlashCommandBuilder } = require('discord.js')

const fs = require('node:fs').promises
const path = require('node:path')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('setgoodbye')
    .setDescription('Sets custom goodbye message')
    .addStringOption(option => option
        .setName('message')
        .setDescription('Set the goodbye message for your server')
        .setRequired(true)
    )
    ,

    async execute(interaction) {
        await interaction.deferReply({ephemeral: false})
        const message = await interaction.options.getString('message')

        const storagePath = path.join(__dirname, '../../storage')
        const welcomeFile = 'welcome.json'
        const filePath = path.join(storagePath, welcomeFile)

        try {
            const welcomeData = await fs.readFile(filePath)
            const parsedData = welcomeData.length ? JSON.parse(welcomeData) : []

            parsedData[1].goodbyeMessage = message

            await fs.writeFile(filePath, JSON.stringify(parsedData, null, 4))

            await interaction.editReply({
                content: `Set goodbye message to: "${message} ExampleUser."`,
                ephemeral: false
            })
        } catch (error) {
            console.error(error)
            await interaction.editReply({
                content: `Goodbye message setup failed.`,
                ephemeral: false
            })
        }

    }
}