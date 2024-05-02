let timerInterval;
let startTime;
let elapsedTime = 0;
let isRunning = false;

const display = document.querySelector('.display');
const startButton = document.querySelector('.start');
const pauseButton = document.querySelector('.pause');
const resetButton = document.querySelector('.reset');
const lapButton = document.querySelector('.lap');
const lapsList = document.querySelector('.laps');

function formatTime(ms) {
  const date = new Date(ms);
  const hours = date.getUTCHours().toString().padStart(2, '0');
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');
  const seconds = date.getUTCSeconds().toString().padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}

function updateTime() {
  const currentTime = new Date().getTime();
  elapsedTime = currentTime - startTime;
  display.textContent = formatTime(elapsedTime);
}

function startTimer() {
  if (!isRunning) {
    startTime = new Date().getTime() - elapsedTime;
    timerInterval = setInterval(updateTime, 1000);
    isRunning = true;
  }
}

function pauseTimer() {
  clearInterval(timerInterval);
  isRunning = false;
}

function resetTimer() {
  clearInterval(timerInterval);
  isRunning = false;
  elapsedTime = 0;
  display.textContent = formatTime(elapsedTime);
  lapsList.innerHTML = '';
}

function lapTimer() {
  if (isRunning) {
    const lapTime = formatTime(elapsedTime);
    const lapItem = document.createElement('li');
    lapItem.textContent = lapTime;
    lapItem.classList.add('lap-item');
    lapsList.prepend(lapItem);
  }
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
lapButton.addEventListener('click', lapTimer);
