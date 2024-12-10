 const canvas = document.getElementById('gameCanvas'); // Get the canvas element for rendering the game
        const ctx = canvas.getContext('2d'); // Get the 2D drawing context for the canvas
        const scoreDisplay = document.getElementById('score'); // Display for the score
        const startBtn = document.getElementById('startBtn'); // Button to start the game
        const infoBtn = document.getElementById('infoBtn'); // Button to show game info
        const gameInfo = document.getElementById('game-info'); // Div containing game info
        const closeInfo = document.getElementById('closeInfo'); // Button to close game info

        let boardSize = parseInt(localStorage.getItem('boardSize')) || 20; // Get board size from localStorage or set default
        let snakeSpeed = parseInt(localStorage.getItem('snakeSpeed')) || 5; // Get snake speed from localStorage or set default
        let numApples = parseInt(localStorage.getItem('numApples')) || 3; // Get number of apples from localStorage or set default
        let powerUpFreq = (parseInt(localStorage.getItem('powerUpFreq')) || 10) * 1000; // Get power-up frequency from localStorage or set default
        let snakes, apples, powerUps, gameInterval, gameRunning, powerUpTimer; // Game state variables
        let score1, score2; // Scores for both players

        function initGame() {
            // Retrieve user-selected settings and initialize the game state
            boardSize = parseInt(document.getElementById('boardSize').value);
            snakeSpeed = parseInt(document.getElementById('snakeSpeed').value);
            numApples = parseInt(document.getElementById('numApples').value);
            powerUpFreq = parseInt(document.getElementById('powerUpFreq').value) * 1000;

            // Store game settings in localStorage for persistence
            localStorage.setItem('boardSize', boardSize);
            localStorage.setItem('snakeSpeed', snakeSpeed);
            localStorage.setItem('numApples', numApples);
            localStorage.setItem('powerUpFreq', powerUpFreq / 1000); // Store in seconds

            // Initialize snakes, apples, scores, and other game states
            snakes = [
                { body: [{ x: 5, y: 5 }], direction: { x: 0, y: 0 }, color: 'cyan' },
                { body: [{ x: 15, y: 15 }], direction: { x: 0, y: 0 }, color: 'teal' }
            ];
            apples = [];
            powerUps = [];
            score1 = 0;
            score2 = 0;
            gameRunning = true;
            scoreDisplay.innerText = 'Score: 0'; // Reset score display
            createApples(); // Generate initial apples
            draw(); // Draw initial game state
            canvas.style.display = 'block'; // Show the game canvas
            document.getElementById('controls').style.display = 'none'; // Hide control menu
            gameInterval = setInterval(gameLoop, 100 / snakeSpeed); // Set game loop interval
            powerUpTimer = setInterval(spawnPowerUp, powerUpFreq); // Set power-up spawn timer
        }

        function createApples() {
            // Create apples until the desired number is reached
            while (apples.length < numApples) {
                const newApple = {
                    x: Math.floor(Math.random() * boardSize),
                    y: Math.floor(Math.random() * boardSize)
                };
                if (!isOccupied(newApple)) { // Check if the new apple is on an empty tile
                    apples.push(newApple); // Add the new apple to the array
                }
            }
        }

        function spawnNewApple() {
            // Spawn a new apple in an empty tile
            let newApple;
            do {
                newApple = {
                    x: Math.floor(Math.random() * boardSize),
                    y: Math.floor(Math.random() * boardSize)
                };
            } while (isOccupied(newApple)); // Ensure the new apple is on an empty tile
            apples.push(newApple); // Add the new apple to the array
        }

        function isOccupied(position) {
            // Check if a position is occupied by any snake body part
            return snakes.some(snake => snake.body.some(part => part.x === position.x && part.y === position.y));
        }

        function spawnPowerUp() {
            // Randomly generate power-ups and add them to the game
            const types = ['Speed Up', 'Speed Down', 'Score Up'];
            const values = [1, 2, 3]; // Assign values for each power-up
            powerUps.push({
                x: Math.floor(Math.random() * boardSize),
                y: Math.floor(Math.random() * boardSize),
                type: types[Math.floor(Math.random() * types.length)],
                value: values[Math.floor(Math.random() * values.length)] // Randomly assign a value
            });
        }

        function draw() {
            // Clear the canvas and redraw all game elements
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawBoard(); // Draw the game board
            drawSnakes(); // Draw the snakes
            drawApples(); // Draw the apples
            drawPowerUps(); // Draw the power-ups
        }

        function drawBoard() {
            // Draw the grid lines for the game board
            for (let i = 0; i < boardSize; i++) {
                ctx.strokeStyle = 'grey';
                ctx.strokeRect((i * canvas.width) / boardSize, 0, canvas.width / boardSize, canvas.height);
                ctx.strokeRect(0, (i * canvas.height) / boardSize, canvas.width, canvas.height / boardSize);
            }
        }

        function drawSnakes() {
            // Draw each snake on the board
            snakes.forEach(snake => {
                ctx.fillStyle = snake.color;
                snake.body.forEach(part => {
                    ctx.fillRect(part.x * (canvas.width / boardSize), part.y * (canvas.height / boardSize), 
                                 (canvas.width / boardSize), (canvas.height / boardSize));
                });
            });
        }

        function drawApples() {
            // Draw each apple on the board
            ctx.fillStyle = 'red';
            apples.forEach(apple => {
                ctx.fillRect(apple.x * (canvas.width / boardSize), apple.y * (canvas.height / boardSize), 
                             (canvas.width / boardSize), (canvas.height / boardSize));
            });
        }

        function drawPowerUps() {
            // Draw each power-up on the board
            powerUps.forEach(powerUp => {
                ctx.fillStyle = 'magenta'; // Magenta background for power-ups
                ctx.fillRect(powerUp.x * (canvas.width / boardSize), powerUp.y * (canvas.height / boardSize), 
                             (canvas.width / boardSize), (canvas.height / boardSize));
                ctx.fillStyle = 'white'; // Text color
                ctx.fillText(powerUp.value, 
                             powerUp.x * (canvas.width / boardSize) + 5, 
                             powerUp.y * (canvas.height / boardSize) + 15); // Show value
            });
        }

        function gameLoop() {
            // Main game loop
            moveSnakes(); // Move the snakes
            checkCollisions(); // Check for collisions
            draw(); // Redraw the game state
        }

        function moveSnakes() {
            // Move each snake based on its direction
            snakes.forEach(snake => {
                const head = { x: snake.body[0].x + snake.direction.x, y: snake.body[0].y + snake.direction.y };
                wrapAround(head); // Handle wrap-around movement
                snake.body.unshift(head); // Add the new head to the snake
                snake.body.pop(); // Remove the last segment of the snake
            });
        }

        function wrapAround(head) {
            // Handle wrap-around logic for snake movement
            if (head.x >= boardSize) head.x = 0; // Wrap around to the left
            if (head.x < 0) head.x = boardSize - 1; // Wrap around to the right
            if (head.y >= boardSize) head.y = 0; // Wrap around to the top
            if (head.y < 0) head.y = boardSize - 1; // Wrap around to the bottom
        }

        function checkCollisions() {
            // Check for various types of collisions
            snakes.forEach((snake, index) => {
                // Check self-collision
                if (snake.body.slice(1).some(part => part.x === snake.body[0].x && part.y === snake.body[0].y)) {
                    endGame(index); // End game if the snake collides with itself
                }

                // Check apple collision
                apples.forEach((apple, appleIndex) => {
                    if (snake.body[0].x === apple.x && snake.body[0].y === apple.y) {
                        snake.body.push({ ...snake.body[snake.body.length - 1] }); // Grow the snake
                        apples.splice(appleIndex, 1); // Remove the eaten apple
                        spawnNewApple(); // Create a new apple in an empty tile
                        if (index === 0) score1 += 10; // Increment score for Player 1
                        else score2 += 10; // Increment score for Player 2
                        scoreDisplay.innerText = `Score: ${score1}`; // Update score display
                    }
                });

                // Check power-up collision
                powerUps.forEach((powerUp, powerUpIndex) => {
                    if (snake.body[0].x === powerUp.x && snake.body[0].y === powerUp.y) {
                        handlePowerUp(snake, powerUp); // Handle the power-up effect
                        powerUps.splice(powerUpIndex, 1); // Remove the collected power-up
                    }
                });
            });

            // Check snake collision
            if (snakes[0].body[0].x === snakes[1].body[0].x && snakes[0].body[0].y === snakes[1].body[0].y) {
                // End game if the two snakes collide
                const loserIndex = snakes[0].body[0].x === snakes[1].body[0].x && snakes[0].body[0].y === snakes[1].body[0].y ? null : -1;
                endGame(loserIndex);
            }
        }

        function handlePowerUp(snake, powerUp) {
            // Apply the effect of the collected power-up
            if (powerUp.value === 1) { // Speed Up
                snakeSpeed = Math.min(10, snakeSpeed + 1); // Increase speed
            } else if (powerUp.value === 2) { // Speed Down
                snakeSpeed = Math.max(1, snakeSpeed - 1); // Decrease speed
            } else if (powerUp.value === 3) { // Score Up
                if (snake === snakes[0]) score1 += 20; // Increment score for Player 1
                else score2 += 20; // Increment score for Player 2
                scoreDisplay.innerText = `Score: ${score1}`; // Update score display
            }
            clearInterval(gameInterval); // Clear existing game interval
            gameInterval = setInterval(gameLoop, 100 / snakeSpeed); // Set new game loop interval
        }

        function endGame(loserIndex) {
            // Handle game over logic
            clearInterval(gameInterval); // Stop the game loop
            clearInterval(powerUpTimer); // Stop the power-up timer
            const winnerIndex = loserIndex === 0 ? 1 : 0; // Determine the winner
            const winnerMessage = `Player ${winnerIndex + 1} Wins!`; // Prepare winner message
            alert(`Game Over! Final Score: Player 1 - ${score1}, Player 2 - ${score2}. ${winnerMessage}`); // Show game over alert
            document.location.reload(); // Reload the game with the same settings
        }

        function controlSnake(event) {
            // Control snake movement based on keyboard input
            if (event.key === 'w' && snakes[0].direction.y === 0) {
                snakes[0].direction = { x: 0, y: -1 }; // Move up
            } else if (event.key === 's' && snakes[0].direction.y === 0) {
                snakes[0].direction = { x: 0, y: 1 }; // Move down
            } else if (event.key === 'a' && snakes[0].direction.x === 0) {
                snakes[0].direction = { x: -1, y: 0 }; // Move left
            } else if (event.key === 'd' && snakes[0].direction.x === 0) {
                snakes[0].direction = { x: 1, y: 0 }; // Move right
            }
            // Player 2 controls
            if (event.key === 'ArrowUp' && snakes[1].direction.y === 0) {
                snakes[1].direction = { x: 0, y: -1 }; // Move up
            } else if (event.key === 'ArrowDown' && snakes[1].direction.y === 0) {
                snakes[1].direction = { x: 0, y: 1 }; // Move down
            } else if (event.key === 'ArrowLeft' && snakes[1].direction.x === 0) {
                snakes[1].direction = { x: -1, y: 0 }; // Move left
            } else if (event.key === 'ArrowRight' && snakes[1].direction.x === 0) {
                snakes[1].direction = { x: 1, y: 0 }; // Move right
            }
        }

        document.addEventListener('keydown', function(event) {
            if (event.key === 'r' || event.key === 'R') {
                location.reload();
            }
        });

        document.addEventListener('keydown', controlSnake); // Listen for keydown events for snake control
        startBtn.addEventListener('click', initGame); // Start the game on button click
        infoBtn.addEventListener('click', () => gameInfo.style.display = 'block'); // Show game info
        closeInfo.addEventListener('click', () => gameInfo.style.display = 'none'); // Hide game info
