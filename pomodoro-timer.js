// DOM Elements
const startBtn = document.getElementById("start");
const resetBtn = document.getElementById("reset");
const counter = document.getElementById("counter");
const phase = document.getElementById("phase");
const backdrop = document.getElementById("timer");

// Button interaction
document.getElementById("buttons").addEventListener("click", e => {
    if (e.target.id == "start") {
        work();
        } else if (e.target.id == "pause") {
        pauseTimer();
    } else if (e.target.id == "reset") {
        resetTimer();
    } else if (e.target.id == "resume") {
        resumeTimer();
    }
});

// Global variables
let timer = {} // Tracks mins and secs depending on active phase
let start;     // Interval variable

// Work phase
function work() {
    clearInterval(start);
    phase.innerHTML = "Work";
    startBtn.id = "pause";
    startBtn.className = "fas fa-pause";
    backdrop.style.background = "radial-gradient(circle, #455f80, #496587, #5e81ac)";
    timer.minutes = 24;
    timer.seconds = 60;
    start = setInterval( () => {
        timer.seconds -= 1;
        if (timer.minutes === 0 && timer.seconds < 0) {
            rest();
        } else if (timer.seconds < 0) {
            timer.minutes -= 1;
            timer.seconds = 59;
            progressBar.style.strokeDayArray = "10 24"
        }
        counter.innerHTML = timer.minutes + ":" + timer.seconds;
    }, 1000);
}

// Rest phase
function rest() {
    clearInterval(start);
    phase.innerHTML = "Rest";
    backdrop.style.background = "radial-gradient(circle, #6b8c8c, #769c9c, #8fbcbb)";
    timer.minutes = 4;
    timer.seconds = 60;
    start = setInterval( () => {
        timer.seconds -= 1;
        if (timer.minutes === 0 && timer.seconds < 0) {
            work();
        } else if (timer.seconds < 0) {
            timer.minutes -= 1;
            timer.seconds = 59;
        }
        counter.innerHTML = timer.minutes + ":" + timer.seconds;
    }, 1000);
}

// Back to pre-work settings
function resetTimer() {
    phase.innerHTML = "Do it";
    startBtn.id = "start";
    startBtn.className = "fas fa-play"
    backdrop.style.background = "radial-gradient(circle, #2e3440, #434c5e, #4c566a)";
    counter.innerHTML = "25" + ":" + "00";
    clearInterval(start);
}

// Pauses current interval
function pauseTimer() {
    startBtn.id = "resume";
    startBtn.className = "fas fa-play";
    clearInterval(start);
}

// Resumes current interval
function resumeTimer() {
    startBtn.id = "pause";
    startBtn.className = "fas fa-pause";
    start = setInterval( () => {
        timer.seconds -= 1;
        if (timer.minutes === 0 && timer.seconds < 0) {
            rest();
        } else if (timer.seconds < 0) {
            timer.minutes -= 1;
            timer.seconds = 59;
        }
        counter.innerHTML = timer.minutes + ":" + timer.seconds;
    }, 1000);
}