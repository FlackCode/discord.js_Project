const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

const { getDbFiles, saveDbFiles } = require('../../economyHandler')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('balance')
    .setDescription('Shows you your balance'),

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

            let embed = new EmbedBuilder()
                .setAuthor({
                    name: `${userAccount.name}`,
                    iconURL: interaction.user.displayAvatarURL()
                })
                embed.addFields(
                    {
                        name: `Balance: `,
                        value: ' ',
                        inline: true
                    },
                    {
                        name: `$${userAccount.balance}`,
                        value: ' ',
                        inline: true
                    }
            )
            await interaction.editReply({ embeds: [embed], ephemeral: false })
        } catch (error) {
            console.error(error)
            await interaction.editReply({
                content: 'Failed to fetch balance.',
                ephemeral: false
            })
        }
    }
}