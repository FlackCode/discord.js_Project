let messageId = null
let endedPolls = new Set()
let currentPage = 1
let currentTriviaAnswer = ''
let gameBoard = [
    '', '', '',
    '', '', '',
    '', '', '',
]
const playerMarker = 'O'
const AIMarker = 'X'
let gameRunning = false
let playerTurn = true

const checkWinner = () => {
    const winCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (let combo of winCombos) {
        let [a, b, c] = combo;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return gameBoard[a];
        }
    }
    return gameBoard.includes('') ? null : 'Draw';
}

const makeAIMove = () => {
    const emptySpots = gameBoard
        .map((value, index) => value === '' ? index : null)
        .filter(value => value !== null)

    if (emptySpots.length === 0) return

    const randomIndex = Math.floor(Math.random() * emptySpots.length)
    gameBoard[emptySpots[randomIndex]] = AIMarker
}

module.exports = {
    getMessageId: () => messageId,
    setMessageId: (id) => { messageId = id },
    isPollEnded: (id) => endedPolls.has(id),
    endPoll: (id) => { endedPolls.add(id) },
    getCurrentPage: () => currentPage,
    setCurrentPage: (page) => { currentPage = page },
    setTriviaAnswer: (answer) => {currentTriviaAnswer = answer},
    getTriviaAnswer: () => currentTriviaAnswer,
    getBoard: () => gameBoard,
    setBoard: (board) => { gameBoard = board},
    getPlayerMarker: () => playerMarker,
    getAIMarker: () => AIMarker,
    setGameStatus: (status) => { gameRunning = status },
    getPlayerTurn: () => playerTurn,
    setPlayerTurn: (turn) => { playerTurn = turn },
    checkWinner,
    makeAIMove
}