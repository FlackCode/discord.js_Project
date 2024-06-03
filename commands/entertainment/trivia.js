const { SlashCommandBuilder } = require('discord.js')
require('dotenv').config()

const { setTriviaAnswer } = require('../../state')

const getTriviaData = async type => {
    const response = await fetch(`https://api.api-ninjas.com/v1/trivia?category=${type}`, {
        headers: {
            'X-Api-Key': process.env.JOKEAPIKEY
        }
    })
    try {
        let triviaData = await response.json()
        let triviaArray = []
        triviaArray.push(triviaData[0].question)
        triviaArray.push(triviaData[0].answer)
        return triviaArray
    } catch (error) {
        console.error(error)
    }
} 

module.exports = {
    data: new SlashCommandBuilder()
    .setName('trivia')
    .setDescription('Sends a random trivia question based on selected topic')
    .addStringOption(option => option
        .setName('type')
        .setDescription('Type of question.')
        .setRequired(true)
        .addChoices(
        { name: 'music', value: 'music' },
        { name: 'math', value: 'mathematics' },
        { name: 'general', value: 'general' },
        { name: 'geography', value: 'geography' }
        )
    )
    ,

    async execute(interaction) {
        const type = await interaction.options.getString('type')
        const triviaData = await getTriviaData(type)
        const triviaQuestion = triviaData[0]
        const triviaAnswer = triviaData[1]
        setTriviaAnswer(triviaAnswer)
        await interaction.reply(triviaQuestion + ' (use /answertrivia to answer)')
    }
}