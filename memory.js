// ---------------- Memory Game JS ----------------

const startBtn = document.getElementById("startBtn");
const messageBox = document.getElementById("messageBox");
const cardContainer = document.getElementById("cardContainer");
const wrongCountEl = document.getElementById("wrongCount");
const highScoreEl = document.getElementById("highScore");

// Positive sound for matches
const matchSound = new Audio("positive-sound.mp3"); // replace with your file

let cards = [];
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let wrongGuesses = 0;

// Load high score from localStorage
let highScore = localStorage.getItem("memoryHighScore") || 0;
highScoreEl.textContent = highScore;

// Card symbols (example)
const symbols = ["⭐","🍎","🎵","⚡","❤️","🎯","🐶","🌟"];

function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

function startGame() {
    cards = [];
    firstCard = null;
    secondCard = null;
    lockBoard = false;
    wrongGuesses = 0;
    wrongCountEl.textContent = wrongGuesses;
    messageBox.textContent = "Game started!";

    // Duplicate symbols for pairs and shuffle
    const cardSymbols = shuffleArray([...symbols, ...symbols]);

    cardContainer.innerHTML = "";

    cardSymbols.forEach(symbol => {
        const card = document.createElement("div");
        card.classList.add("memory-card");
        card.innerHTML = `<div class="front">${symbol}</div><div class="back"></div>`;
        card.addEventListener("click", flipCard);
        cardContainer.appendChild(card);
        cards.push(card);
    });
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard || this.classList.contains("flipped")) return;

    this.classList.add("flipped");

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    checkMatch();
}

function checkMatch() {
    const isMatch = firstCard.querySelector(".front").textContent === secondCard.querySelector(".front").textContent;

    if (isMatch) {
        matchSound.play();
        firstCard.removeEventListener("click", flipCard);
        secondCard.removeEventListener("click", flipCard);
        resetBoard();
        messageBox.textContent = "Nice! You found a match!";
        checkWin();
    } else {
        lockBoard = true;
        wrongGuesses++;
        wrongCountEl.textContent = wrongGuesses;
        setTimeout(() => {
            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");
            resetBoard();
            messageBox.textContent = "Try again!";
        }, 1000);
    }
}

function resetBoard() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}

function checkWin() {
    const allMatched = cards.every(card => card.classList.contains("flipped"));
    if (allMatched) {
        messageBox.textContent = "You completed the game!";
        if (highScore === 0 || wrongGuesses < highScore) {
            highScore = wrongGuesses;
            localStorage.setItem("memoryHighScore", highScore);
            highScoreEl.textContent = highScore;
            messageBox.textContent += " New High Score!";
        }
    }
}

// Event listener
startBtn.addEventListener("click", startGame);
