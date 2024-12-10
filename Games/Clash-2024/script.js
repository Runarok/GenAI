const boardElement = document.getElementById('board');
const scoreElement = document.getElementById('score');
const highScoreElement = document.getElementById('high-score');
const sizeSelect = document.getElementById('size-select');
const playButton = document.getElementById('play-button');
const resetButton = document.getElementById('reset-button');
const menu = document.getElementById('menu');
const game = document.getElementById('game');
let score = 0;
let highScore = 0;
let boardSize = parseInt(sizeSelect.value);
let board;

function initGame() {
    boardSize = parseInt(sizeSelect.value);
    board = Array.from({ length: boardSize }, () => Array(boardSize).fill(0));
    score = 0;
    updateHighScore();
    addRandomTile();
    addRandomTile();
    render();
}

function addRandomTile() {
    const emptyCells = [];
    for (let r = 0; r < boardSize; r++) {
        for (let c = 0; c < boardSize; c++) {
            if (board[r][c] === 0) {
                emptyCells.push({ r, c });
            }
        }
    }
    if (emptyCells.length > 0) {
        const { r, c } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        board[r][c] = Math.random() < 0.9 ? 2 : 4;
    }
}

function render() {
    boardElement.innerHTML = '';
    boardElement.style.gridTemplateColumns = `repeat(${boardSize}, 100px)`;
    board.forEach(row => {
        row.forEach(value => {
            const tile = document.createElement('div');
            tile.className = 'tile';
            tile.textContent = value !== 0 ? value : '';
            tile.style.backgroundColor = value !== 0 ? `hsl(${Math.log2(value) * 50}, 70%, 50%)` : '#555';
            boardElement.appendChild(tile);
        });
    });
    scoreElement.textContent = score;
    highScoreElement.textContent = highScore;
    saveGame();
}

function mergeTiles(row) {
    let moved = false;
    for (let r = 0; r < boardSize; r++) {
        let newRow = row[r].filter(value => value); // Remove zeros
        for (let c = 0; c < newRow.length - 1; c++) {
            if (newRow[c] === newRow[c + 1]) {
                newRow[c] *= 2;
                score += newRow[c];
                newRow[c + 1] = 0;
                moved = true;
            }
        }
        newRow = newRow.filter(value => value); // Remove zeros again
        while (newRow.length < boardSize) {
            newRow.push(0); // Fill with zeros
        }
        if (JSON.stringify(board[r]) !== JSON.stringify(newRow)) {
            moved = true;
            board[r] = newRow;
        }
    }
    return moved;
}

function move(direction) {
    let moved = false;
    if (direction === 'left') {
        moved = mergeTiles(board);
    } else if (direction === 'right') {
        for (let r = 0; r < boardSize; r++) {
            board[r] = board[r].reverse();
        }
        moved = mergeTiles(board);
        for (let r = 0; r < boardSize; r++) {
            board[r] = board[r].reverse();
        }
    } else if (direction === 'up') {
        for (let c = 0; c < boardSize; c++) {
            const column = [];
            for (let r = 0; r < boardSize; r++) {
                if (board[r][c] !== 0) column.push(board[r][c]);
            }
            let newColumn = column.filter(value => value);
            for (let r = 0; r < newColumn.length - 1; r++) {
                if (newColumn[r] === newColumn[r + 1]) {
                    newColumn[r] *= 2;
                    score += newColumn[r];
                    newColumn[r + 1] = 0;
                }
            }
            newColumn = newColumn.filter(value => value);
            while (newColumn.length < boardSize) {
                newColumn.push(0); // Fill with zeros
            }
            for (let r = 0; r < boardSize; r++) {
                board[r][c] = newColumn[r];
            }
        }
        moved = true;
    } else if (direction === 'down') {
        for (let c = 0; c < boardSize; c++) {
            const column = [];
            for (let r = 0; r < boardSize; r++) {
                if (board[r][c] !== 0) column.push(board[r][c]);
            }
            let newColumn = column.filter(value => value).reverse();
            for (let r = 0; r < newColumn.length - 1; r++) {
                if (newColumn[r] === newColumn[r + 1]) {
                    newColumn[r] *= 2;
                    score += newColumn[r];
                    newColumn[r + 1] = 0;
                }
            }
            newColumn = newColumn.filter(value => value).reverse();
            while (newColumn.length < boardSize) {
                newColumn.unshift(0); // Fill with zeros
            }
            for (let r = 0; r < boardSize; r++) {
                board[r][c] = newColumn[r];
            }
        }
        moved = true;
    }
    if (moved) {
        addRandomTile();
        render();
        checkGameOver();
    }
}

function checkGameOver() {
    for (let r = 0; r < boardSize; r++) {
        for (let c = 0; c < boardSize; c++) {
            if (board[r][c] === 0 || 
                (c < boardSize - 1 && board[r][c] === board[r][c + 1]) || 
                (r < boardSize - 1 && board[r][c] === board[r + 1][c])) {
                return false; // There are still valid moves
            }
        }
    }
    alert('Game Over! Your score: ' + score);
    updateHighScore();
    return true; // No valid moves left
}

function updateHighScore() {
    const storedHighScore = localStorage.getItem(`highScore_${boardSize}`);
    highScore = storedHighScore ? parseInt(storedHighScore) : 0;
    if (score > highScore) {
        highScore = score;
        localStorage.setItem(`highScore_${boardSize}`, highScore);
    }
}

function saveGame() {
    const gameState = {
        board,
        score
    };
    localStorage.setItem(`gameState_${boardSize}`, JSON.stringify(gameState));
}

function loadGame() {
    const gameState = localStorage.getItem(`gameState_${boardSize}`);
    if (gameState) {
        const { board: loadedBoard, score: loadedScore } = JSON.parse(gameState);
        board = loadedBoard;
        score = loadedScore;
        render();
    } else {
        initGame();
    }
}

function startGame() {
    menu.classList.remove('active');
    game.classList.add('active');
    initGame();
}

function resetGame() {
    menu.classList.add('active');
    game.classList.remove('active');
    score = 0; // Reset the score for the new game
    scoreElement.textContent = score;
    highScoreElement.textContent = highScore; // Keep the high score visible
}

document.addEventListener('keydown', (e) => {
    if (!game.classList.contains('active')) return; // Only listen for key events when the game is active
    if (e.repeat) return; // Prevent multiple moves on hold
    switch (e.key) {
        case 'ArrowLeft':
        case 'a':
            move('left');
            break;
        case 'ArrowRight':
        case 'd':
            move('right');
            break;
        case 'ArrowUp':
        case 'w':
            move('up');
            break;
        case 'ArrowDown':
        case 's':
            move('down');
            break;
    }
});

// Touch controls for mobile devices
let touchStartX = 0;
let touchStartY = 0;

document.addEventListener('touchstart', (event) => {
    touchStartX = event.touches[0].clientX;
    touchStartY = event.touches[0].clientY;
});

document.addEventListener('touchend', (event) => {
    if (!game.classList.contains('active')) return; // Only listen for touch events when the game is active
    const touchEndX = event.changedTouches[0].clientX;
    const touchEndY = event.changedTouches[0].clientY;

    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > 0) {
            move('right');
        } else {
            move('left');
        }
    } else {
        if (deltaY > 0) {
            move('down');
        } else {
            move('up');
        }
    }
    checkGameOver();
});

playButton.addEventListener('click', startGame);
resetButton.addEventListener('click', resetGame);

loadGame();
