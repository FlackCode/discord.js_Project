const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with pong!'),

    async execute(interaction) {
        const sent = await interaction.reply(
            { 
                content: 'Pong!', 
                fetchReply: true 
            }
        )
        const timeTaken = sent.createdTimestamp - interaction.createdTimestamp
        await interaction.editReply(`Pong! ${timeTaken}ms`)
    }
}