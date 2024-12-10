let score = 0; /* Initialize score */
let timer; /* Timer variable */
let gameActive = false; /* Game state */
let highScore = localStorage.getItem('highScore') ? parseInt(localStorage.getItem('highScore')) : 0; /* Retrieve high score from localStorage */

document.getElementById('highscore').innerText = 'High Score: ' + highScore; /* Display high score */

function startGame() {
    score = 0; /* Reset score */
    gameActive = true; /* Start the game */
    document.getElementById('score').innerText = 'Score: ' + score; /* Update score display */
    document.getElementById('timer').innerText = 'Time: 60'; /* Reset timer display */
    document.getElementById('menu').style.display = 'none'; /* Hide menu */
    spawnEmoji(); /* Start spawning emojis */
    startTimer(); /* Start the timer */
}

function spawnEmoji() {
    if (!gameActive) return; /* If game is not active, stop spawning */

    const emojis = [
    '😊', '😎', '🎉', '❤️', '🚀', '🌟', '😂', '🥳', '🎈', '🌈', '🐶', '🐱', '🦄', '🌻', '🍕', '🍉', '🎶', '⚡', '🔥', '💎', 
    '🍔', '🍦', '🍩', '🍪', '🍓', '🍍', '🍇', '🥑', '🍒', '🍊', '🥨', '🌮', '🌯', '🍿', '🥖', '🍙', '🍚', '🥞', '🍜', '🍣', 
    '🦋', '🌻', '🌼', '🌷', '🍀', '🍂', '🌵', '🍃', '🌺', '🌸', '🌾', '🍁', '🍄', '🌿', '🐦', '🦋', '🐝', '🦗', '🐛', '🐜', 
    '🦑', '🐙', '🐬', '🐋', '🦁', '🐯', '🐅', '🐆', '🐘', '🐫', '🦒', '🐘', '🐎', '🐍', '🐾', '🦓', '🐋', '🦥', '🦊', '🦄',
    '🎮', '👾', '🎲', '🧩', '🕹️', '🧸', '🖼️', '🎨', '🎭', '🎤', '🎬', '🎻', '🎺', '🥁', '🎧', '🎼', '🎶', '🧩', '🧸', '🖤', 
    '💜', '💙', '💚', '❤️', '🧡', '💛', '🤍', '🤎', '🖤', '❣️', '💌', '💋', '👑', '⚔️', '🛡️', '💪', '🤳', '💅', '👠', '🩴',
    '💼', '🕶️', '👒', '🎩', '🧢', '👟', '👡', '🥿', '👢', '🧤', '🧣', '🧥', '👗', '👚', '👕', '👖', '👔', '👙', '🩳', '👘', 
    '⛷️', '🏂', '⛹️', '🤸', '🤾', '🏌️', '⛹️‍♂️', '🤼', '🤺', '🧘', '🏄', '🤽', '🤾‍♀️', '🎯', '🥅', '⚽', '🏀', '🏈', '⚾', '🌍', '🐢',
    '🎾', '🏐', '🏉', '🥏', '🥋', '⛳', '🏹', '🧗', '🏋️', '🏊', '🚴', '🏆', '🥇', '🥈', '🥉', '🎖️', '🏅', '🥳', '🎉', '🎊', '🥂',
    '🤗', '🥺', '🙃', '🤩', '😝', '😜', '😋', '🤤', '😢', '😭', '😓', '😤', '😡', '🤬', '😱', '😨', '😰', '😥', '😓', '😪', '🤕'
];

    const emoji = document.createElement('div'); /* Create new emoji element */
    emoji.className = 'emoji'; /* Assign emoji class */
    emoji.innerText = emojis[Math.floor(Math.random() * emojis.length)]; /* Randomly select emoji */

    const x = Math.random() * (window.innerWidth - 50); /* Random horizontal position */
    const y = Math.random() * (window.innerHeight - 50); /* Random vertical position */
    emoji.style.left = `${x}px`; /* Apply horizontal position */
    emoji.style.top = `${y}px`; /* Apply vertical position */

    document.body.appendChild(emoji); /* Add emoji to the body */

    emoji.addEventListener('click', () => { /* Add click event listener */
        score++; /* Increment score */
        document.getElementById('score').innerText = 'Score: ' + score; /* Update score display */
        document.body.removeChild(emoji); /* Remove clicked emoji */
        spawnEmoji(); /* Spawn another emoji */
    });

    setTimeout(() => {
        if (document.body.contains(emoji)) { /* Check if emoji still exists */
            document.body.removeChild(emoji); /* Remove emoji if time is up */
            spawnEmoji(); /* Spawn another emoji */
        }
    }, 3000); /* Emojis disappear after 3 seconds */
}

function startTimer() {
    let timeLeft = 60; /* Start timer at 60 seconds */
    timer = setInterval(() => {
        if (timeLeft <= 0) { /* If time runs out */
            clearInterval(timer); /* Stop the timer */
            gameActive = false; /* End the game */
            showToast('Time\'s up! Your score is: ' + score); /* Show final score in toast */
            if (score > highScore) { /* Check if new high score */
                highScore = score; /* Update high score */
                localStorage.setItem('highScore', highScore); /* Save to localStorage */
                document.getElementById('highscore').innerText = 'High Score: ' + highScore; /* Update high score display */
            }
            document.getElementById('menu').style.display = 'block'; /* Show the menu */
        } else {
            timeLeft--; /* Decrease time */
            document.getElementById('timer').innerText = 'Time: ' + timeLeft; /* Update timer display */
        }
    }, 1000); /* Update every second */
}

function showToast(message) {
    const toast = document.getElementById('toast'); /* Get toast element */
    toast.innerText = message; /* Set toast message */
    toast.classList.add('show'); /* Show the toast */

    setTimeout(() => {
        toast.classList.remove('show'); /* Hide the toast after 3 seconds */
    }, 3000);
}
