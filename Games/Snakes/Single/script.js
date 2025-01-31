 const canvas = document.getElementById('game'); // Game canvas element
    const context = canvas.getContext('2d'); // 2D rendering context for the canvas
    const menu = document.getElementById('menu'); // Main menu element
    const scoreElement = document.getElementById('score'); // Score display element
    const finalScoreElement = document.getElementById('finalScore'); // Final score display element
    const infoElement = document.getElementById('info'); // Info section element

    let grid = 16; // Size of each grid square
    let count = 0; // Frame count for controlling speed
    let snakeSpeed = 5; // Initial speed of the snake
    let snakeColor = ''; // Variable to store snake color
    let score = 0; // Player's score
    let gameInterval; // Interval for the game loop
    let powerIntervalId; // Interval for spawning power-ups
    let isGameRunning = false; // Flag to track game state

    let snake, apples = [], powers = []; // Initialize snake, apples, and power-ups arrays

    const POWER_TYPES = {
      SPEED_UP: 0,
      SPEED_DOWN: 1,
      SCORE_UP: 2
    };

    // Initialize the game with board size and apple count
    function initGame(boardSize, appleCount) {
      canvas.width = boardSize * grid; // Set canvas width based on board size
      canvas.height = boardSize * grid; // Set canvas height based on board size

      // Initialize the snake at the center of the board
      snake = {
        x: Math.floor(boardSize / 2) * grid,
        y: Math.floor(boardSize / 2) * grid,
        dx: grid, // Snake starts moving right
        dy: 0, // No vertical movement initially
        cells: [], // Array to store snake cells
        maxCells: 4 // Initial length of the snake
      };
      
      apples = []; // Clear previous apples
      for (let i = 0; i < appleCount; i++) {
        spawnApple(); // Spawn apples based on the count
      }
      
      powers = []; // Clear previous power-ups
      snakeColor = getRandomSnakeColor(); // Set random snake color
      score = 0; // Reset score
      updateScore(); // Update score display
    }

    // Start the game with the chosen settings
    function startGame() {
      if (isGameRunning) return; // Prevent starting multiple games

      // Get game settings from the menu
      const boardSize = parseInt(document.getElementById('boardSize').value);
      const speedInput = parseInt(document.getElementById('speed').value);
      const multipleApplesToggle = document.getElementById('multipleApplesToggle').checked;
      const appleCount = multipleApplesToggle ? parseInt(document.getElementById('appleCount').value) : 1;
      const powerToggle = document.getElementById('powerToggle').checked;
      const powerInterval = parseInt(document.getElementById('powerInterval').value) * 1000;

      snakeSpeed = 11 - speedInput; // Convert input speed to actual game speed
      grid = Math.floor(400 / boardSize); // Set grid size based on board size
      if (400 % boardSize !== 0) {
        alert('Board size must evenly divide 400 for proper grid alignment.'); // Alert if board size is invalid
        return;
      }

      initGame(boardSize, appleCount); // Initialize the game
      menu.style.display = 'none'; // Hide the menu
      canvas.style.display = 'block'; // Show the game canvas
      scoreElement.style.display = 'block'; // Show the score display
      
      gameInterval = setInterval(loop, snakeSpeed * 100); // Start the game loop based on snake speed
      
      if (powerToggle) {
        powerIntervalId = setInterval(spawnPower, powerInterval); // Start spawning power-ups if enabled
      }
      
      isGameRunning = true; // Set game as running
    }

    // Spawn a new apple at a random position
    function spawnApple() {
      let newApple;
      do {
        newApple = {
          x: getRandomInt(0, canvas.width / grid) * grid, // Random x position
          y: getRandomInt(0, canvas.height / grid) * grid, // Random y position
          color: getRandomAppleColor() // Random color for the apple
        };
      } while (isOccupied(newApple.x, newApple.y)); // Ensure the position is not occupied
      apples.push(newApple); // Add the new apple to the array
    }

    // Spawn a new power-up at a random position
    function spawnPower() {
      let newPower;
      const type = getRandomPowerType(); // Get random power type
      do {
        newPower = {
          x: getRandomInt(0, canvas.width / grid) * grid, // Random x position
          y: getRandomInt(0, canvas.height / grid) * grid, // Random y position
          color: 'magenta', // Fixed color for power-ups
          type: type // Assign type
        };
      } while (isOccupied(newPower.x, newPower.y)); // Ensure the position is not occupied
      powers.push(newPower); // Add the new power-up to the array
    }

    // Check if a position is occupied by the snake, apples, or power-ups
    function isOccupied(x, y) {
      if (snake.cells.some(cell => cell.x === x && cell.y === y)) return true; // Check if occupied by snake
      if (apples.some(apple => apple.x === x && apple.y === y)) return true; // Check if occupied by apple
      return false; // Not occupied
    }

    // Get a random color for the apple
    function getRandomAppleColor() {
      const appleColors = ['red', 'orange']; // Possible apple colors
      return appleColors[Math.floor(Math.random() * appleColors.length)]; // Return random color
    }

    // Get a random color for the snake
    function getRandomSnakeColor() {
      const snakeColors = ['teal', 'cyan']; // Possible snake colors
      return snakeColors[Math.floor(Math.random() * snakeColors.length)]; // Return random color
    }

    // Get a random power type (0, 1, or 2)
    function getRandomPowerType() {
      return Math.floor(Math.random() * 3); // Return random integer between 0 and 2
    }

    // Get a random integer between min (inclusive) and max (exclusive)
    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min)) + min; // Random integer calculation
    }

    // Handle keyboard input for snake movement
    document.addEventListener('keydown', (e) => {
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
          if (snake.dy === 0) { // Prevent reversing direction
            snake.dx = 0;
            snake.dy = -grid; // Move up
          }
          break;
        case 'ArrowDown':
        case 's':
          if (snake.dy === 0) { // Prevent reversing direction
            snake.dx = 0;
            snake.dy = grid; // Move down
          }
          break;
        case 'ArrowLeft':
        case 'a':
          if (snake.dx === 0) { // Prevent reversing direction
            snake.dx = -grid; // Move left
            snake.dy = 0;
          }
          break;
        case 'ArrowRight':
        case 'd':
          if (snake.dx === 0) { // Prevent reversing direction
            snake.dx = grid; // Move right
            snake.dy = 0;
          }
          break;
      }
    });

    // Main game loop for updating the game state
    function loop() {
      if (++count < 1) { // Control the speed of the game loop
        return; // Skip this loop iteration
      }
      count = 0; // Reset count for next iteration

      context.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

      // Update snake position
      snake.x += snake.dx;
      snake.y += snake.dy;

      // Wrap the snake around the canvas edges
      if (snake.x < 0) snake.x = canvas.width - grid;
      else if (snake.x >= canvas.width) snake.x = 0;
      if (snake.y < 0) snake.y = canvas.height - grid;
      else if (snake.y >= canvas.height) snake.y = 0;

      // Check for apple collision
      apples.forEach((apple, index) => {
        if (snake.x === apple.x && snake.y === apple.y) {
          score += 10; // Increase score
          updateScore(); // Update score display
          snake.maxCells++; // Increase snake length
          apples.splice(index, 1); // Remove apple from array
          spawnApple(); // Spawn new apple
        }
      });

      // Check for power-up collision
      powers.forEach((power, index) => {
        if (snake.x === power.x && snake.y === power.y) {
          applyPower(power.type); // Apply the effect of the power-up
          powers.splice(index, 1); // Remove power-up from array
        }
      });

      // Add new head to the snake
      snake.cells.unshift({ x: snake.x, y: snake.y });

      // Remove the tail if snake exceeds max length
      if (snake.cells.length > snake.maxCells) {
        snake.cells.pop();
      }

      // Check for self-collision
      for (let i = 1; i < snake.cells.length; i++) {
        if (snake.cells[i].x === snake.x && snake.cells[i].y === snake.y) {
          endGame(); // End game on collision
        }
      }

      // Draw the snake
      context.fillStyle = snakeColor; // Set snake color
      snake.cells.forEach((cell) => {
        context.fillRect(cell.x, cell.y, grid - 1, grid - 1); // Draw each segment
      });

      // Draw apples
      apples.forEach(apple => {
        context.fillStyle = apple.color; // Set apple color
        context.fillRect(apple.x, apple.y, grid - 1, grid - 1); // Draw apple
      });

      // Draw power-ups
      powers.forEach(power => {
        context.fillStyle = power.color; // Fixed to magenta
        context.fillRect(power.x, power.y, grid - 1, grid - 1); // Draw power-up
        context.fillStyle = 'white'; // Draw type number
        context.font = '12px Arial'; // Set font for type display
        context.fillText(power.type + 1, power.x + 4, power.y + 12); // Display power type
      });
    }
 
      document.addEventListener('keydown', function(event) {
            if (event.key === 'r' || event.key === 'R') {
                location.reload();
            }
        });

    // Apply the effect of a collected power-up
    function applyPower(type) {
      switch (type) {
        case POWER_TYPES.SPEED_UP: // Speed up the snake
          snakeSpeed = Math.max(1, snakeSpeed - 1); // Decrease speed
          clearInterval(gameInterval); // Clear the current game interval
          gameInterval = setInterval(loop, snakeSpeed * 100); // Reset game interval with new speed
          break;
        case POWER_TYPES.SPEED_DOWN: // Slow down the snake
          snakeSpeed = Math.min(10, snakeSpeed + 1); // Increase speed
          clearInterval(gameInterval); // Clear the current game interval
          gameInterval = setInterval(loop, snakeSpeed * 100); // Reset game interval with new speed
          break;
        case POWER_TYPES.SCORE_UP: // Increase score directly
          score += 50; // Add bonus score
          updateScore(); // Update score display
          break;
      }
    }

    // Update the displayed score
    function updateScore() {
      scoreElement.textContent = `Score: ${score}`; // Update score display
    }

    // End the game and show final score
    function endGame() {
      clearInterval(gameInterval); // Stop game interval
      clearInterval(powerIntervalId); // Stop power-up spawning
      isGameRunning = false; // Set game as not running
      canvas.style.display = 'none'; // Hide game canvas
      scoreElement.style.display = 'none'; // Hide score display
      finalScoreElement.textContent = `Final Score: ${score}`; // Display final score
      finalScoreElement.style.display = 'block'; // Show final score
      menu.style.display = 'flex'; // Show menu again
    }

    // Show game information
    function showInfo() {
      infoElement.style.display = 'block'; // Show info overlay
    }

    // Hide game information
    function hideInfo() {
      infoElement.style.display = 'none'; // Hide info overlay
    }
