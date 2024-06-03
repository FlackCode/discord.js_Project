const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('shuffle')
    .setDescription('Shuffles the queue.'),

    async execute(interaction) {
        await interaction.deferReply({ ephemeral: false })
        const queue = interaction.client.DisTube.getQueue(interaction.guildId)

        if (!queue) {
            await interaction.editReply({content: 'The queue is empty.', ephemeral: false})
        } else {
            try {
                await queue.shuffle()
                await interaction.editReply({content: 'Queue songs shuffled!', ephemeral: false})
            } catch (error) {
                console.error(error)
                await interaction.editReply({ content: 'Error shuffling the queue.', ephemeral: false })
            }
        }
    }
}

