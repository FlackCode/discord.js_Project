const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

const { getDbFiles, saveDbFiles } = require('../../economyHandler')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('rob')
    .setDescription('Rob someone!')
    .addStringOption(option => option
        .setName('id')
        .setDescription('ID of the person you want to rob')
        .setRequired(true)
    )
    ,

    async execute(interaction) {
        await interaction.deferReply({ ephemeral: false })
        const targetID = await interaction.options.getString('id')

        const userID = interaction.user.id
        const userName = interaction.user.username

        try {
            let balanceData = await getDbFiles()

            let userAccount = balanceData.find(user => user.id === userID)
            let targetAccount = balanceData.find(user => user.id === targetID)

            if (!userAccount) {
                userAccount = {
                    id: userID,
                    name: userName,
                    balance: 0
                }
                balanceData.push(userAccount)
                await saveDbFiles(balanceData)
            }

            if (!targetAccount) {
                await interaction.editReply({ 
                    content: 'User with such ID does not exist or does not have an account in the database.',
                    ephemeral: false
                 })
            } else {
                let randomNumber = Math.floor(Math.random() * 10)
                robberyAmount = parseInt(targetAccount.balance * (randomNumber/100))

                userAccount.balance += robberyAmount
                targetAccount.balance -= robberyAmount

                let embed = new EmbedBuilder()
                .setAuthor({
                    name: `Robbery 🚨`,
                    iconURL: interaction.user.displayAvatarURL()
                })
                embed.addFields({
                    name: `You have robbed $${robberyAmount}!`,
                    value: `Your balance is now $${userAccount.balance}, their balance is now $${targetAccount.balance}.`
                })
                await interaction.editReply({ embeds: [embed], ephemeral: false })
                await saveDbFiles(balanceData)
            }
            
        } catch (error) {
            console.error(error)
            await interaction.editReply({
                content: 'Robbery has failed',
                ephemeral: false
            })
        }
    }
}