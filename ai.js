// ai.js
// Large, generated keyword system (math, typing, speak, memory, breathing, settings)
// - Generates many keywords programmatically (200+ math, 200+ typing, 300+ speak, 200+ memory, 200+ breathing, 200+ settings)
// - Paginated keyword viewer (safe for browser)
// - Math solver for expressions like "what is 12*12" or "12 x 12" or "5+7"
// - Fast lookup and contains-matching fallback
// - Designed to avoid heavy DOM operations (no rendering of thousands of items at once)

// --------- DOM bindings (assumes ai.html structure) ----------
const output = document.getElementById("output");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const toggleKeysBtn = document.getElementById("toggleKeys");
const keysDiv = document.getElementById("keys");

// ---------- Utility helpers ----------
function addMessage(text, who = "ai") {
  const div = document.createElement("div");
  div.className = `msg ${who === "user" ? "user" : "ai"}`;
  div.textContent = text;
  output.appendChild(div);
  output.scrollTop = output.scrollHeight;
}

function sanitizeKey(s) {
  return s.trim().toLowerCase();
}

function randInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

// ---------- Keyword map (Map for fast lookup) ----------
const keywordMap = new Map();

// Store categories separately for metadata & paginated viewing
const categories = {
  math: { count: 0, keys: [] },
  typing: { count: 0, keys: [] },
  speak: { count: 0, keys: [] },
  memory: { count: 0, keys: [] },
  breathing: { count: 0, keys: [] },
  settings: { count: 0, keys: [] },
};

// ---------- Generators ----------

// 1) Math generator: generate ~220 math questions (mix add, sub, mul, div) and responses
function generateMath(n = 220) {
  const ops = ["+", "-", "*", "/"];
  let i = 0;
  while (i < n) {
    // create reasonably varied problems
    const a = randInt(1, 20);
    const b = randInt(1, 20);
    const op = ops[randInt(0, ops.length - 1)];
    // avoid division with remainder by sometimes making b a divisor
    let q, r;
    if (op === "/") {
      const divisor = randInt(1, 10);
      const quotient = randInt(1, 10);
      const dividend = divisor * quotient;
      q = `${dividend} / ${divisor}`;
      r = `${dividend} ÷ ${divisor} = ${quotient}`;
    } else {
      q = `${a} ${op} ${b}`;
      // compute result safely
      try {
        const val = eval(q);
        // format ints cleanly
        r = `${q} = ${Number.isFinite(val) ? (Number.isInteger(val) ? val : Number(val.toFixed(2))) : "?"}`;
      } catch {
        r = `${q} = ?`;
      }
    }

    // common phrasing variants
    const variants = [
      `what is ${q}`,
      `what is ${q}?`,
      `${q}=?`,
      `${q} = ?`,
      `what is ${q} equals`,
      `${q} equals?`
    ];

    for (const v of variants) {
      const key = sanitizeKey(v);
      if (!keywordMap.has(key)) {
        keywordMap.set(key, r);
        categories.math.keys.push(key);
        i++;
        if (i >= n) break;
      }
    }
  }
  categories.math.count = categories.math.keys.length;
}

// 2) Typing generator: generate ~220 typing prompts (short sentences)
// These are realistic typing practice prompts and incrementing variants
function generateTyping(n = 220) {
  const base = [
    "the quick brown fox jumps over the lazy dog",
    "practice makes progress",
    "type each sentence carefully",
    "learning to type is fun",
    "focus on accuracy",
    "speed will come with practice",
    "practice every day for ten minutes",
    "keep your fingers on the home row"
  ];
  let i = 0;
  let idx = 0;
  while (i < n) {
    const variation = `${base[idx % base.length]}${idx > 0 ? " " + idx : ""}`;
    const key = sanitizeKey(`type: ${variation}`);
    const response = `TYPING_PROMPT: ${variation}`;
    if (!keywordMap.has(key)) {
      keywordMap.set(key, response);
      categories.typing.keys.push(key);
      i++;
    }
    idx++;
  }
  categories.typing.count = categories.typing.keys.length;
}

// 3) Speak generator: generate ~320 speak prompts (common conversational prompts)
// Use many polite phrases, Q&A starters, etc
function generateSpeak(n = 320) {
  const starters = [
    "hello", "hi", "good morning", "good afternoon","good evening",
    "how are you", "how is your day", "nice to meet you", "what is your name",
    "can you help me", "please say hello", "say thank you", "say sorry",
    "tell me a story", "sing a song", "say the alphabet", "what is your favorite color",
    "how do i say hello in spanish", "please speak slowly", "repeat after me"
  ];
  let i = 0, idx = 0;
  while (i < n) {
    const base = starters[idx % starters.length];
    const key = sanitizeKey(`speak: ${base}${idx > 0 ? " " + idx : ""}`);
    const response = `SPEAK_PROMPT: "${base}". Try saying it now.`;
    if (!keywordMap.has(key)) {
      keywordMap.set(key, response);
      categories.speak.keys.push(key);
      i++;
    }
    idx++;
  }
  categories.speak.count = categories.speak.keys.length;
}

