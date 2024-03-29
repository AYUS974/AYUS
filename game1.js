


const playerNamesDiv = document.getElementById('playerNames');
const backButton = document.getElementById('backButton');
const startButton = document.getElementById('sbtn');
const gameDiv = document.getElementById('game');
const board = document.getElementById('board');
const message = document.getElementById('message');
const winnerMessage = document.getElementById('winnerMessage');
const restartButton = document.getElementById('btn');
const backToMainButton = document.getElementById('backToMainButton');

let currentPlayer;
let player1Name;
let player2Name;
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameEnded = false;

function showPlayerNames() {
    playerNamesDiv.style.display = 'flex';
    backButton.style.display = 'none'; // Hide back button
    startButton.style.display = 'inline-block';
    gameDiv.style.display = 'none';
}

function startGame() {
    player1Name = document.getElementById('player1').value || 'Player 1';
    player2Name = document.getElementById('player2').value || 'Player 2';
    currentPlayer = 'X';

    playerNamesDiv.style.display = 'none';
    backButton.style.display = 'inline-block';
    startButton.style.display = 'none';
    gameDiv.style.display = 'block';
    message.innerText = `${player1Name}'s turn`;
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return gameBoard[a];
        }
    }

    if (gameBoard.includes('')) {
        return null; // Game is still ongoing
    } else {
        return 'T'; // Tie
    }
}

function handleCellClick(cell) {
    const cellIndex = cell.getAttribute('data-cell-index');
    if (gameBoard[cellIndex] !== '' || gameEnded) return;

    gameBoard[cellIndex] = currentPlayer;
    cell.innerText = currentPlayer;

    const winner = checkWinner();
    if (winner) {
        if (winner === 'T') {
            message.innerText = "It's a tie!";
        } else {
            message.innerText = `Player ${winner} wins!`;
        }
        gameEnded = true;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        message.innerText = `Player ${currentPlayer}'s turn`;
    }
}

function handleRestartClick() {
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameEnded = false;
    message.innerText = "Player X's turn";

    document.querySelectorAll('.cell').forEach(cell => {
        cell.innerText = '';
    });
}

function backToMainPage() {
    window.location.href = 'index.html#game';
}

backButton.addEventListener('click', showPlayerNames);
startButton.addEventListener('click', startGame);
board.addEventListener('click', (e) => {
    if (e.target.classList.contains('cell')) {
        handleCellClick(e.target);
    }
});
restartButton.addEventListener('click', handleRestartClick);
backToMainButton.addEventListener('click', backToMainPage);
showPlayerNames(); // Initially show player names
