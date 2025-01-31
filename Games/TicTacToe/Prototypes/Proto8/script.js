const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('game-status');
const modeSelection = document.getElementById('mode-selection');
const resetButton = document.getElementById('reset-button');

let currentPlayer = 'X';
let gameActive = true;
let board = ['', '', '', '', '', '', '', '', ''];
let gameMode = 0; // 0 = 2 Player, 1 = Random AI, 2 = Smart AI (Minimax)
let firstTurnTaken = false;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Create the Xs and Os moving in the background
function generateBackgroundXO() {
    const container = document.getElementById('background-xo');
    for (let i = 0; i < 50; i++) {
        const span = document.createElement('span');
        span.textContent = Math.random() > 0.5 ? 'X' : 'O';
        if (span.textContent === 'O') span.classList.add('o');
        span.style.left = Math.random() * 100 + 'vw';
        span.style.animationDuration = Math.random() * 5 + 10 + 's';
        span.style.opacity = Math.random() * 0.3 + 0.1;
        container.appendChild(span);
    }
}

generateBackgroundXO();

function checkForWinner() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        let a = board[winCondition[0]];
        let b = board[winCondition[1]];
        let c = board[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusText.innerHTML = `Player ${currentPlayer} wins!`;
        gameActive = false;
        return true;
    }

    if (!board.includes('')) {
        statusText.innerHTML = "It's a draw!";
        gameActive = false;
        return true;
    }

    return false;
}

function cellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = clickedCell.getAttribute('data-index');

    if (board[clickedCellIndex] !== '' || !gameActive || (gameMode > 0 && currentPlayer === 'O')) {
        return;
    }

    // Disable mode dropdown after first move
    if (!firstTurnTaken) {
        modeSelection.disabled = true;
        firstTurnTaken = true;
    }

    board[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;

    if (!checkForWinner()) {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusText.innerHTML = `Player ${currentPlayer}'s turn`;

        if (gameMode > 0 && currentPlayer === 'O') {
            setTimeout(() => {
                if (gameMode === 1) {
                    playRandomMove();
                } else if (gameMode === 2) {
                    playSmartMove();
                }
            }, 500);
        }
    }
}

function playRandomMove() {
    let availableCells = board.map((cell, index) => cell === '' ? index : null).filter(index => index !== null);
    if (availableCells.length > 0) {
        const randomIndex = Math.floor(Math.random() * availableCells.length);
        const cellIndex = availableCells[randomIndex];

        board[cellIndex] = 'O';
        cells[cellIndex].innerHTML = 'O';

        if (!checkForWinner()) {
            currentPlayer = 'X';
            statusText.innerHTML = `Player X's turn`;
        }
    }
}

function playSmartMove() {
    let bestMove = getBestMove(board);
    board[bestMove.index] = 'O';
    cells[bestMove.index].innerHTML = 'O';

    if (!checkForWinner()) {
        currentPlayer = 'X';
        statusText.innerHTML = `Player X's turn`;
    }
}

function getBestMove(board) {
    let bestScore = -Infinity;
    let move;
    for (let i = 0; i < board.length; i++) {
        if (board[i] === '') {
            board[i] = 'O';
            let score = minimax(board, 0, false);
            board[i] = '';
            if (score > bestScore) {
                bestScore = score;
                move = { index: i };
            }
        }
    }
    return move;
}

function minimax(newBoard, depth, isMaximizing) {
    const result = evaluateBoard(newBoard);
    if (result !== null) {
        return result;
    }

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < newBoard.length; i++) {
            if (newBoard[i] === '') {
                newBoard[i] = 'O';
                let score = minimax(newBoard, depth + 1, false);
                newBoard[i] = '';
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < newBoard.length; i++) {
            if (newBoard[i] === '') {
                newBoard[i] = 'X';
                let score = minimax(newBoard, depth + 1, true);
                newBoard[i] = '';
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}

function evaluateBoard(board) {
    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a] === 'O' ? 10 : -10;
        }
    }

    if (!board.includes('')) {
        return 0;
    }
    return null;
}

function resetBoard() {
    board = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => (cell.innerHTML = ''));
    currentPlayer = 'X';
    gameActive = true;
    firstTurnTaken = false;
    statusText.innerHTML = `Player X's turn`;
    modeSelection.disabled = false;
}

function handleModeChange() {
    gameMode = parseInt(modeSelection.value);
    resetBoard();
}

cells.forEach(cell => cell.addEventListener('click', cellClick));
resetButton.addEventListener('click', resetBoard);
modeSelection.addEventListener('change', handleModeChange);
