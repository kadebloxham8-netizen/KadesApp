/* styles.css — AutismAssist Pro (complete) */

/* ---------- Root & Theme Vars ---------- */
:root{
  --bg: linear-gradient(135deg,#e6f3ff 0%,#f0fbff 100%);
  --surface: #ffffff;
  --text: #0f1724;
  --muted: #6b7280;
  --accent: #2d8fbf;
  --accent-2: #00bfa6;
  --success:#28a745;
  --danger:#e85a5a;
  --radius:14px;
  --shadow:0 10px 30px rgba(13,40,60,0.06);
  --glass: rgba(255,255,255,0.6);
  --font: Inter, "Segoe UI", Roboto, system-ui, -apple-system, Arial;
  --btn-min-w:200px;
  --btn-min-h:100px;
  --ui-size-lg:1.5rem;
  --card-pad:18px;
}

/* Dark modifier class applied to body (in addition to theme) */
.theme-dark {
  --bg: linear-gradient(180deg,#071226 0%,#0b2436 100%);
  --surface:#0f1724;
  --text:#e6eef5;
  --muted:#98a9b3;
  --shadow:0 10px 30px rgba(0,0,0,0.6);
  --glass: rgba(255,255,255,0.02);
}

/* ---------- Layout ---------- */
*{box-sizing:border-box}
html,body{height:100%;margin:0;font-family:var(--font);-webkit-font-smoothing:antialiased}
body{
  background:var(--bg);
  color:var(--text);
  display:flex;
  gap:18px;
  padding:18px;
  align-items:flex-start;
  transition:background .2s ease,color .2s ease;
}

/* ---------- Sidebar ---------- */
.sidebar{
  width:260px;
  background: linear-gradient(180deg, var(--surface), rgba(255,255,255,0.98));
  padding:20px;
  border-radius:calc(var(--radius) + 4px);
  box-shadow:var(--shadow);
  position:sticky; top:18px; height:fit-content;
}
.brand{
  font-weight:900; color:var(--accent); font-size:20px; margin-bottom:4px;
}
.brand-sub{color:var(--muted); font-size:12px; margin-bottom:14px}
.nav-links{display:flex;flex-direction:column;gap:8px}
.nav-links a{ text-decoration:none; padding:10px 12px; border-radius:10px; color:var(--text); font-weight:700; transition:all .12s; }
.nav-links a:hover{ background: rgba(0,0,0,0.04) }
.nav-links a.active{ background: linear-gradient(90deg,var(--accent),var(--accent-2)); color:white; box-shadow:0 6px 18px rgba(13,40,60,0.08) }

/* ---------- Main / Header ---------- */
main{ flex:1; min-width:0; max-width:1100px; width:100% }
.header{ display:flex; justify-content:space-between; align-items:center; margin-bottom:10px }
.title{ font-size:20px; font-weight:800 }
.subtitle{ color:var(--muted); font-size:13px }

/* ---------- Cards ---------- */
.card, .game-card { background: var(--surface); border-radius:var(--radius); padding:var(--card-pad); box-shadow:var(--shadow); }
.home-cards{ display:grid; grid-template-columns:repeat(auto-fit,minmax(250px,1fr)); gap:18px; margin-top:18px }

/* ---------- Buttons (large accessible 4x3 like requested) ---------- */
.btn{
  display:inline-flex; align-items:center; justify-content:center;
  background: linear-gradient(90deg,var(--accent),var(--accent-2));
  color:white; border:none; border-radius:12px;
  font-size:var(--ui-size-lg); font-weight:800;
  padding:1.2rem 1.6rem;
  min-width:var(--btn-min-w); min-height:var(--btn-min-h);
  cursor:pointer; transition:transform .12s ease, box-shadow .12s ease;
}
.btn:hover{ transform:translateY(-4px); box-shadow:0 8px 24px rgba(0,0,0,0.12) }
.btn.ghost{ background:transparent; color:var(--accent); border:1px solid rgba(0,0,0,0.06) }
.btn:disabled, .btn.disabled{ background:#9aa8b2; cursor:not-allowed; transform:none }

/* ---------- Forms ---------- */
input[type="number"], textarea, select, input[type="text"]{
  width:100%; padding:12px 14px; border-radius:10px; border:1px solid rgba(0,0,0,0.06); font-size:1rem; margin-top:10px;
  background: linear-gradient(180deg, rgba(255,255,255,0.95), rgba(255,255,255,0.99));
}
textarea{ resize:vertical }
input[disabled], textarea[disabled]{ opacity:0.95 }

/* ---------- Game layouts ---------- */
.game-area{ display:flex; justify-content:center; }
.game-card{ width:420px; text-align:center; }

/* progress */
.progress-wrap{ width:100%; height:12px; background:rgba(0,0,0,0.06); border-radius:10px; overflow:hidden; margin-top:16px }
.progress-bar{ height:100%; width:0%; background:linear-gradient(90deg,var(--accent),var(--accent-2)); transition:width .35s ease }

/* small text */
.small{ font-size:13px; color:var(--muted) }
.feedback{ font-weight:800; margin-top:10px }

/* ---------- Memory board ---------- */
.memory-board{ display:grid; grid-template-columns:repeat(4,86px); gap:12px; justify-content:center; margin-top:18px }
.memory-card{
  width:86px; height:86px; border-radius:12px; display:flex; align-items:center; justify-content:center;
  font-size:2rem; cursor:pointer; user-select:none; background:linear-gradient(180deg,#fff,#fbfeff); box-shadow:0 6px 18px rgba(10,20,50,0.06);
  transition:transform .22s ease, background .22s ease;
}
.memory-card.flipped{ transform:scale(1.04); background:linear-gradient(90deg,#fff,#eef6ff) }

/* ---------- Speak page ---------- */
.speak-container{ max-width:720px; margin:0 auto; text-align:center }
.speak-controls{ display:flex; gap:10px; justify-content:center; align-items:center; flex-wrap:wrap; margin-top:8px }
.voice-list{ min-width:220px }

/* ---------- Typing ---------- */
.typing-box{ font-family:monospace; border:2px solid var(--accent); border-radius:12px; padding:12px; min-height:120px; font-size:1.1rem }

/* ---------- Settings ---------- */
.settings-container{ max-width:720px; margin:0 auto; text-align:center }
.color-btn{ width:44px; height:44px; border-radius:50%; border:3px solid #fff; cursor:pointer; box-shadow:0 6px 18px rgba(0,0,0,0.08) }
.color-btn.blue{ background:#2d8fbf } .color-btn.green{ background:#0ea58a } .color-btn.purple{ background:#6d44ff } .color-btn.orange{ background:#ff8a3d }

/* ---------- Utilities ---------- */
.center{text-align:center}
.hidden{display:none}
@media (max-width:900px){
  .sidebar{ display:none }
  body{ padding:12px }
  .btn{ min-width:160px; min-height:84px; font-size:1.15rem }
}
