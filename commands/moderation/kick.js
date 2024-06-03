const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Kicks user based on ID')
    .addStringOption(option => option
        .setName('id')
        .setDescription('Enter the user ID')
        .setRequired(true)
    )
    .addStringOption(option => option
        .setName('reason')
        .setDescription('Specify kick reason.')
        .setRequired(false)
    )
    ,

    async execute(interaction) {
        await interaction.deferReply({ephemeral: false})
        const userID = await interaction.options.getString('id')
        const kickReason = await interaction.options.getString('reason') || 'No reason provided.'

        try {
            const userList = await interaction.guild.members.fetch()
            const isMember = userList.some(member => member.user.id === userID)

            if (isMember) {
                await interaction.guild.members.kick(userID)
                await interaction.editReply({
                    content: `User <@${userID}> has been kicked! Reason: ${kickReason}`,
                    ephemeral: false
                })
            } else {
                await interaction.editReply({
                    content: `User <@${userID}> is not a member of this guild.`,
                    ephemeral: false
                })
            }
        } catch (error) {
            console.error(error)
            await interaction.editReply({
                content: `Error kicking user.`,
                ephemeral: false
            })
        }
    }
}