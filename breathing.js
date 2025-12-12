// ------------------- Breathing JS -------------------

const circle = document.getElementById("circle");
const timeLeft = document.getElementById("timeLeft");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const durationSlider = document.getElementById("duration");
const durationLabel = document.getElementById("durationLabel");

let intervalId = null;
let remainingTime = 0;
let phase = "inhale";
let phaseTime = 4; // seconds per phase
let stepCounter = 0;

// Update duration label dynamically
durationSlider.addEventListener("input", () => {
    durationLabel.textContent = durationSlider.value;
});

// ------------------- Functions -------------------

function startBreathing() {
    clearInterval(intervalId);
    remainingTime = Number(durationSlider.value) * 60;
    phase = "inhale";
    stepCounter = 0;
    circle.classList.remove("inhale", "exhale");
    circle.textContent = "Inhale";
    updateTimer();
    intervalId = setInterval(breathStep, 1000);
}

function breathStep() {
    if (remainingTime <= 0) {
        stopBreathing();
        circle.textContent = "Done!";
        circle.classList.remove("inhale", "exhale");
        return;
    }

    stepCounter++;
    if (stepCounter > phaseTime) {
        if (phase === "inhale") {
            phase = "exhale";
            circle.classList.remove("inhale");
            circle.classList.add("exhale");
            circle.textContent = "Exhale";
        } else {
            phase = "inhale";
            circle.classList.remove("exhale");
            circle.classList.add("inhale");
            circle.textContent = "Inhale";
            remainingTime -= phaseTime * 2;
            if (remainingTime < 0) remainingTime = 0;
        }
        stepCounter = 1;
        updateTimer();
    }
}

function updateTimer() {
    const mins = Math.floor(remainingTime / 60).toString().padStart(2, "0");
    const secs = (remainingTime % 60).toString().padStart(2, "0");
    timeLeft.textContent = `${mins}:${secs}`;
}

function stopBreathing() {
    clearInterval(intervalId);
    remainingTime = 0;
    stepCounter = 0;
    updateTimer();
    circle.textContent = "Stopped";
    circle.classList.remove("inhale", "exhale");
}

// ------------------- Event Listeners -------------------
startBtn.addEventListener("click", startBreathing);
stopBtn.addEventListener("click", stopBreathing);
