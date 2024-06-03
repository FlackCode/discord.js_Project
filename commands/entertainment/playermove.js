const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const {
    getBoard, setBoard, getPlayerMarker, getAIMarker,
    getPlayerTurn, setPlayerTurn, checkWinner, makeAIMove
} = require('../../state')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('playermove')
        .setDescription('Make a move in Tic-Tac-Toe!')
        .addStringOption(option =>
            option.setName('position')
                .setDescription('Position to mark (e.g., topleft, topcenter, etc.)')
                .setRequired(true)
                .addChoices(
                    { name: 'Top Left', value: '0' },
                    { name: 'Top Center', value: '1' },
                    { name: 'Top Right', value: '2' },
                    { name: 'Middle Left', value: '3' },
                    { name: 'Middle Center', value: '4' },
                    { name: 'Middle Right', value: '5' },
                    { name: 'Bottom Left', value: '6' },
                    { name: 'Bottom Center', value: '7' },
                    { name: 'Bottom Right', value: '8' }
                )
        ),

    async execute(interaction) {
        await interaction.deferReply({ ephemeral: false })

        const position = parseInt(interaction.options.getString('position'))
        const board = getBoard()
        const playerMarker = getPlayerMarker()
        const AIMarker = getAIMarker()

        if (board[position] !== '') {
            await interaction.editReply({ content: 'That position is already marked!', ephemeral: false })
            return
        }

        if (!getPlayerTurn()) {
            await interaction.editReply({ content: 'It\'s not your turn!', ephemeral: false })
            return
        }

        board[position] = playerMarker
        setBoard(board)
        setPlayerTurn(false)

        let winner = checkWinner()

        if (winner) {
            let resultMessage = winner === 'Draw' ? 'It\'s a draw!' : `${winner} has won!`
            let embed = new EmbedBuilder()
                .setTitle('Tic-Tac-Toe')
                .setDescription(resultMessage)
                .setColor('Green')

            for (let i = 0; i < board.length; i += 3) {
                embed.addFields(
                    { name: '⠀', value: board[i] || '⠀', inline: true },
                    { name: '⠀', value: board[i + 1] || '⠀', inline: true },
                    { name: '⠀', value: board[i + 2] || '⠀', inline: true }
                )
            }

            await interaction.editReply({ embeds: [embed] })
            return
        }

        makeAIMove()
        setPlayerTurn(true)

        winner = checkWinner()

        let embed = new EmbedBuilder()
            .setTitle('Tic-Tac-Toe')
            .setDescription(winner ? (winner === 'Draw' ? 'It\'s a draw!' : `${winner} has won!`) : 'Player - O, AI - X')
            .setColor('White')

        for (let i = 0; i < board.length; i += 3) {
            embed.addFields(
                { name: '⠀', value: board[i] || '⠀', inline: true },
                { name: '⠀', value: board[i + 1] || '⠀', inline: true },
                { name: '⠀', value: board[i + 2] || '⠀', inline: true }
            )
        }

        await interaction.editReply({ embeds: [embed] })
    }
}