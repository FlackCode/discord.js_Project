const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('mute')
    .setDescription('Mutes user based on ID')
    .addStringOption(option => option
        .setName('id')
        .setDescription('Enter the user ID')
        .setRequired(true)
    )
    .addStringOption(option => option
        .setName('reason')
        .setDescription('Specify mute reason.')
        .setRequired(false)
    )
    ,

    async execute(interaction) {
        await interaction.deferReply({ephemeral: false})
        const userID = await interaction.options.getString('id')
        const muteReason = await interaction.options.getString('reason') || 'No reason provided.'

        try {
            const user = await interaction.guild.members.fetch(userID)
            const mutedRole = '1247198020794318888'

            if (!user) {
                await interaction.editReply({
                    content: `User with ID ${userID} does not exist.`,
                    ephemeral: true
                })
                return
            }

            if(!user.roles.cache.has(mutedRole)) {
                await user.roles.add(mutedRole)
                await interaction.editReply({
                    content: `User <@${userID}> has been muted! Reason: ${muteReason}`,
                    ephemeral: false
                })
            } else {
                await interaction.editReply({
                    content: `User <@${userID}> is already muted.`,
                    ephemeral: false
                })
            }
        } catch (error) {
            console.error(error)
            await interaction.editReply({
                content: `Error muting user.`,
                ephemeral: false
            })
        }
    }
}