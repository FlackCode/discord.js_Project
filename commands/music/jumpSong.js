const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('jump')
    .setDescription('Plays the selected song in queue, if there is one.')
    .addIntegerOption(option => option
        .setName('queueposition')
        .setDescription('Enter the position of the song in the queue')
        .setRequired(true)
    )
    ,

    async execute(interaction) {
        const number = interaction.options.getInteger('queueposition')
        await interaction.deferReply({ ephemeral: false })
        const queue = interaction.client.DisTube.getQueue(interaction.guildId)

        if (!queue) {
            await interaction.editReply({content: 'The queue is empty.', ephemeral: false})
        } else if (number < 1 || number > queue.songs.length) {
            await interaction.editReply({ content: 'Invalid position in the queue.', ephemeral: false })
        } else {
            try {
                await queue.jump(number - 1)
                await interaction.editReply({ content: 'Playing selected song.', ephemeral: false })
            } catch (error) {
                console.error(error)
                await interaction.editReply({ content: 'There was an error trying to jump to the selected song.', ephemeral: false })
            }
        }
    }
}

