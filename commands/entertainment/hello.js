const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('hello')
    .setDescription('Returns "Hello!"'),

    async execute(interaction) {
        await interaction.reply('Hello!')
    }
}