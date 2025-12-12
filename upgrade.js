// js/upgrade.js
// Small upgrade/check-for-updates simulator.
// Place in js/upgrade.js and include from a page that shows the upgrade UI.
// This does NOT fetch files from the internet — it simulates an available update
// so the user can choose to "apply" or "keep current". It persists 'activeVersion'.

(function(){
  const APP_KEY = 'autismassist_active_version';
  const AVAILABLE_KEY = 'autismassist_available_version';

  // default version values
  const DEFAULT_VERSION = 'v1.0.0';
  const NEW_VERSION = 'v1.1.0 (UI+Stability)';

  // helpers
  function getActive() {
    return localStorage.getItem(APP_KEY) || DEFAULT_VERSION;
  }
  function setActive(v) {
    localStorage.setItem(APP_KEY, v);
    renderStatus();
  }
  function getAvailable() {
    return localStorage.getItem(AVAILABLE_KEY) || NEW_VERSION;
  }
  function setAvailable(v) {
    localStorage.setItem(AVAILABLE_KEY, v);
    renderStatus();
  }

  // Render UI if present on a page
  function renderStatus() {
    const statusEl = document.getElementById('upgradeStatus');
    const activeEl = document.getElementById('activeVersion');
    const availEl = document.getElementById('availableVersion');
    const checkBtn = document.getElementById('checkUpdatesBtn');
    const applyBtn = document.getElementById('applyUpdateBtn');
    if (!statusEl) return;
    const active = getActive();
    const avail = getAvailable();
    activeEl && (activeEl.textContent = active);
    availEl && (availEl.textContent = avail);
    if (active === avail) {
      statusEl.textContent = `You are on the latest version (${active}).`;
      if (applyBtn) applyBtn.style.display = 'none';
    } else {
      statusEl.textContent = `Update available: ${avail}`;
      if (applyBtn) applyBtn.style.display = 'inline-block';
    }
    if (checkBtn) checkBtn.disabled = false;
  }

  // Simulate checking for updates (small delay)
  function checkForUpdates(btn) {
    if (btn) btn.disabled = true;
    const statusEl = document.getElementById('upgradeStatus');
    if (statusEl) statusEl.textContent = 'Checking for updates…';
    // simulate async check
    setTimeout(()=> {
      // pretend we found a version (could be dynamic)
      const found = getAvailable();
      if (statusEl) statusEl.textContent = `Found update: ${found}`;
      renderStatus();
    }, 900);
  }

  // Apply update: copy available -> active
  function applyUpdate() {
    const avail = getAvailable();
    setActive(avail);
    const statusEl = document.getElementById('upgradeStatus');
    if (statusEl) statusEl.textContent = `Update applied: ${avail}. Reload to see changes.`;
    // For demo: apply a small cosmetic change to the app (e.g., set a CSS flag)
    try {
      localStorage.setItem('autismassist_update_applied', avail);
    } catch(e){}
  }

  // UI wiring if elements exist on page
  window.addEventListener('load', ()=>{
    // auto-initialize available version if not set
    if (!localStorage.getItem(AVAILABLE_KEY)) {
      localStorage.setItem(AVAILABLE_KEY, NEW_VERSION);
    }
    // render any UI
    renderStatus();

    const checkBtn = document.getElementById('checkUpdatesBtn');
    const applyBtn = document.getElementById('applyUpdateBtn');
    if (checkBtn) checkBtn.addEventListener('click', ()=> checkForUpdates(checkBtn));
    if (applyBtn) applyBtn.addEventListener('click', applyUpdate);
  });

  // expose small API for debugging
  window.AutismAssistUpgrade = {
    getActive, setActive, getAvailable, setAvailable, applyUpdate, checkForUpdates
  };
})();
