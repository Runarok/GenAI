const boardSize = 30; // Updated board size to 30
const numberOfMines = 150; // Updated total number of mines
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
        if (!board[x][y].mine && (x !== excludeX || y !== excludeY) && 
            !areAdjacentCellsMined(x, y, excludeX, excludeY)) {
            board[x][y].mine = true;
            minesPlaced++;
        }
    }
}

function areAdjacentCellsMined(x, y, excludeX, excludeY) {
    // Checks if adjacent cells have mines
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) continue;
            const newX = x + i;
            const newY = y + j;
            if (newX === excludeX && newY === excludeY) continue;
            if (newX >= 0 && newX < boardSize && newY >= 0 && newY < boardSize && board[newX][newY].mine) {
                return true;
            }
        }
    }
    return false;
}

function calculateValues() {
    // Calculates the number of adjacent mines for each cell
    for (let x = 0; x < boardSize; x++) {
        for (let y = 0; y < boardSize; y++) {
            if (board[x][y].mine) {
                board[x][y].value = -1;
                continue;
            }
            board[x][y].value = countAdjacentMines(x, y);
        }
    }
}

function countAdjacentMines(x, y) {
    // Counts the number of mines adjacent to a given cell
    let count = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) continue;
            const newX = x + i;
            const newY = y + j;
            if (newX >= 0 && newX < boardSize && newY >= 0 && newY < boardSize && board[newX][newY].mine) {
                count++;
            }
        }
    }
    return count;
}

function renderBoard() {
    // Renders the board to the DOM
    const boardElement = document.getElementById('board');
    boardElement.innerHTML = '';
    board.forEach((row, x) => {
        row.forEach((cell, y) => {
            const cellElement = document.createElement('div');
            cellElement.className = 'cell';
            cellElement.dataset.x = x;
            cellElement.dataset.y = y;

            cellElement.addEventListener('click', () => handleCellClick(x, y));

            if (cell.revealed) {
                cellElement.classList.add('revealed');
                if (cell.mine) {
                    cellElement.classList.add('mine');
                    cellElement.innerText = '💣';
                } else {
                    cellElement.innerText = cell.value > 0 ? cell.value : '';
                }
            }
            if (cell.marked) {
                cellElement.classList.add('marked');
                cellElement.innerText = '🚩';
            }

            boardElement.appendChild(cellElement);
        });
    });
}

function handleCellClick(x, y) {
    // Handles the click event on a cell
    if (firstClick) {
        placeMines(x, y);
        calculateValues();
        firstClick = false;
    }

    const cell = board[x][y];
    if (cell.marked) {
        cell.marked = false;
        minesLeft++;
        document.getElementById('minesCount').innerText = minesLeft;
        renderBoard();
        return;
    }

    if (cell.revealed) {
        if (cell.value > 0) {
            const markedCount = countMarkedNeighbors(x, y);
            if (markedCount === cell.value) {
                revealSurroundingCells(x, y);
            }
        }
        return;
    }

    cell.revealed = true;
    revealedCount++;

    if (cell.mine) {
        showToast('Game Over! You hit a mine!');
        revealAllMines();
        renderBoard();
        setTimeout(() => {
            resetGame();
        }, 500);
        return;
    }

    if (cell.value === 0) {
        revealAdjacentCells(x, y);
    }

    renderBoard();
    checkWinCondition();
}

function countMarkedNeighbors(x, y) {
    // Counts the number of marked neighbors around a cell
    let count = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) continue;
            const newX = x + i;
            const newY = y + j;
            if (newX >= 0 && newX < boardSize && newY >= 0 && newY < boardSize && board[newX][newY].marked) {
                count++;
            }
        }
    }
    return count;
}

function revealSurroundingCells(x, y) {
    // Reveals surrounding cells when a cell with a number is clicked
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            const newX = x + i;
            const newY = y + j;
            if (newX >= 0 && newX < boardSize && newY >= 0 && newY < boardSize) {
                const neighbor = board[newX][newY];
                if (!neighbor.revealed && !neighbor.marked) {
                    neighbor.revealed = true;
                    revealedCount++;
                    if (neighbor.value === 0) {
                        revealAdjacentCells(newX, newY);
                    }
                }
            }
        }
    }
    renderBoard();
    checkWinCondition();
}

function revealAdjacentCells(x, y) {
    // Reveals adjacent cells if value is zero
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            const newX = x + i;
            const newY = y + j;
            if (newX >= 0 && newX < boardSize && newY >= 0 && newY < boardSize) {
                const neighbor = board[newX][newY];
                if (!neighbor.revealed) {
                    neighbor.revealed = true;
                    revealedCount++;
                    if (neighbor.value === 0) {
                        revealAdjacentCells(newX, newY);
                    }
                }
            }
        }
    }
    renderBoard();
}

function revealAllMines() {
    // Reveals all mines on the board
    board.forEach(row => {
        row.forEach(cell => {
            if (cell.mine) {
                cell.revealed = true;
            }
        });
    });
    renderBoard();
}

function checkWinCondition() {
    // Checks if the player has won
    if (revealedCount === boardSize * boardSize - numberOfMines) {
        showToast('Congratulations! You win!');
    }
}

function showToast(message) {
    // Displays a toast message
    const toast = document.getElementById('toast');
    toast.innerText = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

document.getElementById('resetBtn').addEventListener('click', () => {
    resetGame();
});

document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    const x = e.target.dataset.x;
    const y = e.target.dataset.y;
    if (x !== undefined && y !== undefined) {
        const cell = board[parseInt(x)][parseInt(y)];
        if (!cell.revealed) {
            cell.marked = !cell.marked;
            minesLeft += cell.marked ? -1 : 1;
            document.getElementById('minesCount').innerText = minesLeft;
            renderBoard();
        }
    }
});

function resetGame() {
    firstClick = true;
    revealedCount = 0;
    minesLeft = numberOfMines;
    createBoard();
}

createBoard();
