const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
require('dotenv').config()

module.exports = {
    data: new SlashCommandBuilder()
    .setName('queue')
    .setDescription('Shows song queue.'),

    async execute(interaction) {
        await interaction.deferReply({ephemeral: false})
        const queue = interaction.client.DisTube.getQueue(interaction.guildId)

        if (!queue) {
            await interaction.editReply({content: 'Queue is empty!', ephemeral: true})
        } else {
            let embed = new EmbedBuilder()
            .setTitle('Queue:')

            queue.songs.map((song, index) => {
                embed.addFields({
                    name: `${index + 1}. ${song.name} - ${song.formattedDuration}`,
                    value: ' '
                })
            })

            await interaction.editReply({embeds: [embed], ephemeral: false})
        }
    }
}