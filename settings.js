// Load saved settings on page load
window.addEventListener("DOMContentLoaded", () => {
    loadSettings();
});

// Save button event
document.getElementById("saveBtn").addEventListener("click", () => {
    saveSettings();
});

// Save all settings to localStorage
function saveSettings() {
    const settings = {
        darkMode: document.getElementById("darkMode").checked,
        soundVolume: document.getElementById("soundVolume").value,
        difficulty: document.getElementById("difficulty").value,
        username: document.getElementById("username").value.trim()
    };

    localStorage.setItem("appSettings", JSON.stringify(settings));

    showStatus("Settings saved successfully!");

    applyDarkMode(settings.darkMode);
}

// Load saved settings from localStorage
function loadSettings() {
    const saved = localStorage.getItem("appSettings");

    if (!saved) return;

    const settings = JSON.parse(saved);

    document.getElementById("darkMode").checked = settings.darkMode || false;
    document.getElementById("soundVolume").value = settings.soundVolume || 50;
    document.getElementById("difficulty").value = settings.difficulty || "easy";
    document.getElementById("username").value = settings.username || "";

    applyDarkMode(settings.darkMode);
}

// Show status message
function showStatus(msg) {
    const status = document.getElementById("statusMsg");
    status.textContent = msg;
    status.style.color = "green";
    status.style.marginTop = "10px";

    setTimeout(() => {
        status.textContent = "";
    }, 2000);
}

// Apply dark mode to entire page
function applyDarkMode(enabled) {
    if (enabled) {
        document.body.classList.add("dark-mode");
    } else {
        document.body.classList.remove("dark-mode");
    }
}
