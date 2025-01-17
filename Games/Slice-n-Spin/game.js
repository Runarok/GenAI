const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let fruits = [];
let score = 0;
let highScore = localStorage.getItem('highScore') || 0;
let gameOver = false;
const fruitColors = ['#ff4757', '#ffa502', '#1e90ff', '#2ed573', '#eccc68'];

// Ball class
function Pt(x, y) {
  this.x = x;
  this.y = y;
}

function Ball() {
  this.pos = new Pt(canvas.width / 2, canvas.height / 2);
  this.mPos = new Pt(0, 0);
  this.Xvel = 0;
  this.Yvel = 0;
  this.accel = new Pt(0, 0);
  this.boundaryEnabled = true;
  this.radius = 20;  // Reduced ball size
}

Ball.prototype.draw = function () {
  context.fillStyle = "hsla(180, 100%, 50%, 1)";
  context.shadowColor = 'hsla(180, 100%, 50%, 0.8)';
  context.shadowBlur = 20;
  context.shadowOffsetX = 5;
  context.shadowOffsetY = 5;
  context.beginPath();
  context.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI);
  context.fill();
};

Ball.prototype.update = function () {
  this.accel.x = (this.mPos.x - this.pos.x) * 0.01;
  this.accel.y = (this.mPos.y - this.pos.y) * 0.01;
  this.Xvel += this.accel.x;
  this.Yvel += this.accel.y;
  this.pos.x += this.Xvel;
  this.pos.y += this.Yvel;
  this.Xvel *= 0.97;
  this.Yvel *= 0.97;

  if (this.boundaryEnabled) {
    const ballRadius = this.radius;
    if (this.pos.x < ballRadius) {
      this.pos.x = ballRadius;
      this.Xvel *= -0.5;
    } else if (this.pos.x > canvas.width - ballRadius) {
      this.pos.x = canvas.width - ballRadius;
      this.Xvel *= -0.5;
    }

    if (this.pos.y < ballRadius) {
      this.pos.y = ballRadius;
      this.Yvel *= -0.5;
    } else if (this.pos.y > canvas.height - ballRadius) {
      this.pos.y = canvas.height - ballRadius;
      this.Yvel *= -0.5;
    }
  }
};

Ball.prototype.mouseMove = function (e) {
  this.mPos.x = e.clientX;
  this.mPos.y = e.clientY;
};

const ball = new Ball();

// Fruit mechanics
function createFruit() {
  const size = Math.random() * 10 + 10;  // Reduced fruit size
  const fruit = {
    x: Math.random() * canvas.width,
    y: canvas.height + size,  // Fruit now starts from the bottom
    speedY: -(Math.random() * 0.8 + 0.5),  // Slower falling speed
    radius: size,
    color: fruitColors[Math.floor(Math.random() * fruitColors.length)]
  };
  fruits.push(fruit);
}

function drawFruit(fruit) {
  context.beginPath();
  context.arc(fruit.x, fruit.y, fruit.radius, 0, Math.PI * 2);
  context.fillStyle = fruit.color;
  context.fill();
  context.closePath();
}

function updateGame() {
  if (gameOver) return;

  context.clearRect(0, 0, canvas.width, canvas.height);

  fruits.forEach((fruit, index) => {
    fruit.y += fruit.speedY;

    // Check if fruit reaches top (Game Over)
    if (fruit.y < 0) {
      gameOver = true;
      showGameOver();
    }

    drawFruit(fruit);

    if (fruit.y < -fruit.radius) {
      fruits.splice(index, 1);
    }
  });

  if (Math.random() < 0.02) createFruit(); // 1 fruit per second

  ball.update();
  ball.draw();

  // Gradually increase fruit speed over time
  fruits.forEach(fruit => {
    fruit.speedY *= 1.0005; // Slower speed increase
  });

  // Check for collisions between ball and fruit
  handleBallFruitCollision();

  requestAnimationFrame(updateGame);
}

// Improved collision handling: Ball slicing fruits
function handleBallFruitCollision() {
  fruits.forEach((fruit, index) => {
    const dist = Math.hypot(ball.pos.x - fruit.x, ball.pos.y - fruit.y);
    if (dist < ball.radius + fruit.radius) {
      score++;
      document.getElementById('score').innerText = `Score: ${score}`;
      fruits.splice(index, 1);  // Slice the fruit
    }
  });
}

// Mouse slicing event
canvas.addEventListener('mousemove', (e) => {
  if (gameOver) return; // Prevent slicing after game over

  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  fruits.forEach((fruit, index) => {
    const dist = Math.hypot(mouseX - fruit.x, mouseY - fruit.y);
    if (dist < fruit.radius) {
      score++;
      document.getElementById('score').innerText = `Score: ${score}`;
      fruits.splice(index, 1); // Slice the fruit
    }
  });

  ball.mouseMove(e);
});

// Show Game Over and store high score
function showGameOver() {
  document.getElementById('toast').innerText = `Game Over! Scored: ${score}`;
  document.getElementById('toast').style.display = 'block';
  setTimeout(() => {
    document.getElementById('toast').style.display = 'none';
  }, 3000);

  if (score > highScore) {
    highScore = score;
    localStorage.setItem('highScore', highScore);
  }

  document.getElementById('highScore').innerText = `High Score: ${highScore}`;

  // Restart game after 2 seconds
  setTimeout(restartGame, 2000);
}

// Restart game function
function restartGame() {
  gameOver = false;
  score = 0;
  document.getElementById('score').innerText = `Score: ${score}`;
  fruits = [];
  ball.pos = new Pt(canvas.width / 2, canvas.height / 2);  // Reset ball position
  updateGame(); // Start the game loop again
}

// Toggle ball boundary
document.getElementById('toggleBoundaries').addEventListener('click', function () {
  ball.boundaryEnabled = !ball.boundaryEnabled;
  this.textContent = ball.boundaryEnabled ? "Disable Boundaries" : "Enable Boundaries";
});

// Start game
updateGame();
