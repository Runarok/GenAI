const boardSize = 8; // Updated board size to 8
const numberOfMines = 10; // Total number of mines
let board = [];
let revealedCount = 0;
let minesLeft = numberOfMines;
let firstClick = true;

function createBoard() {
    // Initializes the board with cells
    board = Array.from({ length: boardSize }, () =>
        Array.from({ length: boardSize }, () => ({
            state: false,
            revealed: false,
            mine: false,
            marked: false,
            value: 0
        }))
    );
    renderBoard(); // Render the board after creation
}

function placeMines(excludeX, excludeY) {
    // Places mines on the board, avoiding the first click position
    let minesPlaced = 0;
    while (minesPlaced < numberOfMines) {
        const x = Math.floor(Math.random() * boardSize);
        const y = Math.floor(Math.random() * boardSize);
        // Ensure no mines are placed in the surrounding cells of the first click
        if (!board[x][y].mine && (x !== excludeX || y !== excludeY) &&
            !areAdjacentCellsMined(x, y, excludeX, excludeY)) {
            board[x][y].mine = true; // Place a mine
            minesPlaced++; // Increment mines placed
        }
    }
}

function areAdjacentCellsMined(x, y, excludeX, excludeY) {
    // Checks if adjacent cells have mines
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) continue; // Skip the current cell
            const newX = x + i;
            const newY = y + j;
            // Check if the cell is within bounds and has a mine
            if (newX === excludeX && newY === excludeY) continue; // Skip the first click position
            if (newX >= 0 && newX < boardSize && newY >= 0 && newY < boardSize && board[newX][newY].mine) {
                return true; // Found an adjacent mine
            }
        }
    }
    return false; // No adjacent mines found
}

function calculateValues() {
    // Calculates the number of adjacent mines for each cell
    for (let x = 0; x < boardSize; x++) {
        for (let y = 0; y < boardSize; y++) {
            if (board[x][y].mine) {
                board[x][y].value = -1; // Indicate a mine
                continue; // Skip further calculations for mines
            }
            board[x][y].value = countAdjacentMines(x, y); // Count adjacent mines
        }
    }
}

function countAdjacentMines(x, y) {
    // Counts the number of mines adjacent to a given cell
    let count = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) continue; // Skip the current cell
            const newX = x + i;
            const newY = y + j;
            // Check if the cell is within bounds and has a mine
            if (newX >= 0 && newX < boardSize && newY >= 0 && newY < boardSize && board[newX][newY].mine) {
                count++; // Increment mine count
            }
        }
    }
    return count; // Return the count of adjacent mines
}

// Additional game logic for rendering, clicking, resetting, and checking win conditions...
