const boardSize = 40; // Updated board size to 40
const numberOfMines = 300; // Total number of mines
let board = [];
let revealedCount = 0;
let minesLeft = numberOfMines;
let firstClick = true;

function createBoard() {
    board = Array.from({ length: boardSize }, () => 
        Array.from({ length: boardSize }, () => ({ 
            state: false, revealed: false, mine: false, marked: false, value: 0 
        }))
    );
    renderBoard(); 
}

function placeMines(excludeX, excludeY) {
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
        setTimeout(() => resetGame(), 500);
        return;
    }

    if (cell.value === 0) {
        revealAdjacentCells(x, y);
    }

    renderBoard();
    checkWinCondition();
}

function countMarkedNeighbors(x, y) {
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
    if (revealedCount === boardSize * boardSize - numberOfMines) {
        showToast('Congratulations! You win!');
    }
}

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.innerText = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

document.getElementById('resetBtn').addEventListener('click', resetGame);

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

document.addEventListener('keydown', (e) => {
    if (e.key === 'r' || e.key === 'R') {
        resetGame();
    }
});

function resetGame() {
    minesLeft = numberOfMines;
    revealedCount = 0;
    firstClick = true;
    createBoard();
    document.getElementById('minesCount').innerText = minesLeft;
}

createBoard();
