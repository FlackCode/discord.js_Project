const { SlashCommandBuilder } = require('discord.js')
require('dotenv').config()

async function getJoke() {
    const response = await fetch('https://api.api-ninjas.com/v1/jokes?limit=1', {
        headers: {
            'X-Api-Key': process.env.JOKEAPIKEY
        }
    })
    try {
        let jokeData = await response.json()
        return jokeData[0].joke
    } catch (error) {
        console.error(error)
    }
}

module.exports = {
    data: new SlashCommandBuilder()
    .setName('joke')
    .setDescription('Replies with a random joke.'),

    async execute(interaction) {
        await interaction.reply(
            { 
                content: 'Loading joke...', 
                fetchReply: true 
            }
        )
        let joke = await getJoke()
        await interaction.editReply({ content: joke })
    }
}