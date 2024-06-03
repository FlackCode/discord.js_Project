const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

const { getBoard, setBoard, setGameStatus, setPlayerTurn } = require('../../state')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('tictactoe')
    .setDescription('Play tictactoe against AI!'),

    async execute(interaction) {
        await interaction.deferReply({ephemeral: false})

        setBoard([
            '', '', '',
            '', '', '',
            '', '', '',
        ])
        setGameStatus(true)
        setPlayerTurn(true)

        let board = getBoard()

        let embed = new EmbedBuilder()
        .setTitle('Tic-tac-toe')
        .setDescription('Player - O, AI - X')
        .setColor('White')

        for (let i = 0; i < board.length; i += 3) {
            embed.addFields(
                { name: '⠀', value: board[i] || '⠀', inline: true },
                { name: '⠀', value: board[i + 1] || '⠀', inline: true },
                { name: '⠀', value: board[i + 2] || '⠀', inline: true }
            );
        }

        await interaction.editReply({ embeds: [embed] })

    }
}