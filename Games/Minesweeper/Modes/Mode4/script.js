const boardSize = 16; // Updated board size to 16
const numberOfMines = 40; // Total number of mines
let board = [];
let revealedCount = 0;
let minesLeft = numberOfMines;
let firstClick = true;

function createBoard() {
    // Initializes the board with cells
    board = Array.from({ length: boardSize }, () => 
        Array.from({ length: boardSize }, () => ({ 
            state: false, revealed: false, mine: false, marked: false, value: 0 
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

function renderBoard() {
    // Renders the board to the DOM
    const boardElement = document.getElementById('board');
    boardElement.innerHTML = ''; // Clear the board
    board.forEach((row, x) => {
        row.forEach((cell, y) => {
            const cellElement = document.createElement('div');
            cellElement.className = 'cell'; // Add cell class
            cellElement.dataset.x = x; // Set x coordinate
            cellElement.dataset.y = y; // Set y coordinate

            // Add click event listener to each cell
            cellElement.addEventListener('click', () => handleCellClick(x, y));

            // Update cell display based on its state
            if (cell.revealed) {
                cellElement.classList.add('revealed');
                if (cell.mine) {
                    cellElement.classList.add('mine');
                    cellElement.innerText = '💣'; // Mine icon
                } else {
                    cellElement.innerText = cell.value > 0 ? cell.value : ''; // Show value or empty
                }
            }
            if (cell.marked) {
                cellElement.classList.add('marked');
                cellElement.innerText = '🚩'; // Flag icon
            }

            boardElement.appendChild(cellElement); // Append cell to the board
        });
    });
}

function handleCellClick(x, y) {
    // Handles the click event on a cell
    if (firstClick) {
        placeMines(x, y); // Place mines on first click
        calculateValues(); // Calculate values after mines are placed
        firstClick = false; // Set first click flag to false
    }

    const cell = board[x][y];
    if (cell.marked) {
        // Unmark cell on left-click
        cell.marked = false; // Toggle marked state
        minesLeft++; // Increment mines left
        document.getElementById('minesCount').innerText = minesLeft; // Update mines display
        renderBoard(); // Re-render the board
        return;
    }

    if (cell.revealed) {
        // Check if the clicked cell is a number
        if (cell.value > 0) {
            const markedCount = countMarkedNeighbors(x, y);
            if (markedCount === cell.value) {
                revealSurroundingCells(x, y); // Reveal surrounding cells if marked count matches value
            }
        }
        return;
    }

    cell.revealed = true; // Reveal the clicked cell
    revealedCount++; // Increment revealed count

    if (cell.mine) {
        showToast('Game Over! You hit a mine!'); // Show toast on hitting a mine
        revealAllMines(); // Reveal all mines
        renderBoard(); // Re-render the board
        setTimeout(() => {
            resetGame(); // Reset the game after a short delay
        }, 500); // Delay in milliseconds (500 ms = 0.5 seconds)
        return;
    }

    if (cell.value === 0) {
        revealAdjacentCells(x, y); // Reveal adjacent cells if value is zero
    }

    renderBoard(); // Re-render the board after clicking
    checkWinCondition(); // Check if the player has won
}

function countMarkedNeighbors(x, y) {
    // Counts the number of marked neighbors around a cell
    let count = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) continue; // Skip the current cell
            const newX = x + i;
            const newY = y + j;
            // Check if the cell is within bounds and is marked
            if (newX >= 0 && newX < boardSize && newY >= 0 && newY < boardSize && board[newX][newY].marked) {
                count++; // Increment marked count
            }
        }
    }
    return count; // Return the count of marked neighbors
}

function revealSurroundingCells(x, y) {
    // Reveals surrounding cells when a cell with a number is clicked
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            const newX = x + i;
            const newY = y + j;
            // Check if the cell is within bounds
            if (newX >= 0 && newX < boardSize && newY >= 0 && newY < boardSize) {
                const neighbor = board[newX][newY];
                if (!neighbor.revealed && !neighbor.marked) {
                    neighbor.revealed = true; // Reveal neighbor
                    revealedCount++; // Increment revealed count
                    if (neighbor.value === 0) {
                        revealAdjacentCells(newX, newY); // Recursively reveal if value is zero
                    }
                }
            }
        }
    }
    renderBoard(); // Re-render the board after revealing
    checkWinCondition(); // Check if the player has won
}

function revealAdjacentCells(x, y) {
    // Reveals adjacent cells if value is zero
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            const newX = x + i;
            const newY = y + j;
            // Check if the cell is within bounds
            if (newX >= 0 && newX < boardSize && newY >= 0 && newY < boardSize) {
                const neighbor = board[newX][newY];
                if (!neighbor.revealed && !neighbor.marked) {
                    neighbor.revealed = true; // Reveal the neighbor
                    revealedCount++; // Increment the revealed count
                    if (neighbor.value === 0) {
                        revealAdjacentCells(newX, newY); // Recursively reveal if value is zero
                    }
                }
            }
        }
    }
    renderBoard(); // Re-render after revealing adjacent cells
    checkWinCondition(); // Check for win
}

function showToast(message) {
    // Show a toast notification with the given message
    const toast = document.getElementById('toast');
    toast.innerText = message;
    toast.classList.add('show'); // Show the toast
    setTimeout(() => toast.classList.remove('show'), 3000); // Hide toast after 3 seconds
}

function revealAllMines() {
    // Reveals all mines on the board
    for (let x = 0; x < boardSize; x++) {
        for (let y = 0; y < boardSize; y++) {
            const cell = board[x][y];
            if (cell.mine) {
                cell.revealed = true; // Reveal mine
            }
        }
    }
    renderBoard(); // Re-render the board after revealing all mines
}

function checkWinCondition() {
    // Check if the game has been won
    const totalCells = boardSize * boardSize;
    const nonMineCells = totalCells - numberOfMines;
    if (revealedCount === nonMineCells) {
        showToast('Congratulations! You win!'); // Show win toast
        setTimeout(() => {
            resetGame(); // Reset the game after a short delay
        }, 500); // Delay to show the toast
    }
}

function resetGame() {
    // Reset the game state and board
    firstClick = true;
    revealedCount = 0;
    minesLeft = numberOfMines;
    document.getElementById('minesCount').innerText = minesLeft;
    createBoard(); // Create a new board
}

document.getElementById('resetBtn').addEventListener('click', resetGame); // Add reset button functionality

// Initialize the game when the page loads
createBoard();
