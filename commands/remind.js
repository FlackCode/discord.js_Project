const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('remindme')
    .setDescription('Set a reminder for yourself!')
    .addIntegerOption(option => option
        .setName('time')
        .setDescription('Justify time in minutes')
        .setRequired(true)
    )
    .addStringOption(option => option
        .setName('message')
        .setDescription('Justify reminder message')
        .setRequired(true)
    ),

    async execute(interaction) {
        const time = interaction.options.getInteger('time')
        const message = interaction.options.getString('message')

        const timeToMs = time * 60 * 1000

        await interaction.reply({
            content: `Set reminder for ${time} minutes. Reminder content: ${message}`,
            ephemeral: true
        })

        setTimeout(() => {
            interaction.followUp({
                content: `Reminder for <@${interaction.user.id}>: ${message}`,
                ephemeral: true
            })
        }, timeToMs)
    }
}