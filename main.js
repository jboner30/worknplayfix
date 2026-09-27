const durationInput = document.getElementById('focus-duration');
const startButton = document.getElementById('start-timer');
const resetButton = document.getElementById('reset-timer');
const timerDisplay = document.getElementById('timer-display');
const breakModal = document.getElementById('break-modal');
const closeModalButton = document.getElementById('close-modal');

let totalSeconds = 25 * 60;
let remainingSeconds = totalSeconds;
let timerId = null;
let isRunning = false;

function formatTime(total) {
  const minutes = Math.floor(total / 60);
  const seconds = total % 60
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function updateDisplay() {
  timerDisplay.textContent = formatTime(remainingSeconds);
}

function syncDurationFromInput() {
  const enteredMinutes = Number(durationInput.value);
  const safeMinutes = Number.isFinite(enteredMinutes) && enteredMinutes > 0
    ? Math.min(Math.max(Math.round(enteredMinutes), 1), 180)
    : 25;

  durationInput.value = safeMinutes;
  totalSeconds = safeMinutes * 60;
  remainingSeconds = totalSeconds;
  updateDisplay();
}

function stopTimer() {
  if (timerId) {
    clearInterval(timerId);
    timerId = null;
  }
  isRunning = false;
}

function showBreakModal() {
  breakModal.classList.remove('hidden');
}

function hideBreakModal() {
  breakModal.classList.add('hidden');
}

function startTimer() {
  if (isRunning) {
    return;
  }

  syncDurationFromInput();
  isRunning = true;

  timerId = setInterval(() => {
    remainingSeconds -= 1;
    updateDisplay();

    if (remainingSeconds <= 0) {
      stopTimer();
      showBreakModal();
    }
  }, 1000);
}

function resetTimer() {
  stopTimer();
  syncDurationFromInput();
  hideBreakModal();
}

durationInput.addEventListener('input', () => {
  if (!isRunning) {
    syncDurationFromInput();
  }
});

startButton.addEventListener('click', startTimer);
resetButton.addEventListener('click', resetTimer);
closeModalButton.addEventListener('click', () => {
  hideBreakModal();
  resetTimer();
});

syncDurationFromInput();