// 4) Memory generator: phrases to practice memory (200+). We'll generate short lists or pairs
function generateMemory(n = 200) {
  const items = ["apple","banana","dog","cat","red","blue","circle","square","one","two","three","green","yellow"];
  let i = 0, idx = 0;
  while (i < n) {
    // create a "remember this" style prompt
    const listLen = randInt(2, 6);
    const chosen = [];
    for (let j = 0; j < listLen; j++) chosen.push(items[(idx + j) % items.length] + (Math.random() > 0.8 ? idx : ""));
    const q = `remember: ${chosen.join(", ")}`;
    const response = `MEMORY_PROMPT: Try to remember ${chosen.join(", ")}`;
    const key = sanitizeKey(q);
    if (!keywordMap.has(key)) {
      keywordMap.set(key, response);
      categories.memory.keys.push(key);
      i++;
    }
    idx++;
  }
  categories.memory.count = categories.memory.keys.length;
}

// 5) Breathing prompts: exercise prompts and instructions (~200)
function generateBreathing(n = 200) {
  const patterns = [
    "take a deep breath", "breathe in for 4 seconds", "breathe out for 6 seconds",
    "count your breaths", "calm breathing exercise", "relax and breathe", "follow circle inhale exhale"
  ];
  let i = 0, idx = 0;
  while (i < n) {
    const base = patterns[idx % patterns.length];
    const key = sanitizeKey(`breathing: ${base}${idx > 0 ? " " + idx : ""}`);
    const response = `BREATHING_PROMPT: ${base}. Follow along.`;
    if (!keywordMap.has(key)) {
      keywordMap.set(key, response);
      categories.breathing.keys.push(key);
      i++;
    }
    idx++;
  }
  categories.breathing.count = categories.breathing.keys.length;
}

// 6) Settings prompts: phrases about toggles, colors, font size (~200)
function generateSettings(n = 200) {
  const settingsBase = [
    "change background color", "set font size to 16", "increase font size", "decrease font size",
    "set accent color", "turn sounds on", "turn sounds off", "set typing speed to 40ms",
    "reset settings", "save settings", "enable dark mode", "disable dark mode"
  ];
  let i = 0, idx = 0;
  while (i < n) {
    const phrase = settingsBase[idx % settingsBase.length];
    const key = sanitizeKey(`settings: ${phrase}${idx > 0 ? " " + idx : ""}`);
    const response = `SETTINGS_ACTION: ${phrase}. (This would update UI settings.)`;
    if (!keywordMap.has(key)) {
      keywordMap.set(key, response);
      categories.settings.keys.push(key);
      i++;
    }
    idx++;
  }
  categories.settings.count = categories.settings.keys.length;
}

// ---------- Build the datasets ----------
generateMath(220);         // ~220 math problems
generateTyping(220);       // ~220 typing prompts
generateSpeak(320);        // ~320 speak prompts
generateMemory(200);       // ~200 memory prompts
generateBreathing(200);    // ~200 breathing prompts
generateSettings(200);     // ~200 settings prompts

// ---------- Keyword viewer: PAGINATED to avoid DOM freeze ----------
const PAGE_SIZE = 50;
let viewerState = { category: null, page: 0 };

function showCategoryPage(category) {
  viewerState.category = category;
  viewerState.page = 0;
  renderViewerPage();
}

