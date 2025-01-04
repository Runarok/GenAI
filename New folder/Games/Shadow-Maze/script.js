// Get references to HTML elements (canvas, timer, toast)
const canvas = document.getElementById('mazeCanvas');
const ctx = canvas.getContext('2d'); // 2D context for drawing on the canvas
const timerDisplay = document.getElementById('timer');
const toast = document.getElementById('toast');

// Grid settings: size of each cell in the maze and the number of rows and columns
const gridSize = 20;
const cols = canvas.width / gridSize; // Number of columns in the maze
const rows = canvas.height / gridSize; // Number of rows in the maze

// Directions array to help move the player (up, right, down, left)
const DIRECTIONS = [
    { x: 0, y: -1 }, // Up (decrease y-coordinate)
    { x: 1, y: 0 },  // Right (increase x-coordinate)
    { x: 0, y: 1 },  // Down (increase y-coordinate)
    { x: -1, y: 0 }, // Left (decrease x-coordinate)
];

// Constants representing the different cell types in the maze
const WALL = 1;   // Wall cell
const PATH = 0;   // Path cell
const PLAYER = 2; // Player position
const EXIT = 3;   // Exit position

// Variables to store the maze, player position, and game state
let maze = [];
let playerPos = { x: 1, y: 1 }; // Initial player position
let exitPos = { x: cols - 2, y: rows - 2 }; // Exit position
let gameStarted = false; // Flag to track if the game has started
let startTime = 0; // Game start time (used for timer)
let gameTimer = null; // Timer reference
let movementDisabled = false; // Flag to disable movement after winning

// Function to generate the maze using a Depth First Search (DFS) algorithm
function generateMaze() {
    maze = Array.from({ length: rows }, () => Array(cols).fill(WALL)); // Initialize maze with walls

    const stack = [{ x: 1, y: 1 }]; // Stack for DFS, starting from the top-left corner
    maze[1][1] = PATH; // Mark the starting position as a path

    // DFS loop to generate the maze
    while (stack.length > 0) {
        const current = stack[stack.length - 1];
        const { x, y } = current;
        const directions = DIRECTIONS.filter(d => {
            const nx = x + d.x * 2; // Next x-coordinate (2 steps in the direction)
            const ny = y + d.y * 2; // Next y-coordinate (2 steps in the direction)
            return nx >= 1 && ny >= 1 && nx < cols - 1 && ny < rows - 1 && maze[ny][nx] === WALL;
        });

        if (directions.length > 0) {
            const dir = directions[Math.floor(Math.random() * directions.length)];
            const nx = x + dir.x * 2;
            const ny = y + dir.y * 2;

            maze[ny][nx] = PATH; // Mark the new path cell
            maze[y + dir.y][x + dir.x] = PATH; // Connect to the current cell

            stack.push({ x: nx, y: ny }); // Add new position to the stack
        } else {
            stack.pop(); // Backtrack if no directions available
        }
    }

    maze[exitPos.y][exitPos.x] = EXIT; // Mark the exit position
}

// Function to draw the maze, player, and exit on the canvas
function drawMaze() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas before redrawing

    // Draw each cell of the maze
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            const cell = maze[y][x];
            ctx.beginPath();
            ctx.rect(x * gridSize, y * gridSize, gridSize, gridSize); // Draw the grid cell

            // Fill the cell with color based on the cell type
            if (cell === WALL) {
                ctx.fillStyle = '#333'; // Dark gray for walls
            } else if (cell === PATH) {
                ctx.fillStyle = '#1d1d1d'; // Dark gray for paths
            } else if (cell === PLAYER) {
                ctx.fillStyle = '#00bcd4'; // Cyan color for player
            } else if (cell === EXIT) {
                ctx.fillStyle = '#009688'; // Teal color for exit
            }

            ctx.fill(); // Fill the cell with the chosen color
            ctx.strokeStyle = '#222'; // Border color for cells
            ctx.stroke(); // Draw the border
        }
    }
}

// Function to start the game timer
function startGameTimer() {
    gameStarted = true;
    startTime = Date.now(); // Record the start time
    gameTimer = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTime) / 1000); // Calculate elapsed time in seconds
        const minutes = String(Math.floor(elapsed / 60)).padStart(2, '0'); // Format minutes
        const seconds = String(elapsed % 60).padStart(2, '0'); // Format seconds
        timerDisplay.textContent = `Time: ${minutes}:${seconds}`; // Update the timer display
    }, 1000); // Update every second
}

// Function to show a toast message when the player wins
function showToast() {
    const elapsed = Math.floor((Date.now() - startTime) / 1000); // Calculate time at win
    const minutes = String(Math.floor(elapsed / 60)).padStart(2, '0'); // Format minutes
    const seconds = String(elapsed % 60).padStart(2, '0'); // Format seconds
    const winTime = `${minutes}:${seconds}`; // Format win time

    toast.textContent = `You Win! Time: ${winTime}`; // Display win message
    toast.classList.add('show'); // Show the toast message

    // Hide the toast after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000); // 3-second delay before hiding the toast
}

// Function to move the player based on the current direction
function movePlayer(direction) {
    if (movementDisabled) return; // If movement is disabled, do nothing

    const newX = playerPos.x + direction.x; // Calculate new x position
    const newY = playerPos.y + direction.y; // Calculate new y position

    // If the new position is within bounds and not a wall
    if (maze[newY] && maze[newY][newX] !== WALL) {
        maze[playerPos.y][playerPos.x] = PATH; // Mark the current position as path
        playerPos = { x: newX, y: newY }; // Update player position
        maze[playerPos.y][playerPos.x] = PLAYER; // Set the new player position

        // If the player reaches the exit, win the game
        if (playerPos.x === exitPos.x && playerPos.y === exitPos.y) {
            clearInterval(gameTimer); // Stop the game timer
            showToast(); // Show the win message

            movementDisabled = true; // Disable movement after winning

            setTimeout(() => {
                // Reset the game state after a 3-second delay
                playerPos = { x: 1, y: 1 }; // Reset player position
                generateMaze(); // Regenerate the maze
                maze[playerPos.y][playerPos.x] = PLAYER; // Place player at start
                drawMaze(); // Redraw the maze
                startGameTimer(); // Restart the timer
                movementDisabled = false; // Re-enable movement
            }, 3000); // 3-second delay before resetting the game
        }
    }
}

// Event listener for keydown events (to move the player)
document.addEventListener('keydown', (e) => {
    if (!gameStarted) {
        startGameTimer(); // Start the game timer if the game hasn't started
    }

    // Convert the key to lowercase to support both upper and lower case keys
    switch (e.key.toLowerCase()) {
        case 'arrowup':
        case 'w': // 'W' key to move up
            movePlayer(DIRECTIONS[0]);
            break;
        case 'arrowright':
        case 'd': // 'D' key to move right
            movePlayer(DIRECTIONS[1]);
            break;
        case 'arrowdown':
        case 's': // 'S' key to move down
            movePlayer(DIRECTIONS[2]);
            break;
        case 'arrowleft':
        case 'a': // 'A' key to move left
            movePlayer(DIRECTIONS[3]);
            break;
    }
    drawMaze(); // Redraw the maze after each move
});

// Function to start the game (initialize the maze and player position)
function startGame() {
    generateMaze(); // Generate the maze
    maze[playerPos.y][playerPos.x] = PLAYER; // Place the player at the start
    drawMaze(); // Draw the maze on the canvas
}

// Call the startGame function to initialize the game
startGame();
