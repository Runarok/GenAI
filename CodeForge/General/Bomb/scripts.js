const meaningfulSentences = [
    "The sun sets behind the distant hills.",
    "Hope is the light that guides us forward.",
    "Life is a journey filled with surprises.",
    // Add the rest of your sentences here...
];

const userInput = document.getElementById("user-input");
const explosionDiv = document.getElementById("explosion");
const timerDisplay = document.getElementById("time-left");
const scoreDisplay = document.getElementById("score-value");
const resultDisplay = document.getElementById("result");
const downloadButton = document.getElementById("download-button");

let timer;
let timeLeft = 30;
let score = 0;
let powerUpActive = false;
let powerUpType = "";
let timerStarted = false;
let scoreReductionCooldown = false;

const achievements = JSON.parse(localStorage.getItem('achievements')) || {
    firstWin: false,
    type100Chars: false,
    play1Hour: false,
};

function saveAchievements() {
    localStorage.setItem('achievements', JSON.stringify(achievements));
}

function startTimer() {
    if (!timerStarted) {
        timerStarted = true;
        timer = setInterval(() => {
            timeLeft--;
            timerDisplay.innerText = timeLeft;
            if (timeLeft <= 0) {
                clearInterval(timer);
                resultDisplay.innerText = "You lost! Time's up.";
                resultDisplay.classList.remove("hidden");
            }
        }, 1000);
    }
}

function randomExplosion() {
    const destroyEndOnly = document.getElementById("destroy-end").checked;

    if (destroyEndOnly) {
        if (userInput.value.length > 0) {
            if (!scoreReductionCooldown) {
                scoreReductionCooldown = true;
                score -= 10;
                updateScore();
                setTimeout(() => {
                    scoreReductionCooldown = false;
                }, 1000);
            }
            userInput.value = userInput.value.slice(0, -1);
            triggerExplosion(userInput.value.length);
        }
    } else {
        const validInputs = userInput.value.split('').filter(c => /[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/? ]/.test(c));
        if (validInputs.length > 0) {
            const randomIndex = Math.floor(Math.random() * validInputs.length);
            if (!scoreReductionCooldown) {
                scoreReductionCooldown = true;
                score -= 10;
                updateScore();
                setTimeout(() => {
                    scoreReductionCooldown = false;
                }, 1000);
            }
            userInput.value = userInput.value.slice(0, randomIndex) + userInput.value.slice(randomIndex + 1);
            triggerExplosion(randomIndex);
        }
    }
    spawnPowerUp();
}

function triggerExplosion(index) {
    explosionDiv.style.left = `${userInput.getBoundingClientRect().left + (index * 10)}px`;
    explosionDiv.style.top = `${userInput.getBoundingClientRect().top + 10}px`;
    explosionDiv.style.display = 'block';
    setTimeout(() => {
        explosionDiv.style.display = 'none';
    }, 500);
}

function spawnPowerUp() {
    const powerUp = document.createElement("div");
    powerUp.classList.add("power-up");
    powerUp.innerText = "$";
    powerUp.style.left = `${Math.random() * 100}%`;
    document.body.appendChild(powerUp);

    setTimeout(() => {
        powerUp.remove();
    }, 5000);

    powerUp.addEventListener("animationend", () => {
        powerUp.remove();
    });

    powerUp.onclick = function() {
        collectPowerUp();
        powerUp.remove();
    };
}

function collectPowerUp() {
    if (powerUpActive) return;
    const powerUpTypes = ["shield", "slow", "double"];
    powerUpType = powerUpTypes[Math.floor(Math.random() * powerUpTypes.length)];
    powerUpActive = true;

    if (powerUpType === "shield") {
        setTimeout(() => {
            powerUpActive = false;
        }, 10000);
    } else if (powerUpType === "slow") {
        clearInterval(timer);
        setTimeout(() => {
            timeLeft += 5;
            startTimer();
        }, 5000);
    } else if (powerUpType === "double") {
        const originalScore = score;
        setTimeout(() => {
            powerUpActive = false;
            score = originalScore;
        }, 10000);
    }
}

function updateScore() {
    score = Math.max(0, score);
    scoreDisplay.innerText = score;
    checkAchievements();
}

function checkAchievements() {
    if (score >= 100 && !achievements.type100Chars) {
        achievements.type100Chars = true;
        saveAchievements();
    }
}

function checkInput() {
    if (userInput.value === document.getElementById("meaningful-sentence").innerText) {
        clearInterval(timer);
        score += 100;
        updateScore();
        resultDisplay.innerText = "You win! Great job!";
        resultDisplay.classList.remove("hidden");
        downloadButton.classList.remove("hidden");
        if (!achievements.firstWin) {
            achievements.firstWin = true;
            saveAchievements();
        }
    }
}

userInput.addEventListener('input', (e) => {
    const regex = /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/? ]*$/;
    if (!regex.test(e.target.value)) {
        e.target.value = e.target.value.slice(0, -1);
    } else {
        score += 2;
        updateScore();
        startTimer();
    }
    checkInput();
});

document.getElementById("difficulty").addEventListener('change', (e) => {
    clearInterval(timer);
    timeLeft = 30;
    timerDisplay.innerText = timeLeft;
    const interval = parseInt(e.target.value);
    setInterval(randomExplosion, interval);
    startTimer();
});

function randomSentence() {
    const randomIndex = Math.floor(Math.random() * meaningfulSentences.length);
    document.getElementById("meaningful-sentence").innerText = meaningfulSentences[randomIndex];
}

randomSentence();
startTimer();
setInterval(randomExplosion, 1500);

downloadButton.onclick = function() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 300;
    canvas.height = 200;
    ctx.fillStyle = '#121212';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#E0E0E0';
    ctx.font = '16px Arial';

    ctx.strokeStyle = 'gold';
    ctx.lineWidth = 5;
    ctx.strokeRect(5, 5, canvas.width - 10, canvas.height - 10);

    ctx.textAlign = 'center';
    ctx.fillText('Achievements:', canvas.width / 2, 20);

    let y = 40;
    for (const [key, value] of Object.entries(achievements)) {
        ctx.fillText(`${key}: ${value ? 'Unlocked' : 'Locked'}`, canvas.width / 2, y);
        y += 20;
    }

    const link = document.createElement('a');
    link.download = 'achievements.png';
    link.href = canvas.toDataURL();
    link.click();
};