function renderViewerPage() {
  const cat = viewerState.category;
  if (!cat) {
    keysDiv.innerHTML = `<div>Categories: ${Object.keys(categories).map(c => `${c}(${categories[c].count})`).join(" | ")}</div>
      <div style="margin-top:8px">Click a category to view keys.</div>
      ${Object.keys(categories).map(c => `<button data-cat="${c}" class="viewer-cat-btn">${c} (${categories[c].count})</button>`).join(" ")}`;
    keysDiv.classList.remove("hidden");
    // wire category buttons
    keysDiv.querySelectorAll(".viewer-cat-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        viewerState.category = e.currentTarget.getAttribute("data-cat");
        viewerState.page = 0;
        renderViewerPage();
      });
    });
    return;
  }

  const keys = categories[cat].keys;
  const totalPages = Math.ceil(keys.length / PAGE_SIZE);
  const start = viewerState.page * PAGE_SIZE;
  const pageKeys = keys.slice(start, start + PAGE_SIZE);

  // Build HTML safely
  let html = `<div style="margin-bottom:8px"><button id="backToCats">Back</button> <strong>${cat.toUpperCase()}</strong> — page ${viewerState.page + 1} / ${totalPages}</div>`;
  html += `<div style="max-height:400px; overflow:auto; padding:8px; background:#fff; border-radius:6px;">`;
  pageKeys.forEach(k => {
    html += `<div style="padding:6px 0; border-bottom:1px solid #f0f0f0"><code>${k}</code></div>`;
  });
  html += `</div>`;
  html += `<div style="margin-top:8px">`;
  if (viewerState.page > 0) html += `<button id="prevPage">Prev</button>`;
  if (viewerState.page < totalPages - 1) html += `<button id="nextPage">Next</button>`;
  html += ` <button id="backCats">Back to categories</button></div>`;

  keysDiv.innerHTML = html;
  keysDiv.classList.remove("hidden");

  // wire controls
  const prev = document.getElementById("prevPage");
  const next = document.getElementById("nextPage");
  const backCats = document.getElementById("backCats");
  const backToCats = document.getElementById("backToCats");
  if (prev) prev.addEventListener("click", () => { viewerState.page--; renderViewerPage(); });
  if (next) next.addEventListener("click", () => { viewerState.page++; renderViewerPage(); });
  if (backCats) { backCats.addEventListener("click", () => { viewerState.category = null; renderViewerPage(); }); }
  if (backToCats) { backToCats.addEventListener("click", () => { viewerState.category = null; renderViewerPage(); }); }
}

// initial viewer (collapsed)
keysDiv.classList.add("hidden");

// ---------- Math expression parser (simple) ----------
function tryMathCompute(text) {
  // Accept forms like "what is 12*12", "12 x 12", "what is 5+7", "what is 12 / 3"
  // Normalize multiplication symbols
  let normalized = text.replace(/×/g, "*").replace(/x/g, "*").replace(/X/g, "*").replace(/÷/g, "/");
  // pull first expression-looking part
  const exprMatch = normalized.match(/(-?\d+(\.\d+)?\s*[\+\-\*\/]\s*-?\d+(\.\d+)?)/);
  if (!exprMatch) return null;
  const expr = exprMatch[1];
  try {
    const val = Function(`return (${expr})`)();
    if (typeof val === "number" && Number.isFinite(val)) {
      const out = Number.isInteger(val) ? val : Number(val.toFixed(4));
      return `${expr} = ${out}`;
    }
  } catch (e) {
    return null;
  }
  return null;
}

// ---------- Main responder ----------
function getResponse(inputText) {
  const s = sanitizeKey(inputText);

  // 1) Math direct compute (takes precedence)
  const mathRes = tryMathCompute(inputText);
  if (mathRes) return mathRes;

  // 2) Exact lookup
  if (keywordMap.has(s)) return keywordMap.get(s);

  // 3) Contains match (first match wins)
  for (const [key, resp] of keywordMap.entries()) {
    if (s.includes(key)) return resp;
  }

  // 4) Category fuzzy fallback - detect category keywords
  if (s.includes("type") || s.includes("typing")) return "Try a typing prompt: " + keywordMap.get(categories.typing.keys[0]);
  if (s.includes("breathe") || s.includes("breathing") || s.includes("inhale")) return "Try a breathing prompt: " + keywordMap.get(categories.breathing.keys[0]);
  if (s.includes("memory")) return "Try a memory prompt: " + keywordMap.get(categories.memory.keys[0]);

  return "Sorry — I don't have an answer for that yet. Try a math question (e.g., 'what is 12*12') or ask for a typing/speak/memory/breathing prompt.";
}

// ---------- Wire up UI ----------
sendBtn.addEventListener("click", () => {
  const text = userInput.value.trim();
  if (!text) return;
  addMessage(text, "user");
  const reply = getResponse(text);
  addMessage(reply, "ai");
  userInput.value = "";
});

userInput.addEventListener("keydown", (e) => { if (e.key === "Enter") sendBtn.click(); });

toggleKeysBtn.addEventListener("click", () => {
  // If hidden, show category overview (not all keys)
  if (keysDiv.classList.contains("hidden")) {
    viewerState.category = null;
    renderViewerPage();
  } else {
    keysDiv.classList.add("hidden");
    keysDiv.innerHTML = "";
  }
});

// ---------- startup message ----------
addMessage("Hello — Kade AI is ready. Ask a math question (e.g., 'what is 12*12') or request a typing/speak/memory/breathing prompt.", "ai");

// ---------- Performance note ----------
/*
  Implementation choices to avoid browser lag:
  - Large keyword sets are generated programmatically and stored in a Map (fast lookups).
  - The keyword viewer does NOT render all keywords at once — it shows categories and pages (PAGE_SIZE = 50).
  - Math expressions are computed with a small, safe parser.
  - Fuzzy matches use .includes on sanitized keys; this is O(N) but acceptable for a few thousand keywords on modern browsers.
  - If you want 2000+ total keywords, this same pattern will handle it; viewer remains paginated to avoid freezes.
*/
