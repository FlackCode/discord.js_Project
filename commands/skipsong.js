const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('skip')
    .setDescription('Skips current song.'),

    async execute(interaction) {
        await interaction.deferReply({ ephemeral: false })
        const queue = interaction.client.DisTube.getQueue(interaction.guildId)

        if (!queue) {
            await interaction.editReply({content: 'No songs in queue to skip', ephemeral: false})
        }

        try {
            await queue.skip()
            await interaction.editReply({content: `${interaction.user} skipped the current song.`, ephemeral: false})
        } catch (error) {
            console.error(error)
            await interaction.editReply({content: 'Error skipping the song, there is only 1 song in queue.', ephemeral: false})
        }
    }
}

