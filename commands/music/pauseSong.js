const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('pause')
    .setDescription('Pauses the music player.'),

    async execute(interaction) {
        await interaction.deferReply({ ephemeral: false })
        const queue = interaction.client.DisTube.getQueue(interaction.guildId)

        if (!queue) {
            await interaction.editReply({content: 'Nothing is currently playing.', ephemeral: false})
        } else {
            await queue.pause()
            await interaction.editReply({content: `${interaction.user} paused the music.`, ephemeral: false})
        }
    }
}

