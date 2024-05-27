// script.js
const cardsArray = [
    { name: 'A', img: 'A' },
    { name: 'A', img: 'A' },
    { name: 'B', img: 'B' },
    { name: 'B', img: 'B' },
    { name: 'C', img: 'C' },
    { name: 'C', img: 'C' },
    { name: 'D', img: 'D' },
    { name: 'D', img: 'D' },
    { name: 'E', img: 'E' },
    { name: 'E', img: 'E' },
    { name: 'F', img: 'F' },
    { name: 'F', img: 'F' },
    { name: 'G', img: 'G' },
    { name: 'G', img: 'G' },
    { name: 'H', img: 'H' },
    { name: 'H', img: 'H' }
];

let gameBoard = document.getElementById('gameBoard');
let gameMessage = document.getElementById('gameMessage');
let timerDisplay = document.getElementById('timer');
let resetButton = document.getElementById('resetButton');
let playerNameInput = document.getElementById('playerName');
let historyList = document.getElementById('historyList');
let cardChosen = [];
let cardChosenId = [];
let cardsWon = [];
let timer;
let timeElapsed = 0;
let timerStarted = false;

// Shuffle the cards
cardsArray.sort(() => 0.5 - Math.random());

function createBoard() {
    gameBoard.innerHTML = '';
    cardsArray.forEach((item, index) => {
        let card = document.createElement('div');
        card.setAttribute('class', 'card');
        card.setAttribute('data-id', index);
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });
}

function flipCard() {
    if (!timerStarted) {
        startTimer();
        timerStarted = true;
    }

    let cardId = this.getAttribute('data-id');
    if (!this.classList.contains('flipped') && cardChosenId.length < 2) {
        cardChosen.push(cardsArray[cardId].name);
        cardChosenId.push(cardId);
        this.innerHTML = cardsArray[cardId].img;
        this.classList.add('flipped');

        if (cardChosen.length === 2) {
            setTimeout(checkForMatch, 500);
        }
    }
}

function checkForMatch() {
    let cards = document.querySelectorAll('.card');
    const optionOneId = cardChosenId[0];
    const optionTwoId = cardChosenId[1];

    if (cardChosen[0] === cardChosen[1]) {
        cards[optionOneId].removeEventListener('click', flipCard);
        cards[optionTwoId].removeEventListener('click', flipCard);
        cardsWon.push(cardChosen);
    } else {
        cards[optionOneId].innerHTML = '';
        cards[optionOneId].classList.remove('flipped');
        cards[optionTwoId].innerHTML = '';
        cards[optionTwoId].classList.remove('flipped');
    }

    cardChosen = [];
    cardChosenId = [];

    if (cardsWon.length === cardsArray.length / 2) {
        clearInterval(timer);
        const playerName = playerNameInput.value.trim() || 'Anonymous';
        gameMessage.textContent = `Congratulations, ${playerName}! You found them all in ${timeElapsed} seconds!`;
        addHistory(playerName, timeElapsed);
    }
}

function startTimer() {
    timeElapsed = 0;
    timer = setInterval(() => {
        timeElapsed++;
        timerDisplay.textContent = `Time: ${timeElapsed}s`;
    }, 1000);
}

resetButton.addEventListener('click', resetGame);

function resetGame() {
    cardsArray.sort(() => 0.5 - Math.random());
    cardChosen = [];
    cardChosenId = [];
    cardsWon = [];
    gameMessage.textContent = '';
    timerDisplay.textContent = 'Time: 0s';
    clearInterval(timer);
    timerStarted = false;
    createBoard();
}

function addHistory(name, time) {
    const historyItem = document.createElement('li');
    historyItem.textContent = `${name} - ${time} seconds`;
    historyList.appendChild(historyItem);
}

// Initialize the game board
createBoard();
