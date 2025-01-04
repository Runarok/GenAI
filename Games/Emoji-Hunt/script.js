let score = 0;
let timer;
let gameActive = false;
let highScore = localStorage.getItem('highScore') ? parseInt(localStorage.getItem('highScore')) : 0;

document.getElementById('highscore').innerText = 'High Score: ' + highScore;

function startGame() {
    score = 0;
    gameActive = true;
    document.getElementById('score').innerText = 'Score: ' + score;
    document.getElementById('timer').innerText = 'Time: 60';
    document.getElementById('menu').style.display = 'none';
    spawnEmoji();
    startTimer();
}

function spawnEmoji() {
    if (!gameActive) return;

    const emojis = [
        '😊', '😎', '🎉', '❤️', '🚀', '🌟', '😂', '🥳', '🎈', '🌈', '🐶', '🐱', '🦄', '🌻', '🍕', '🍉', '🎶', '⚡', '🔥', '💎'
    ];

    const emoji = document.createElement('div');
    emoji.className = 'emoji';
    emoji.innerText = emojis[Math.floor(Math.random() * emojis.length)];

    const x = Math.random() * (window.innerWidth - 50);
    const y = Math.random() * (window.innerHeight - 50);
    emoji.style.left = `${x}px`;
    emoji.style.top = `${y}px`;

    document.body.appendChild(emoji);

    emoji.addEventListener('click', () => {
        score++;
        document.getElementById('score').innerText = 'Score: ' + score;
        document.body.removeChild(emoji);
        spawnEmoji();
    });

    setTimeout(() => {
        if (document.body.contains(emoji)) {
            document.body.removeChild(emoji);
            spawnEmoji();
        }
    }, 3000);
}

function startTimer() {
    let timeLeft = 60;
    timer = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timer);
            gameActive = false;
            showToast('Time\'s up! Your score is: ' + score);
            if (score > highScore) {
                highScore = score;
                localStorage.setItem('highScore', highScore);
                document.getElementById('highscore').innerText = 'High Score: ' + highScore;
            }
            document.getElementById('menu').style.display = 'block';
        } else {
            timeLeft--;
            document.getElementById('timer').innerText = 'Time: ' + timeLeft;
        }
    }, 1000);
}

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.innerText = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}
