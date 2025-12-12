// ------------------------
// Typing Lesson Script
// ------------------------
const startBtn = document.getElementById('startLesson');
const nextBtn = document.getElementById('nextWord');
const restartBtn = document.getElementById('restartLesson');
const hintBtn = document.getElementById('hintBtn');
const input = document.getElementById('typingInput');
const currentWordDisplay = document.getElementById('currentWord');
const feedbackDisplay = document.getElementById('feedback');
const wpmDisplay = document.getElementById('wpm');
const lessonSummary = document.getElementById('lessonSummary');
const wordTypeSelect = document.getElementById('wordType');

let words = [];
let currentWordIndex = 0;
let startTime = null;
let correctWords = 0;

// 100 app words and 1000 non-app words (short sample here, you can expand)
const appWords = ["learn","study","focus","practice","code","type","math","memory","speak","ai","sign","breath","game","exercise","skill"];
const nonAppWords = ["apple","orange","house","tree","river","car","plane","dog","cat","book","chair","table","phone","computer","city","school"];

// ------------------------
// Helper Functions
// ------------------------
function loadWords(type) {
    if(type === "app") {
        words = [...appWords];
    } else {
        words = [...nonAppWords];
    }
    shuffle(words);
    currentWordIndex = 0;
    correctWords = 0;
    startTime = null;
    updateWord();
    feedbackDisplay.textContent = "";
    wpmDisplay.textContent = "";
    lessonSummary.textContent = "";
    input.value = "";
}

function shuffle(array) {
    for (let i = array.length -1; i > 0; i--) {
        const j = Math.floor(Math.random()*(i+1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function updateWord() {
    if(currentWordIndex < words.length) {
        currentWordDisplay.textContent = words[currentWordIndex];
        input.value = "";
        input.focus();
    } else {
        currentWordDisplay.textContent = "Lesson Complete!";
        input.disabled = true;
        showSummary();
    }
}

function showSummary() {
    const elapsedMinutes = ((Date.now() - startTime)/1000)/60;
    const wpm = Math.round(correctWords/elapsedMinutes);
    wpmDisplay.textContent = `WPM: ${wpm}`;
    lessonSummary.textContent = `You typed ${correctWords} words correctly out of ${words.length}.`;
}

// ------------------------
// Event Listeners
// ------------------------
startBtn.addEventListener('click', () => {
    loadWords(wordTypeSelect.value);
    input.disabled = false;
    startTime = Date.now();
});

nextBtn.addEventListener('click', () => {
    checkWord();
    currentWordIndex++;
    updateWord();
});

restartBtn.addEventListener('click', () => {
    loadWords(wordTypeSelect.value);
});

hintBtn.addEventListener('click', () => {
    if(currentWordIndex < words.length) {
        feedbackDisplay.textContent = `Hint: First letter is '${words[currentWordIndex][0]}'`;
    }
});

input.addEventListener('keypress', (e) => {
    if(e.key === 'Enter') {
        checkWord();
        currentWordIndex++;
        updateWord();
    }
});

function checkWord() {
    const typed = input.value.trim();
    const correct = words[currentWordIndex];
    if(typed.toLowerCase() === correct.toLowerCase()) {
        feedbackDisplay.textContent = "✔ Correct!";
        feedbackDisplay.style.color = "green";
        correctWords++;
        if(localStorage.getItem('soundEnabled') === 'true') {
            playSound('correct');
        }
    } else {
        feedbackDisplay.textContent = "✖ Please try again.";
        feedbackDisplay.style.color = "red";
        if(localStorage.getItem('soundEnabled') === 'true') {
            playSound('wrong');
        }
    }
}

// ------------------------
// Sound Feedback
// ------------------------
function playSound(type) {
    const audio = new Audio();
    if(type === 'correct') {
        audio.src = "sounds/correct.mp3";
    } else {
        audio.src = "sounds/wrong.mp3";
    }
    audio.play();
}
