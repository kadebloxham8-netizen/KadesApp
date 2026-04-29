// =====================
// PRACTICE SYSTEM
// =====================

const promptText = document.getElementById("prompt");
const output = document.getElementById("output");
const statusText = document.getElementById("status");

const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const nextBtn = document.getElementById("nextBtn");
const hearBtn = document.getElementById("hearBtn");

let currentList = [];
let currentIndex = 0;

const easyWords = [
"cat","dog","sun","ball","tree","milk","book","fish","car","hat",
"pen","cup","star","shoe","apple","bed","bird","toy","chair","house"
];

const mediumSentences = [
"I like to play outside.",
"The dog is running fast.",
"She is reading a book.",
"We are going to school.",
"The sun is very bright."
];

const hardSentences = [
"I am going to the store to buy some fresh apples today.",
"The quick brown fox jumps over the lazy dog near the river.",
"We are learning how to speak clearly and confidently every day."
];

function setLevel(level){
    if(level === "easy") currentList = easyWords;
    if(level === "medium") currentList = mediumSentences;
    if(level === "hard") currentList = hardSentences;

    currentIndex = 0;
    showPrompt();
}

function showPrompt(){
    promptText.textContent = currentList[currentIndex];
}

// NEXT
nextBtn.onclick = () => {
    if(currentList.length === 0) return;
    currentIndex = (currentIndex + 1) % currentList.length;
    showPrompt();
    output.value = "";
};

// CLEAN TEXT
function cleanText(text){
    return text.toLowerCase().replace(/[.,!?]/g, "").trim();
}

// =====================
// SPEECH RECOGNITION
// =====================

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition;
let justChecked = false;

if(SpeechRecognition){
    recognition = new SpeechRecognition();
    recognition.lang = "en-US";

    recognition.onstart = () => {
        statusText.textContent = "Listening...";
    };

    recognition.onresult = (event) => {
        const spoken = event.results[0][0].transcript;
        output.value = spoken;

        justChecked = true;
        checkAnswer(spoken);
    };

    recognition.onend = () => {
        if(!justChecked){
            statusText.textContent = "Stopped";
        }
        justChecked = false;
    };
}

// START / STOP
startBtn.onclick = () => recognition && recognition.start();
stopBtn.onclick = () => recognition && recognition.stop();

// HEAR PROMPT
hearBtn.onclick = () => {
    const text = promptText.textContent;
    if(!text) return;

    const utter = new SpeechSynthesisUtterance(text);

    const voices = speechSynthesis.getVoices();
    if(voices.length > 0){
        utter.voice = voices.find(v => v.lang.includes("en")) || voices[0];
    }

    speechSynthesis.cancel();
    speechSynthesis.speak(utter);
};

// CHECK ANSWER
function checkAnswer(spoken){
    const target = cleanText(promptText.textContent);
    const said = cleanText(spoken);

    if(said === target){
        statusText.textContent = "✅ Correct!";
    } else {
        statusText.textContent = "❌ Try again";
    }
}

// =====================
// TEXT TO SPEECH
// =====================

const textInput = document.getElementById("textInput");
const speakBtn = document.getElementById("speakBtn");
const voiceSelect = document.getElementById("voiceSelect");

let voices = [];
const synth = window.speechSynthesis;

// LOAD VOICES
function loadVoices(){
    voices = synth.getVoices();
    voiceSelect.innerHTML = "";

    voices.forEach((voice, i) => {
        const option = document.createElement("option");
        option.value = i;
        option.textContent = voice.name;
        voiceSelect.appendChild(option);
    });
}

loadVoices();
speechSynthesis.onvoiceschanged = loadVoices;

// SPEAK
speakBtn.onclick = () => {
    const text = textInput.value.trim();
    if(!text) return;

    const utter = new SpeechSynthesisUtterance(text);

    const selectedVoice = voices[voiceSelect.value];
    if(selectedVoice){
        utter.voice = selectedVoice;
    }

    synth.cancel();
    synth.speak(utter);
};
