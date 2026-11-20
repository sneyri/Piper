const stage = document.querySelector('.stage');
const phase = document.querySelector('#phase');
const status = document.querySelector('#status');
const start = document.querySelector('#start');
const search = document.querySelector('#search');
const splash = document.querySelector('.splash');
const underwater = document.querySelector('.under');
let tideTimer;
let splashTimer;

function setPhase(value) {
  stage.dataset.phase = value;
  phase.textContent = value === 'out' ? 'Вода отступила' : 'Волна идёт';
}
function runTide(value) {
  setPhase(value);
  tideTimer = setTimeout(() => runTide(value === 'in' ? 'out' : 'in'), value === 'in' ? 1700 : 2100);
}
start.addEventListener('click', () => {
  clearTimeout(tideTimer);
  clearTimeout(splashTimer);
  splash.hidden = underwater.hidden = true;
  stage.dataset.jump = 'false';
  start.hidden = true;
  search.disabled = false;
  search.focus();
  status.textContent = 'Ищи ракушку, когда вода отступит.';
  runTide('in');
});
search.addEventListener('click', () => {
  if (stage.dataset.phase === 'out') {
    clearTimeout(tideTimer);
    clearTimeout(splashTimer);
    stage.dataset.jump = 'false';
    splash.hidden = true;
    underwater.hidden = false;
    phase.textContent = 'Ракушка найдена';
    status.textContent = 'Получилось! Теперь можно заглянуть под воду.';
    start.textContent = 'Сыграть ещё';
    start.hidden = false;
    start.focus();
    search.disabled = true;
    return;
  }
  clearTimeout(splashTimer);
  stage.dataset.jump = 'true';
  splash.hidden = false;
  status.textContent = 'Плюх! Подожди, пока вода отступит, и попробуй снова.';
  splashTimer = setTimeout(() => {
    splash.hidden = true;
    stage.dataset.jump = 'false';
  }, 650);
});
