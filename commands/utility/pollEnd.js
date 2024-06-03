const { SlashCommandBuilder } = require('discord.js')
const { getMessageId, isPollEnded, endPoll } = require('../../state')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('pollend')
    .setDescription('Ends the current poll and displays winner!')
    .addStringOption(option => option
        .setName('message_id')
        .setDescription('The ID of the poll message')
        .setRequired(false)
    ),
    
    async execute(interaction) {
        const messageID = interaction.options.getString('message_id') || getMessageId()
        const channel = interaction.channel

        if (!messageID) {
            await interaction.reply('No poll ID provided!')
            return
        }

        if (isPollEnded(messageID)) {
            await interaction.reply({
                content: 'This poll has already ended.',
                ephemeral: true
            })
            return
        }

        try {
            const pollMessage = await channel.messages.fetch(messageID)
            const reactions = pollMessage.reactions.cache

            let maxReactionCount = 0
            let winningOption = ''

            reactions.forEach((reaction, emoji) => {
                if (reaction.count > maxReactionCount) {
                    maxReactionCount = reaction.count
                    winningOption = emoji
                }
                if (reaction.count == maxReactionCount) {
                    winningOption = null
                }
                if (maxReactionCount == 1) {
                    winningOption = 'none'
                }
            })

            endPoll(messageID)

            if (winningOption == null) {
                await interaction.reply('Poll ended in a tie!')
            } else if(winningOption == 'none') {
                await interaction.reply('No reactions were set, poll ended!')
            } else {
                await interaction.reply(`Poll option ${winningOption} has won with ${maxReactionCount} votes!`)
            }
            
        } catch(error) {
            console.error(error)
            await interaction.reply('Error fetching poll message!')
        }
    }
}