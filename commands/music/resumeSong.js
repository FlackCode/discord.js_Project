const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('resume')
    .setDescription('Resumes the music player.'),

    async execute(interaction) {
        await interaction.deferReply({ ephemeral: false })
        const queue = interaction.client.DisTube.getQueue(interaction.guildId)

        if (!queue) {
            await interaction.editReply({content: 'The queue is empty.', ephemeral: false})
        } else {
            await queue.resume()
            await interaction.editReply({content: `${interaction.user} resumed the music.`, ephemeral: false})
        }
    }
}

