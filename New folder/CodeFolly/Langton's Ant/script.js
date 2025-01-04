let canvas = document.getElementById('gridCanvas');
let ctx = canvas.getContext('2d');

let gridSize = 101;
let cellSize = 6;
let delay = 5;
let isSimulationRunning = false;
let isAllowInserts = false;

let ants = [
    { x: Math.floor(gridSize / 2), y: Math.floor(gridSize / 2), dir: 0 } // Main ant
];

let grid = Array.from({ length: gridSize }, () => Array(gridSize).fill(0));

function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
            ctx.fillStyle = grid[y][x] === 0 ? '#3a3a3a' : '#212121'; // Darker grid colors
            ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
        }
    }

    ants.forEach((ant) => {
        ctx.fillStyle = "#ff0000"; // Color of the ant
        ctx.fillRect(ant.x * cellSize, ant.y * cellSize, cellSize, cellSize);
    });
}

function updateAnt(ant) {
    let currentCell = grid[ant.y][ant.x];

    if (currentCell === 0) {
        ant.dir = (ant.dir + 1) % 4; // Turn right
        grid[ant.y][ant.x] = 1;      // Change to black
    } else {
        ant.dir = (ant.dir + 3) % 4; // Turn left
        grid[ant.y][ant.x] = 0;      // Change to white
    }

    if (ant.dir === 0) ant.y--; // Up
    else if (ant.dir === 1) ant.x++; // Right
    else if (ant.dir === 2) ant.y++; // Down
    else if (ant.dir === 3) ant.x--; // Left

    if (ant.x < 0) ant.x = gridSize - 1;
    if (ant.x >= gridSize) ant.x = 0;
    if (ant.y < 0) ant.y = gridSize - 1;
    if (ant.y >= gridSize) ant.y = 0;
}

function toggleSimulation() {
    if (isSimulationRunning) {
        pauseSimulation();
    } else {
        startSimulation();
    }
}

function startSimulation() {
    isSimulationRunning = true;
    document.getElementById('playPauseButton').textContent = 'Pause';
    simulationStep();
}

function pauseSimulation() {
    isSimulationRunning = false;
    document.getElementById('playPauseButton').textContent = 'Play';
}

function simulationStep() {
    if (isSimulationRunning) {
        ants.forEach(updateAnt);
        drawGrid();
        setTimeout(simulationStep, delay);
    }
}

function resetGrid() {
    grid = Array.from({ length: gridSize }, () => Array(gridSize).fill(0));
    ants = [{ x: Math.floor(gridSize / 2), y: Math.floor(gridSize / 2), dir: 0 }];
    drawGrid();
}

function changeSpeed() {
    delay = parseInt(document.getElementById('speed').value);
    if (isSimulationRunning) {
        pauseSimulation();
        startSimulation();
    }
}

function changeGridSize() {
    gridSize = parseInt(document.getElementById('gridSize').value);
    cellSize = canvas.width / gridSize;
    resetGrid();
}

function toggleInfo() {
    const infoModal = document.getElementById('infoModal');
    infoModal.style.display = infoModal.style.display === 'block' ? 'none' : 'block';
}

function toggleInsertAnt() {
    isAllowInserts = !isAllowInserts;
}

function clearAnts() {
    ants = [{ x: Math.floor(gridSize / 2), y: Math.floor(gridSize / 2), dir: 0 }];
    drawGrid();
}

canvas.addEventListener('click', (e) => {
    if (isAllowInserts) {
        const x = Math.floor(e.offsetX / cellSize);
        const y = Math.floor(e.offsetY / cellSize);
        ants.push({ x, y, dir: 0 });
    }
});

drawGrid();
