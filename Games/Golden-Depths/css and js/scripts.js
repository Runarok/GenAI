const gridSize = 8;
let playerPos = { x: 0, y: 0 }; // Starting position (1,1) in 0-indexed (0,0)
let wumpusPos, goldPos, pits = [], arrows = 3;
let direction = 'down'; // Player's current direction
let gameOverMessage = ''; // Store game over reason
const restrictedCells = [
    { x: 1, y: 2 }, // (1,2) in 0-indexed
    { x: 2, y: 1 }  // (2,1) in 0-indexed
];

// Initialize the game world
function initializeGame() {
    gameOverMessage = ''; // Reset game over message
    // Randomly place Wumpus, gold, and pits, making sure to avoid restricted cells
    wumpusPos = getRandomPosition();
    goldPos = getRandomPosition();
    pits = [];
    
    while (pits.length < 3) {
        let pit = getRandomPosition();
        if (!isSamePosition(pit, wumpusPos) && !isSamePosition(pit, goldPos)) {
            pits.push(pit);
        }
    }

    renderGrid();
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Get random position that isn't in restricted cells
function getRandomPosition() {
    let pos;
    do {
        pos = { x: randomInt(0, gridSize - 1), y: randomInt(0, gridSize - 1) };
    } while (isRestricted(pos));
    return pos;
}

// Check if the position is one of the restricted cells
function isRestricted(pos) {
    return restrictedCells.some(restricted => restricted.x === pos.x && restricted.y === pos.y);
}

function isSamePosition(pos1, pos2) {
    return pos1.x === pos2.x && pos1.y === pos2.y;
}

// Render the grid
function renderGrid() {
    const gridContainer = document.getElementById('grid');
    gridContainer.innerHTML = '';
    for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');

            // Show percepts for the current room
            if (x === playerPos.x && y === playerPos.y) {
                // Add sensory clues only for the current room
                if (isAdjacentToWumpus(x, y)) cell.classList.add('stench');
                if (isAdjacentToPit(x, y)) cell.classList.add('breeze');
                if (isAdjacentToGold(x, y)) cell.classList.add('glitter');
                // Highlight the current room
                cell.classList.add('current-room');
            }

            gridContainer.appendChild(cell);
        }
    }

    updateRoomDescription();
}

// Check for adjacent entities
function isAdjacentToWumpus(x, y) {
    return (Math.abs(x - wumpusPos.x) === 1 && y === wumpusPos.y) || (Math.abs(y - wumpusPos.y) === 1 && x === wumpusPos.x);
}

function isAdjacentToPit(x, y) {
    return pits.some(pit => (Math.abs(x - pit.x) === 1 && y === pit.y) || (Math.abs(y - pit.y) === 1 && x === pit.x));
}

function isAdjacentToGold(x, y) {
    return (Math.abs(x - goldPos.x) === 1 && y === goldPos.y) || (Math.abs(y - goldPos.y) === 1 && x === goldPos.x);
}

// Update room description with current percepts and direction
function updateRoomDescription() {
    let percepts = [];
    if (isAdjacentToWumpus(playerPos.x, playerPos.y)) percepts.push('Stench');
    if (isAdjacentToPit(playerPos.x, playerPos.y)) percepts.push('Breeze');
    if (isAdjacentToGold(playerPos.x, playerPos.y)) percepts.push('Glitter');

    const roomDesc = `You are in room (${playerPos.x + 1}, ${playerPos.y + 1}) looking ${direction}.`;
    const perceptDesc = percepts.length > 0 ? `Percepts: ${percepts.join(', ')}` : 'No percepts.';
    const arrowDesc = `${arrows} arrows left`;

    document.getElementById('roomDescription').textContent = roomDesc;
    document.getElementById('arrowCount').textContent = `${perceptDesc}, ${arrowDesc}`;
}

// Move the player in the specified direction
function movePlayer(directionInput) {
    if (gameOverMessage) return;

    switch (directionInput) {
        case 'up':
            if (playerPos.y > 0) playerPos.y--;
            direction = 'up';
            break;
        case 'down':
            if (playerPos.y < gridSize - 1) playerPos.y++;
            direction = 'down';
            break;
        case 'left':
            if (playerPos.x > 0) playerPos.x--;
            direction = 'left';
            break;
        case 'right':
            if (playerPos.x < gridSize - 1) playerPos.x++;
            direction = 'right';
            break;
    }
    checkGameStatus();
    renderGrid();
}

// Shoot the arrow
function shootArrow() {
    if (gameOverMessage) return;

    if (arrows > 0) {
        arrows--;
        if (isAdjacentToWumpus(playerPos.x, playerPos.y)) {
            showToast('You killed the Wumpus! You win!');
            gameOverMessage = 'You win!';
            setTimeout(resetGame, 2000);
        } else {
            showToast('Arrow missed.');
        }
    } else {
        showToast('Out of arrows!');
    }
}

// Check if the game is over (win or loss)
function checkGameStatus() {
    if (isSamePosition(playerPos, wumpusPos)) {
        showToast('You were eaten by the Wumpus! Game over!');
        gameOverMessage = 'Game over!';
        setTimeout(resetGame, 2000);
    } else if (isSamePosition(playerPos, goldPos)) {
        showToast('You found the gold! You win!');
        gameOverMessage = 'You win!';
        setTimeout(resetGame, 2000);
    } else if (pits.some(pit => pit.x === playerPos.x && pit.y === playerPos.y)) {
        showToast('You fell into a pit! Game over!');
        gameOverMessage = 'Game over!';
        setTimeout(resetGame, 2000);
    }
}

// Reset the game manually
function resetGame() {
    gameOverMessage = '';
    arrows = 3;
    playerPos = { x: 0, y: 0 }; // Reset to starting position
    initializeGame();
}

// Show toast messages
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = 'show';
    setTimeout(function () { toast.className = toast.className.replace("show", ""); }, 3000);
}

// Start the game when the page loads
window.onload = function () {
    initializeGame();
};

// Listen for WASD and E keys
window.addEventListener('keydown', function (e) {
    if (gameOverMessage) return;

    switch (e.key.toLowerCase()) {
        case 'w':
            movePlayer('up');
            break;
        case 's':
            movePlayer('down');
            break;
        case 'a':
            movePlayer('left');
            break;
        case 'd':
            movePlayer('right');
            break;
        case 'e':
            shootArrow();
            break;
        case 'q':
            resetGame();
            break;
            
    }
});
