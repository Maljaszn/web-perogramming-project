let timer = document.getElementById('timer');
let startButton = document.getElementById('start-button');
let stopButton = document.getElementById('stop-button');
let resetButton = document.getElementById('reset-button');
let workIntervalInput = document.getElementById('work-interval');
let breakIntervalInput = document.getElementById('break-interval');
let notificationSound = document.getElementById('notification-sound');

let workInterval = parseInt(workIntervalInput.value) * 60; // convert minutes to seconds
let breakInterval = parseInt(breakIntervalInput.value) * 60; // convert minutes to seconds
let currentTime = workInterval;
let isRunning = false;
let isWorkInterval = true;

startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', resetTimer);
workIntervalInput.addEventListener('input', updateWorkInterval);
breakIntervalInput.addEventListener('input', updateBreakInterval);

function startTimer() {
    isRunning = true;
    startButton.disabled = true;
    stopButton.disabled = false;
    updateTimer();
}

function stopTimer() {
    isRunning = false;
    startButton.disabled = false;
    stopButton.disabled = true;
}

function resetTimer() {
    isRunning = false;
    currentTime = workInterval;
    isWorkInterval = true;
    timer.textContent = formatTime(currentTime);
    startButton.disabled = false;
    stopButton.disabled = true;
}

function updateWorkInterval() {
    workInterval = parseInt(workIntervalInput.value) * 60;
    if (isWorkInterval) {
        currentTime = workInterval;
        timer.textContent = formatTime(currentTime);
    }
}

function updateBreakInterval() {
    breakInterval = parseInt(breakIntervalInput.value) * 60;
}

function updateTimer() {
    if (isRunning) {
        currentTime -= 1;
        timer.textContent = formatTime(currentTime);

        if (currentTime <= 0) {
            notificationSound.play();
            if (isWorkInterval) {
                currentTime = breakInterval;
                isWorkInterval = false;
                timer.textContent = "Break!";
            } else {
                currentTime = workInterval;
                isWorkInterval = true;
                timer.textContent = "Work!";
            }
        }

        setTimeout(updateTimer, 1000);
    }
}

function formatTime(time) {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}
