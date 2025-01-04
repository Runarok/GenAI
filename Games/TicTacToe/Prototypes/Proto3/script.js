const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('game-status');
const toggleModeBtn = document.getElementById('toggle-mode');

let currentPlayer = 'X';
let gameActive = true;
let board = ['', '', '', '', '', '', '', '', ''];
let isComputerMode = false;

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

    if (board[clickedCellIndex] !== '' || !gameActive || (isComputerMode && currentPlayer === 'O')) {
        return;
    }

    board[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;

    if (!checkForWinner()) {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusText.innerHTML = `Player ${currentPlayer}'s turn`;

        if (isComputerMode && currentPlayer === 'O') {
            setTimeout(computerMove, 500); // Let the computer make a move
        }
    }
}

function computerMove() {
    if (!gameActive) return;

    let availableCells = [];
    board.forEach((cell, index) => {
        if (cell === '') availableCells.push(index);
    });

    if (availableCells.length > 0) {
        const randomIndex = Math.floor(Math.random() * availableCells.length);
        const cellIndex = availableCells[randomIndex];

        board[cellIndex] = 'O';
        cells[cellIndex].innerHTML = 'O';

        if (!checkForWinner()) {
            currentPlayer = 'X';
            statusText.innerHTML = `Player ${currentPlayer}'s turn`;
        }
    }
}

function resetBoard() {
    board = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => (cell.innerHTML = ''));
    currentPlayer = 'X';
    gameActive = true;
    statusText.innerHTML = `Player 1's turn`;
}

function toggleMode() {
    isComputerMode = !isComputerMode;
    toggleModeBtn.innerHTML = isComputerMode ? 'Play 2 Player Mode' : 'Play against Computer';
    resetBoard(); // Reset the board when mode is changed
}

cells.forEach(cell => cell.addEventListener('click', cellClick));
toggleModeBtn.addEventListener('click', toggleMode);
