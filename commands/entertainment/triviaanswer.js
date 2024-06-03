const { SlashCommandBuilder } = require('discord.js')
const { getTriviaAnswer, setTriviaAnswer } = require('../../state')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('answertrivia')
    .setDescription('Write the answer to the trivia question')
    .addStringOption(option => option
        .setName('answer')
        .setDescription('Write your answer to the trivia')
        .setRequired(true)
    )
    ,

    async execute(interaction) {
        await interaction.deferReply({ephemeral: false})
        const userAnswer = await interaction.options.getString('answer')
        const triviaAnswer = getTriviaAnswer()

        if (userAnswer.toLowerCase() == triviaAnswer.toLowerCase()) {
            try {
                await interaction.editReply({
                    content: `The answer "${userAnswer}" is correct, congratulations!`,
                    ephemeral: false
                })
                setTriviaAnswer('')
            } catch (error) {
                console.error(error)
                await interaction.editReply({
                    content: `Error fetching the answer`,
                    ephemeral: false
                })
            }
        } else if(triviaAnswer == '') {
            await interaction.editReply({
                content: `There is no trivia question set.`,
                ephemeral: false
            })
        } else {
            await interaction.editReply({
                content: `The answer "${userAnswer}" is not correct, the correct answer is: ${triviaAnswer}`,
                ephemeral: false
            })
        }
    }
}