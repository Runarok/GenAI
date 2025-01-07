// Get references to HTML elements
const canvas = document.getElementById('mazeCanvas'); // The canvas where the maze will be drawn
const ctx = canvas.getContext('2d'); // 2D drawing context for the canvas
const timerDisplay = document.getElementById('timer'); // Timer display element
const toast = document.getElementById('toast'); // Toast notification element

// Grid properties and settings
const gridSize = 20; // Size of each grid cell in pixels
const cols = canvas.width / gridSize; // Number of columns based on canvas width
const rows = canvas.height / gridSize; // Number of rows based on canvas height

// Directions for movement (up, right, down, left)
const DIRECTIONS = [
    { x: 0, y: -1 }, // Up
    { x: 1, y: 0 },  // Right
    { x: 0, y: 1 },  // Down
    { x: -1, y: 0 }, // Left
];

// Constants representing different types of maze elements
const WALL = 1; // Wall cell
const PATH = 0; // Path cell
const PLAYER = 2; // Player position
const EXIT = 3; // Exit position
const TRAP = 4; // Trap position

// Game state variables
let maze = []; // The maze grid (2D array)
let playerPos = { x: 1, y: 1 }; // Player's starting position
let exitPos = { x: cols - 2, y: rows - 2 }; // Exit position (near bottom-right corner)
let traps = []; // Array to store trap positions
let gameStarted = false; // Flag to track if the game has started
let startTime = 0; // Timestamp for the game start
let gameTimer = null; // Timer interval
let movementDisabled = false; // Flag to disable movement after winning

// Function to generate the maze using Depth First Search (DFS) algorithm
function generateMaze() {
    // Initialize the maze with walls (1 represents wall)
    maze = Array.from({ length: rows }, () => Array(cols).fill(WALL));

    // DFS stack for generating maze paths
    const stack = [{ x: 1, y: 1 }]; // Start from (1, 1) (skip edges)
    maze[1][1] = PATH; // Mark starting position as path

    while (stack.length > 0) {
        const current = stack[stack.length - 1]; // Get the current position from the stack
        const { x, y } = current; // Destructure the current position
        const directions = DIRECTIONS.filter(d => {
            const nx = x + d.x * 2; // Check next position in x-direction (2 cells away)
            const ny = y + d.y * 2; // Check next position in y-direction (2 cells away)
            return nx >= 1 && ny >= 1 && nx < cols - 1 && ny < rows - 1 && maze[ny][nx] === WALL; // Check bounds and if it's a wall
        });

        if (directions.length > 0) {
            const dir = directions[Math.floor(Math.random() * directions.length)]; // Randomly choose a direction
            const nx = x + dir.x * 2; // New x position
            const ny = y + dir.y * 2; // New y position

            maze[ny][nx] = PATH; // Mark the new cell as path
            maze[y + dir.y][x + dir.x] = PATH; // Also mark the intermediate cell as path
            stack.push({ x: nx, y: ny }); // Push the new position onto the stack
        } else {
            stack.pop(); // If no directions are available, pop the stack
        }
    }

    maze[exitPos.y][exitPos.x] = EXIT; // Set exit position in the maze
}

// Function to randomly place traps in the maze
function placeTraps() {
    traps = []; // Clear the existing traps
    for (let i = 0; i < 5; i++) { // Place 5 traps randomly
        let trapPos;
        do {
            trapPos = { x: Math.floor(Math.random() * cols), y: Math.floor(Math.random() * rows) }; // Random position
        } while (maze[trapPos.y][trapPos.x] !== PATH || 
                 (trapPos.x === playerPos.x && trapPos.y === playerPos.y) || 
                 (trapPos.x === exitPos.x && trapPos.y === exitPos.y) || 
                 traps.some(t => Math.abs(t.x - trapPos.x) < 5 && Math.abs(t.y - trapPos.y) < 5)); // Ensure traps aren't too close to each other or player/exit
        traps.push(trapPos); // Add the trap to the traps array
    }
}

// Function to draw the maze, player, exit, and traps on the canvas
function drawMaze() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            const cell = maze[y][x]; // Get the current cell's value
            ctx.beginPath(); // Start a new drawing path
            ctx.rect(x * gridSize, y * gridSize, gridSize, gridSize); // Draw a rectangle for each grid cell

            if (cell === WALL) {
                ctx.fillStyle = '#333'; // Dark color for walls
            } else if (cell === PATH) {
                ctx.fillStyle = '#1d1d1d'; // Slightly lighter color for paths
            } else if (cell === PLAYER) {
                ctx.fillStyle = '#00bcd4'; // Cyan color for the player
            } else if (cell === EXIT) {
                ctx.fillStyle = '#009688'; // Teal color for the exit
            }

            ctx.fill(); // Fill the rectangle with the chosen color
            ctx.strokeStyle = '#222'; // Dark border color
            ctx.stroke(); // Draw the border around the cell
        }
    }

    // Draw traps as red circles
    traps.forEach(trap => {
        ctx.beginPath(); // Start a new path for the trap
        ctx.arc(trap.x * gridSize + gridSize / 2, trap.y * gridSize + gridSize / 2, gridSize / 3, 0, 2 * Math.PI); // Draw a circle
        ctx.fillStyle = 'red'; // Red color for traps
        ctx.fill(); // Fill the circle with red color
        ctx.strokeStyle = '#222'; // Dark border color
        ctx.stroke(); // Draw the border
    });
}

