const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('stop')
    .setDescription('Stops the bot and clears queue.'),

    async execute(interaction) {
        await interaction.deferReply({ ephemeral: false })
        const queue = interaction.client.DisTube.getQueue(interaction.guildId)

        if (!queue) {
            await interaction.editReply({content: 'No songs in the queue.', ephemeral: false})
        } else {
            await queue.stop()
            await interaction.editReply({content: `${interaction.user} stopped the music.`, ephemeral: false})
        }
    }
}

