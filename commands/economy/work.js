const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

const { getDbFiles, saveDbFiles } = require('../../economyHandler')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('work')
    .setDescription('Work to add to your balance!'),

    async execute(interaction) {
        await interaction.deferReply({ ephemeral: false })

        const userID = interaction.user.id
        const userName = interaction.user.username

        try {
            let balanceData = await getDbFiles()

            let userAccount = balanceData.find(user => user.id === userID)

            if (!userAccount) {
                userAccount = {
                    id: userID,
                    name: userName,
                    balance: 0
                }
                balanceData.push(userAccount)
                await saveDbFiles(balanceData)
            }

            let randomNumber = Math.floor(Math.random() * 100)
            userAccount.balance += randomNumber
            await saveDbFiles(balanceData)

            let embed = new EmbedBuilder()
            .setAuthor({
                name: `Work`,
                iconURL: interaction.user.displayAvatarURL()
            })
            embed.addFields({
                name: `You have earned $${randomNumber}!`,
                value: `Your balance is now $${userAccount.balance}.`
            })
            await interaction.editReply({ embeds: [embed], ephemeral: false })
        } catch (error) {
            console.error(error)
            await interaction.editReply({
                content: 'Work has failed',
                ephemeral: false
            })
        }
    }
}