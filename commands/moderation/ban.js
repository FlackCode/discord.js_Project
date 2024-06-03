const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Bans a user with a given id')
    .addStringOption(option => option
        .setName('id')
        .setDescription('Enter the user ID')
        .setRequired(true)
    )
    .addStringOption(option => option
        .setName('reason')
        .setDescription('Specify ban reason.')
        .setRequired(false)
    )
    ,

    async execute(interaction) {
        await interaction.deferReply({ephemeral: false})
        const userID = await interaction.options.getString('id')
        const banReason = await interaction.options.getString('reason') || 'No reason provided.'

        try {
            const banList = await interaction.guild.bans.fetch()
            const isBanned = banList.some(ban => ban.user.id === userID)

            if (!isBanned) {
                await interaction.guild.bans.create(userID, { reason: banReason })
                await interaction.editReply({
                    content: `User <@${userID}> has been banned! Reason: ${banReason}`,
                    ephemeral: false
                })
            } else {
                await interaction.editReply({
                    content: `User <@${userID}> is already banned!`,
                    ephemeral: false
                })
            }
        } catch (error) {
            console.error(error)
            await interaction.editReply({
                content: `Error banning user.`,
                ephemeral: false
            })
        }
    }
}