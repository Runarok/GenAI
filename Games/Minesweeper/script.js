const numRows = 10;
const numCols = 10;
const numMines = 15;
let gameInterval;
let timer = 0;
let minesLeft = numMines;
let firstClick = true;

const gameBoard = document.getElementById("gameBoard");
const mineCountDisplay = document.getElementById("mineCount");
const timerDisplay = document.getElementById("timer");
const toast = document.getElementById("toast");
let board = [];

function startNewGame() {
    clearInterval(gameInterval);
    timer = 0;
    minesLeft = numMines;
    firstClick = true;
    mineCountDisplay.textContent = minesLeft;
    timerDisplay.textContent = timer;

    initializeBoard();
    renderBoard();
}

function initializeBoard() {
    board = [];
    for (let i = 0; i < numRows; i++) {
        board[i] = [];
        for (let j = 0; j < numCols; j++) {
            board[i][j] = {
                isMine: false,
                revealed: false,
                flagged: false,
                count: 0,
            };
        }
    }

    // Place mines randomly
    let minesPlaced = 0;
    while (minesPlaced < numMines) {
        const row = Math.floor(Math.random() * numRows);
        const col = Math.floor(Math.random() * numCols);
        if (!board[row][col].isMine) {
            board[row][col].isMine = true;
            minesPlaced++;
        }
    }

    // Calculate counts
    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
            if (!board[i][j].isMine) {
                let count = 0;
                for (let dx = -1; dx <= 1; dx++) {
                    for (let dy = -1; dy <= 1; dy++) {
                        const ni = i + dx;
                        const nj = j + dy;
                        if (ni >= 0 && ni < numRows && nj >= 0 && nj < numCols && board[ni][nj].isMine) {
                            count++;
                        }
                    }
                }
                board[i][j].count = count;
            }
        }
    }
}

function revealCell(row, col) {
    if (
        row < 0 ||
        row >= numRows ||
        col < 0 ||
        col >= numCols ||
        board[row][col].revealed ||
        board[row][col].flagged
    ) {
        return;
    }

    // Start the timer after the first click
    if (firstClick) {
        gameInterval = setInterval(() => {
            timer++;
            timerDisplay.textContent = timer;
        }, 1000);
        firstClick = false;
    }

    board[row][col].revealed = true;

    if (board[row][col].isMine) {
        showToast("Game Over! You stepped on a mine.");
        setTimeout(startNewGame, 1500);  // Auto-restart after a short delay
        clearInterval(gameInterval);
    } else if (board[row][col].count === 0) {
        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
                revealCell(row + dx, col + dy);
            }
        }
    }

    if (checkWin()) {
        clearInterval(gameInterval);
        showToast("You Win! Time: " + timer + " seconds");
    }

    renderBoard();
}

function flagCell(row, col) {
    if (board[row][col].revealed) {
        return;
    }

    board[row][col].flagged = !board[row][col].flagged;
    minesLeft += board[row][col].flagged ? -1 : 1;
    mineCountDisplay.textContent = minesLeft;
    renderBoard();
}

function checkWin() {
    let revealedCells = 0;
    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
            if (board[i][j].revealed && !board[i][j].isMine) {
                revealedCells++;
            }
        }
    }
    return revealedCells === (numRows * numCols - numMines);
}

function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");
    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}

function renderBoard() {
    gameBoard.innerHTML = "";

    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
            const cell = document.createElement("div");
            cell.className = "cell";
            if (board[i][j].revealed) {
                cell.classList.add("revealed");
                if (board[i][j].isMine) {
                    cell.classList.add("mine");
                    cell.textContent = "💣";
                } else if (board[i][j].count > 0) {
                    cell.textContent = board[i][j].count;
                    cell.setAttribute("data-count", board[i][j].count);
                }
            }

            if (board[i][j].flagged) {
                cell.classList.add("flagged");
                cell.textContent = "🚩";
            }

            cell.addEventListener("click", () => revealCell(i, j));
            cell.addEventListener("contextmenu", (e) => {
                e.preventDefault();
                flagCell(i, j);
            });

            gameBoard.appendChild(cell);
        }
    }
}

startNewGame();
