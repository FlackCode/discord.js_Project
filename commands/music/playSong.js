const { SlashCommandBuilder, EmbedBuilder, channelLink } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Plays a song in your voice channel')
        .addStringOption(option =>
            option.setName('song')
                .setDescription('The URL or name of the song')
                .setRequired(true)),
    
    async execute(interaction) {
        interaction.deferReply({ ephemeral: true })
        const song = interaction.options.getString('song')

        if (!interaction.member.voice.channel) {
            return interaction.reply('You need to be in a voice channel to play music!')
        }       

        try {
            await interaction.client.DisTube.play(interaction.member.voice.channel, song, {
                member: interaction.member,
                textChannel: interaction.channel,
                interaction
            })

            await interaction.editReply({
                content: 'Song added to queue.',
                ephemeral: true
            })
        } catch (error) {
            console.error(error)
            await interaction.editReply({
                content: 'An error occurred while trying to play the song',
                ephemeral: true
            })
        }
    }
}