// Start the game timer
function startGameTimer() {
    gameStarted = true; // Set the game started flag
    startTime = Date.now(); // Get the current time as the start time
    gameTimer = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTime) / 1000); // Calculate the elapsed time in seconds
        const minutes = String(Math.floor(elapsed / 60)).padStart(2, '0'); // Get the minutes part
        const seconds = String(elapsed % 60).padStart(2, '0'); // Get the seconds part
        timerDisplay.textContent = `Time: ${minutes}:${seconds}`; // Update the timer display
    }, 1000); // Update every second
}

// Show toast message (win message)
function showToast(message) {
    toast.textContent = message; // Set the message text
    toast.classList.add('show'); // Make the toast visible

    setTimeout(() => {
        toast.classList.remove('show'); // Hide the toast after 3 seconds
    }, 3000); // 3-second duration
}

// Function to reset the game state, but keep the player's position
function resetGameState() {
    // Regenerate maze and place traps, but don't reset the player's position
    generateMaze();
    placeTraps();

    // Ensure that the player and exit positions are still set
    maze[playerPos.y][playerPos.x] = PLAYER; // Set player at current position
    maze[exitPos.y][exitPos.x] = EXIT; // Ensure exit position is set

    drawMaze(); // Redraw the maze with updated positions
    startGameTimer(); // Restart the timer
    movementDisabled = false; // Enable movement again
}

// Function to handle player movement based on input direction
function movePlayer(direction) {
    if (movementDisabled) return; // If movement is disabled, do nothing

    const newX = playerPos.x + direction.x; // Calculate the new x position
    const newY = playerPos.y + direction.y; // Calculate the new y position

    if (maze[newY] && maze[newY][newX] !== WALL) { // If the new position is within bounds and not a wall
        maze[playerPos.y][playerPos.x] = PATH; // Clear the previous position
        playerPos = { x: newX, y: newY }; // Update the player position
        maze[playerPos.y][playerPos.x] = PLAYER; // Set the new player position

        if (playerPos.x === exitPos.x && playerPos.y === exitPos.y) { // If the player reached the exit
            clearInterval(gameTimer); // Stop the timer
            showToast(`You Win! Time: ${timerDisplay.textContent.split(" ")[1]}`); // Show win message
            movementDisabled = true; // Disable further movement

            setTimeout(() => {
                resetGameState(); // Reset the maze and traps, but keep the player at the same position
            }, 3000); // Wait for 3 seconds before resetting
            location.reload();
        }

        // Check if the player stepped on a trap
        if (traps.some(trap => trap.x === playerPos.x && trap.y === playerPos.y)) {
            showToast("You stepped on a trap! Try again.");
            resetGameState(); // Reset game state, player stays in the same position
        }
    }
}

// Listen for keypress events to control the player movement
document.addEventListener('keydown', (e) => {
    if (!gameStarted) {
        startGameTimer(); // Start the game timer if the game hasn't started yet
    }

    const key = e.key.toLowerCase(); // Make the input case-insensitive

    switch (key) {
        case 'arrowup':
        case 'w': // 'W' or 'w' key to move up
            movePlayer(DIRECTIONS[0]);
            break;
        case 'arrowright':
        case 'd': // 'D' or 'd' key to move right
            movePlayer(DIRECTIONS[1]);
            break;
        case 'arrowdown':
        case 's': // 'S' or 's' key to move down
            movePlayer(DIRECTIONS[2]);
            break;
        case 'arrowleft':
        case 'a': // 'A' or 'a' key to move left
            movePlayer(DIRECTIONS[3]);
            break;
    }
    drawMaze(); // Redraw the maze after each move
});

// Start the game
function startGame() {
    generateMaze(); // Generate the initial maze
    placeTraps(); // Place traps in the maze
    maze[playerPos.y][playerPos.x] = PLAYER; // Set the player position in the maze
    maze[exitPos.y][exitPos.x] = EXIT; // Ensure exit position is set
    drawMaze(); // Draw the maze
    startGameTimer(); // Start the game timer
}

startGame(); // Initialize and start the game
