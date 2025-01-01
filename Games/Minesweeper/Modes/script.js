// Function to parse URL parameters
function getUrlParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        mode: params.get('mode'),
        name: decodeURIComponent(params.get('name')),
        size: params.get('size') ? parseInt(params.get('size')) : getRandomSize(),
        mines: params.get('mines') ? parseInt(params.get('mines')) : getRandomMines(),
        minePercentage: params.get('minePercentage') ? parseFloat(params.get('minePercentage')) : getRandomMinePercentage()
    };
}

// Function to generate random size between 8 and 16 (board dimension)
function getRandomSize() {
    return Math.floor(Math.random() * 9) + 8;  // Random size between 8 and 16
}

// Function to generate random number of mines (10% to 20% of the total cells)
function getRandomMines() {
    const size = getRandomSize();
    const totalCells = size * size;
    return Math.floor(totalCells * 0.1);  // Random mines between 10% of total cells
}

// Function to generate random mine percentage between 0.1 (10%) and 0.2 (20%)
function getRandomMinePercentage() {
    return (Math.random() * 0.1) + 0.1;  // Random value between 0.1 and 0.2
}

const { name, size, mines, minePercentage } = getUrlParams();

// Set the title and header based on the name from URL
document.title = `Minesweeper - ${name}`;
document.getElementById('game-title').textContent = `Minesweeper - ${name}`;

// Display the board size and mine count
document.querySelector('.mine-count').textContent = `Mines: ${mines}`;

let minesArray = [];
let revealedCells = [];
let flaggedCells = [];
let gameOver = false;
let firstClick = true; // Flag to track the first click
let firstClickIndex = null; // To track the index of the first clicked cell

// Function to generate the game board
function generateBoard() {
    const board = document.getElementById('game-board');
    board.innerHTML = '';
    minesArray = [];
    revealedCells = [];
    flaggedCells = [];

    const rows = size;
    const cols = size;
    const totalCells = rows * cols;
    const cellSize = Math.floor(500 / rows);  // Set cell size relative to the board size

    // Set grid styles dynamically
    board.style.gridTemplateColumns = `repeat(${cols}, ${cellSize}px)`;
    board.style.gridTemplateRows = `repeat(${rows}, ${cellSize}px)`;

    // Generate the cells
    for (let i = 0; i < totalCells; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('data-index', i);
        cell.addEventListener('click', handleCellClick);
        cell.addEventListener('contextmenu', handleCellFlag);
        board.appendChild(cell);
    }
}

// Function to place mines randomly on the board
function placeMines() {
    while (minesArray.length < mines) {
        const randomIndex = Math.floor(Math.random() * (size * size));
        // Ensure the random mine is not placed in the first clicked cell
        if (randomIndex !== firstClickIndex && !minesArray.includes(randomIndex)) {
            minesArray.push(randomIndex);
        }
    }
}

// Function to calculate surrounding mine numbers for each cell
function calculateNumbers() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        const index = parseInt(cell.getAttribute('data-index'));
        if (minesArray.includes(index)) {
            return;
        }

        const surroundingMines = countSurroundingMines(index);
        if (surroundingMines > 0) {
            cell.dataset.number = surroundingMines;
        }
    });
}

// Function to count mines surrounding a given cell
function countSurroundingMines(index) {
    const row = Math.floor(index / size);
    const col = index % size;
    let mineCount = 0;

    const directions = [
        [-1, 0], [1, 0], [0, -1], [0, 1],
        [-1, -1], [-1, 1], [1, -1], [1, 1]
    ];

    directions.forEach(([dr, dc]) => {
        const newRow = row + dr;
        const newCol = col + dc;
        if (newRow >= 0 && newRow < size && newCol >= 0 && newCol < size) {
            const newIndex = newRow * size + newCol;
            if (minesArray.includes(newIndex)) {
                mineCount++;
            }
        }
    });

    return mineCount;
}

// Function to handle cell click event
function handleCellClick(event) {
    if (gameOver) return;
    const cell = event.target;
    const index = parseInt(cell.getAttribute('data-index'));

    // If it's the first click, make sure it's not a mine
    if (firstClick) {
        firstClick = false;  // Mark the first click as done
        firstClickIndex = index; // Store the first click's index
        placeMines();   // Place mines after the first click
    }

    if (flaggedCells.includes(index)) return;

    if (minesArray.includes(index)) {
        revealMines();
        gameOver = true;
        document.getElementById('status').textContent = 'Game Over';
        return;
    }

    revealCell(cell, index);
}

// Function to handle cell flag event (right-click)
function handleCellFlag(event) {
    event.preventDefault();
    if (gameOver) return;
    const cell = event.target;
    const index = parseInt(cell.getAttribute('data-index'));

    if (revealedCells.includes(index)) return;

    if (flaggedCells.includes(index)) {
        flaggedCells = flaggedCells.filter(id => id !== index);
        cell.classList.remove('flagged');
    } else {
        flaggedCells.push(index);
        cell.classList.add('flagged');
    }
}

// Function to reveal all mines when the game is over
function revealMines() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        const index = parseInt(cell.getAttribute('data-index'));
        if (minesArray.includes(index)) {
            cell.classList.add('mine');
        }
    });
}

// Function to reveal a cell
function revealCell(cell, index) {
    if (revealedCells.includes(index)) return;

    revealedCells.push(index);
    cell.classList.add('revealed');

    const surroundingMines = cell.dataset.number;
    if (surroundingMines) {
        cell.textContent = surroundingMines;
        cell.classList.add('number');
    } else {
        cell.classList.add('zero');
        revealSurroundingCells(index);
    }
}

// Function to recursively reveal surrounding cells with no mines
function revealSurroundingCells(index) {
    const row = Math.floor(index / size);
    const col = index % size;

    const directions = [
        [-1, 0], [1, 0], [0, -1], [0, 1],
        [-1, -1], [-1, 1], [1, -1], [1, 1]
    ];

    directions.forEach(([dr, dc]) => {
        const newRow = row + dr;
        const newCol = col + dc;
        if (newRow >= 0 && newRow < size && newCol >= 0 && newCol < size) {
            const newIndex = newRow * size + newCol;
            const cell = document.querySelector(`.cell[data-index="${newIndex}"]`);
            if (!revealedCells.includes(newIndex)) {
                revealCell(cell, newIndex);
            }
        }
    });
}

// Add back button functionality
document.getElementById('back-btn').addEventListener('click', () => {
    window.location.href = "https://runarok.github.io/GenAI/Games/Minesweeper/";
});

generateBoard();
