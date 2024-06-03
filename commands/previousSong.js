const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('previous')
    .setDescription('Plays the previous song in the queue, if there is one.'),

    async execute(interaction) {
        await interaction.deferReply({ ephemeral: false })
        const queue = interaction.client.DisTube.getQueue(interaction.guildId)

        if (!queue) {
            await interaction.editReply({content: 'The queue is empty.', ephemeral: false})
        } else {
            const succes = await queue.previous()
            if (succes) {
                await interaction.editReply({content: 'Playing the previous in queue song', ephemeral: false})
            } else {
                await interaction.editReply({ content: 'There is no previous song in the queue.', ephemeral: false })
            }
            
        }
    }
}

