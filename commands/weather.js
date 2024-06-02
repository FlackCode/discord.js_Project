const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
require('dotenv').config()


module.exports = {
    data: new SlashCommandBuilder()
    .setName('weather')
    .setDescription('Fetches weather data of certain city!')
    .addStringOption(option => option
        .setName('city')
        .setDescription('Enter city name!')
        .setRequired(true)
    )
    ,

    async execute(interaction) {
        const weatherQuery = interaction.options.getString('city')
        const getWeatherData = async query => {
            const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${process.env.WEATHERAPIKEY}&q=${query}&aqi=no`)
            try {
                const weatherData = await response.json()
                let nameArray = ['Country', 'City', 'Degrees', 'Wind', 'Humidity', 'Weather Type']
                let dataArray = [weatherData.location.country, 
                                weatherData.location.name, 
                                weatherData.current.temp_c, 
                                (weatherData.current.wind_kph/3.6).toFixed(2), 
                                weatherData.current.humidity, 
                                weatherData.current.condition.text]
                let symbolArray = ['', '', '°C', ' m/s', '%', '']
                let embed = new EmbedBuilder()
                .setTitle('Weather Info')

                for (let i = 0; i < nameArray.length; i++) {
                    embed.addFields({
                        name: `${nameArray[i]}: ${dataArray[i]}${symbolArray[i]}`,
                        value: ' '
                    })
                }

                await interaction.reply({embeds: [embed]})
            } catch(error) {
                console.error(error)
                await interaction.reply({content: 'Error Fetching Data!', ephemeral: true})
            }
        }
        getWeatherData(weatherQuery)
    }
}