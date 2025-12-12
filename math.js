// ------------------- Math Game JS -------------------

const gridContainer = document.getElementById("mathGrid");
const startBtn = document.getElementById("startBtn");
const submitBtn = document.getElementById("submitBtn");
const difficultySelect = document.getElementById("difficultySelect");
const messageBox = document.getElementById("messageBox");

// Add problem display above buttons
let problemText = document.createElement("div");
problemText.style.fontSize = "20px";
problemText.style.fontWeight = "600";
problemText.style.marginBottom = "16px";
messageBox.parentNode.insertBefore(problemText, messageBox);

let correctAnswer = 0;
let gameActive = false;
let selectedAnswer = null;
let selectedButton = null;
let currentDifficulty = "easy";

// Sounds
const correctSound = new Audio("https://freesound.org/data/previews/170/170664_2398404-lq.mp3");
const wrongSound = new Audio("https://freesound.org/data/previews/402/402853_5121236-lq.mp3");

// ------------------- Functions -------------------

function generateProblem() {
    let a, b;
    currentDifficulty = difficultySelect.value;

    if (currentDifficulty === "easy") {
        a = Math.floor(Math.random() * 4) + 1;
        b = Math.floor(Math.random() * 5) + 1;
    } else if (currentDifficulty === "medium") {
        a = Math.floor(Math.random() * 10) + 1;
        b = Math.floor(Math.random() * 10) + 1;
    } else {
        a = Math.floor(Math.random() * 12) + 1;
        b = Math.floor(Math.random() * 12) + 1;
    }

    correctAnswer = a * b;
    return `${a} × ${b} = ?`;
}

function generateNumbers() {
    const numbers = new Set();
    numbers.add(correctAnswer);

    while (numbers.size < 6) {
        let n;
        if (currentDifficulty === "easy") n = Math.floor(Math.random() * 20) + 1;
        else if (currentDifficulty === "medium") n = Math.floor(Math.random() * 90) + 1;
        else n = Math.floor(Math.random() * 144) + 1;
        numbers.add(n);
    }
    return shuffle([...numbers]);
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Create answer buttons
function createButtons(numbers) {
    gridContainer.innerHTML = "";
    selectedAnswer = null;
    selectedButton = null;
    submitBtn.disabled = true;

    numbers.forEach(num => {
        const btn = document.createElement("button");
        btn.classList.add("mathBtn");
        btn.textContent = num;
        btn.style.margin = "8px";
        btn.style.padding = "12px 20px";
        btn.style.fontSize = "18px";
        btn.style.backgroundColor = "var(--panel)";
        btn.style.color = "var(--text)";
        btn.style.border = "2px solid var(--panel-border)";

        btn.addEventListener("click", () => {
            // Deselect previous button
            if (selectedButton && selectedButton !== btn && selectedButton.disabled === false) {
                selectedButton.style.border = "2px solid var(--panel-border)";
            }
            selectedButton = btn;
            selectedAnswer = num;
            btn.style.border = "2px solid var(--accent-dark)";
            submitBtn.disabled = false;
        });

        gridContainer.appendChild(btn);
    });

    submitBtn.style.marginTop = "16px";
}

// Handle submission
function checkAnswer() {
    if (!gameActive || selectedAnswer === null) return;

    if (selectedAnswer === correctAnswer) {
        selectedButton.style.backgroundColor = "#34d399"; // green
        selectedButton.style.color = "#fff";
        messageBox.textContent = `Correct! The answer is ${correctAnswer}. Click Start for next round.`;
        gameActive = false;
        submitBtn.disabled = true;
    } else {
        selectedButton.style.backgroundColor = "#f87171"; // red
        selectedButton.style.color = "#fff";
        selectedButton.disabled = true;
        messageBox.textContent = "Wrong! Try again!";
        selectedAnswer = null;
        selectedButton = null;
        submitBtn.disabled = true;
    }
}

// Start new game
function startGame() {
    const problem = generateProblem();
    const numbers = generateNumbers();
    createButtons(numbers);
    gameActive = true;
    problemText.textContent = problem;
    messageBox.textContent = "Select an answer and click Submit!";
}

// ------------------- Event Listeners -------------------
startBtn.addEventListener("click", startGame);
submitBtn.addEventListener("click", checkAnswer);

// ------------------- Sidebar Highlight -------------------
const sidebarLinks = document.querySelectorAll(".sidebar ul li a");
sidebarLinks.forEach(link => {
    if (link.href === window.location.href) link.classList.add("active");
    else link.classList.remove("active");
});
