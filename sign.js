/* sign.js */
const signSelect = document.getElementById('signSelect');
const startSign = document.getElementById('startSign');
const practiceArea = document.getElementById('practiceArea');

const signSteps = {
  hello: ['Raise your hand near the side of your head.','Wave your hand gently left-right.','Repeat 3 times.'],
  thanks: ['Place fingers near chin.','Move hand forward slightly.','Repeat slowly 3 times.'],
  yes: ['Make a fist with thumb extended up.','Hold for 2 seconds.','Relax and repeat.'],
  friend: ['Hook index fingers of both hands.','Cross them then swap.','Repeat slowly 3 times.']
};

function startPractice(){
  const key = signSelect.value;
  const steps = signSteps[key];
  if(!steps) return;
  practiceArea.innerHTML = '';
  let i=0;
  const instr = document.createElement('div');
  instr.style.fontSize='18px';
  instr.style.fontWeight='600';
  practiceArea.appendChild(instr);
  const detail = document.createElement('div');
  detail.style.marginTop='8px';
  practiceArea.appendChild(detail);
  instr.textContent = `Practice: ${key}`;
  detail.textContent = steps[i];
  const interval = setInterval(()=>{
    i++;
    if(i>=steps.length){ clearInterval(interval); detail.textContent = 'Practice complete. Repeat as needed.'; return; }
    detail.textContent = steps[i];
  }, 3000);
}

startSign.addEventListener('click', startPractice);
