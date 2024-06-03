const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('isbanned')
    .setDescription('Checks if a user is banned')
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
            const banList = await interaction.guild.bans.fetch()
            const isBanned = banList.some(ban => ban.user.id === userID)
            if (isBanned) {
                await interaction.editReply({
                    content: `User <@${userID}> is banned.`,
                    ephemeral: false
                })
            } else {
                await interaction.editReply({
                    content: `User <@${userID}> is not banned!`,
                    ephemeral: false
                })
            }
            
        } catch (error) {
            console.error(error)
            await interaction.editReply({
                content: `Error fetching banned users!`,
                ephemeral: false
            })
        }
    }
}