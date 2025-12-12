// number-game.js — final fixed version
document.addEventListener('DOMContentLoaded', () => {
  const startBtn = document.getElementById('startBtn');
  const submitBtn = document.getElementById('submitBtn');
  const nextBtn = document.getElementById('nextBtn');
  const questionEl = document.getElementById('question');
  const answerInput = document.getElementById('answerInput');
  const feedback = document.getElementById('feedback');
  const scoreDisplay = document.getElementById('scoreDisplay');
  const roundDisplay = document.getElementById('roundDisplay');
  const progressBar = document.getElementById('progressBar');

  const TOTAL = 8;
  let score = 0, round = 0, currentAnswer = null;

  function speak(text){
    const s = JSON.parse(localStorage.getItem('aa_settings')||'{}');
    if (s && s.voiceEnabled === false) return;
    if (!('speechSynthesis' in window)) return;
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 0.95; u.pitch = 1.05;
    // try to respect saved voice
    const voices = speechSynthesis.getVoices();
    if (s && s.selectedVoiceURI) {
      const v = voices.find(vv => vv.voiceURI === s.selectedVoiceURI);
      if (v) u.voice = v;
    } else {
      const preferredLang = (s && s.voiceLang) ? s.voiceLang : 'en';
      const v = voices.find(vv => vv.lang && vv.lang.startsWith(preferredLang));
      if (v) u.voice = v;
    }
    speechSynthesis.cancel(); speechSynthesis.speak(u);
  }

  function rand(min,max){ return Math.floor(Math.random()*(max-min+1))+min; }

  function generate(){
    const a = rand(1,12), b = rand(1,12);
    const ops = ['+','-','×'];
    const op = ops[Math.floor(Math.random()*ops.length)];
    let questionText=''; let ans=0;
    if (op === '+'){ questionText = `${a} + ${b}`; ans = a+b; }
    else if (op === '-'){ questionText = `${Math.max(a,b)} - ${Math.min(a,b)}`; ans = Math.abs(a-b); }
    else { questionText = `${a} × ${b}`; ans = a*b; }
    currentAnswer = ans;
    questionEl.textContent = `What is ${questionText}?`;
    feedback.textContent = '';
    answerInput.value = '';
    answerInput.disabled = false;
    submitBtn.disabled = false;
    nextBtn.disabled = true;
    answerInput.focus();
  }

  function updateProgress(){
    progressBar.style.width = `${(round / TOTAL) * 100}%`;
    roundDisplay.textContent = `Round: ${round}/${TOTAL}`;
    scoreDisplay.textContent = `Score: ${score}`;
  }

  function check(){
    const val = parseInt(answerInput.value);
    if (isNaN(val)) { feedback.textContent = 'Please enter a number.'; return; }
    if (val === currentAnswer){
      score++; feedback.textContent = '✅ Correct — great job!'; feedback.style.color = 'green'; speak('Great job! Correct.');
    } else {
      feedback.textContent = `❌ Not quite. The right answer was ${currentAnswer}.`; feedback.style.color='red'; speak('Almost! The correct answer was '+currentAnswer);
    }
    round++;
    updateProgress();
    answerInput.disabled = true; submitBtn.disabled = true; nextBtn.disabled = false;
    if (round >= TOTAL){
      nextBtn.textContent = 'Finish';
      nextBtn.onclick = finish;
    }
  }

  function finish(){
    questionEl.textContent = '🎉 Finished!';
    feedback.textContent = `You scored ${score} / ${TOTAL}.`;
    progressBar.style.width = '100%';
    speak(`Well done. You scored ${score} out of ${TOTAL}.`);
    // play again button
    const btn = document.createElement('button'); btn.className='btn'; btn.textContent='Play Again';
    btn.style.marginTop='12px';
    btn.onclick = ()=> {
      btn.remove();
      reset();
    };
    document.querySelector('.game-card').appendChild(btn);
  }

  function reset(){
    score = 0; round = 0; currentAnswer = null; updateProgress();
    startBtn.disabled = false; nextBtn.textContent='Next'; nextBtn.onclick = null;
    questionEl.textContent = 'Press Start';
    feedback.textContent = '';
    progressBar.style.width = '0%';
  }

  startBtn.addEventListener('click', () => {
    score = 0; round = 0; updateProgress();
    startBtn.disabled = true; generate(); speak('Game started. Take your time.');
  });
  submitBtn.addEventListener('click', check);
  nextBtn.addEventListener('click', () => { generate(); nextBtn.disabled = true; });

  // keyboard support
  answerInput.addEventListener('keypress', (e)=> { if (e.key === 'Enter' && !submitBtn.disabled) check(); });

  reset();
});
