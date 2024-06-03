const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setrepeatmode')
        .setDescription('Sets the repeat mode of the music.')
        .addIntegerOption(option => option
            .setName('mode')
            .setDescription('Select the repeat mode')
            .addChoices(
                { name: 'Disabled', value: 0 },
                { name: 'Song', value: 1 },
                { name: 'Queue', value: 2 },
            )
            .setRequired(true)
        ),

    async execute(interaction) {
        const mode = await interaction.options.getInteger('mode')
        await interaction.deferReply({ ephemeral: false })
        const queue = interaction.client.DisTube.getQueue(interaction.guildId)
        let modeName

        if (mode == 0) {
            modeName = 'Disabled'
        } else if (mode == 1) {
            modeName = 'Song'
        } else if (mode == 2) {
            modeName = 'Queue'
        }

        if (!queue) {
            await interaction.editReply({content: 'The queue is empty.', ephemeral: false})
        } else {
            try {
                await queue.setRepeatMode(mode)
                await interaction.editReply({content: `Queue repeat mode set to ${modeName}`, ephemeral: false})
            } catch (error) {
                console.error(error)
                await interaction.editReply({ content: 'Failed setting queue repeat mode.', ephemeral: false })
            }
        }
    }
}