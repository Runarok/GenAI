let score = 0; // Initializes score to 0
let highScore = Number(localStorage.getItem('highscore')) || 0; // Retrieves high score from local storage
const ball = document.getElementById('ball'); // Gets the ball element
const scoreDisplay = document.getElementById('score'); // Gets the score display element
const highScoreDisplay = document.getElementById('highscore'); // Gets the high score display element

function updateScore() {
    score++; // Increments the score
    scoreDisplay.textContent = `Score: ${score}`; // Updates the score display
    if (score > highScore) { // Checks if current score exceeds high score
        highScore = score; // Updates high score
        localStorage.setItem('highscore', highScore); // Saves new high score to local storage
        highScoreDisplay.textContent = `High Score: ${highScore}`; // Updates high score display
    }
}

function randomPosition() {
    const ballSize = ball.clientWidth; // Gets the ball's width
    const headerHeight = document.querySelector('header').clientHeight; // Gets the header's height
    const maxX = window.innerWidth - ballSize - 20; // Calculates max X position for the ball
    const maxY = window.innerHeight - ballSize - headerHeight - 20; // Calculates max Y position for the ball
    const x = Math.random() * maxX + 10; // Generates random X position with margin
    const y = Math.random() * maxY + headerHeight + 10; // Generates random Y position below the header
    ball.style.transform = `translate(${x}px, ${y}px)`; // Moves the ball to the new position
}

ball.addEventListener('click', () => { // Adds click event listener to the ball
    updateScore(); // Updates score on click
    randomPosition(); // Moves the ball to a new position on click
});

function startGame() {
    score = 0; // Resets score to 0
    scoreDisplay.textContent = `Score: ${score}`; // Updates score display
    highScoreDisplay.textContent = `High Score: ${highScore}`; // Updates high score display
    randomPosition(); // Initializes ball position
    setInterval(randomPosition, 1000); // Moves ball every second
}

startGame(); // Starts the game
