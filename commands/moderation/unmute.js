const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('unmute')
    .setDescription('Unutes user based on ID')
    .addStringOption(option => option
        .setName('id')
        .setDescription('Enter the user ID')
        .setRequired(true)
    )
    ,

    async execute(interaction) {
        await interaction.deferReply({ephemeral: false})
        const userID = await interaction.options.getString('id')

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

            if(user.roles.cache.has(mutedRole)) {
                await user.roles.remove(mutedRole)
                await interaction.editReply({
                    content: `User <@${userID}> has been unmuted!`,
                    ephemeral: false
                })
            } else {
                await interaction.editReply({
                    content: `User <@${userID}> is not muted.`,
                    ephemeral: false
                })
            }
        } catch (error) {
            console.error(error)
            await interaction.editReply({
                content: `Error unmuting user.`,
                ephemeral: false
            })
        }
    }
}