const gridSize = 30;
const grid = [];
let interval;
let isPlaying = false;

// Create the grid of cells
function createGrid() {
    const gridElement = document.getElementById("grid");
    gridElement.innerHTML = '';
    for (let y = 0; y < gridSize; y++) {
        const row = [];
        for (let x = 0; x < gridSize; x++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.addEventListener("click", () => toggleCellState(x, y));
            gridElement.appendChild(cell);
            row.push("empty");
        }
        grid.push(row);
    }
}

// Toggle cell state between empty, wire, head, and tail
function toggleCellState(x, y) {
    const currentState = grid[y][x];
    if (currentState === "empty") {
        grid[y][x] = "wire";
        updateCell(x, y);
    } else if (currentState === "wire") {
        grid[y][x] = "head";
        updateCell(x, y);
    } else if (currentState === "head") {
        grid[y][x] = "tail";
        updateCell(x, y);
    } else {
        grid[y][x] = "empty";
        updateCell(x, y);
    }
}

// Update the visual state of a cell
function updateCell(x, y) {
    const cell = document.getElementById("grid").children[y * gridSize + x];
    cell.classList.remove("wire", "head", "tail", "empty");
    if (grid[y][x] === "wire") {
        cell.classList.add("wire");
    } else if (grid[y][x] === "head") {
        cell.classList.add("head");
    } else if (grid[y][x] === "tail") {
        cell.classList.add("tail");
    } else {
        cell.classList.add("empty");
    }
}

// Start or pause the simulation
function togglePlayPause() {
    if (isPlaying) {
        clearInterval(interval);
        document.getElementById("playPauseButton").textContent = "Play";
    } else {
        interval = setInterval(() => {
            runSimulationStep();
        }, 500); // 500 ms delay for each step
        document.getElementById("playPauseButton").textContent = "Pause";
    }
    isPlaying = !isPlaying;
}

// Run one step of the simulation
function runSimulationStep() {
    const newGrid = grid.map(row => row.slice()); // Create a copy of the grid

    for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
            if (grid[y][x] === "head") {
                // Convert heads to tails
                newGrid[y][x] = "tail";
            } else if (grid[y][x] === "tail") {
                // Convert tails to wire
                newGrid[y][x] = "wire";
            } else if (grid[y][x] === "wire") {
                // Convert wire to head if it has 1 or 2 heads nearby
                const headCount = countHeadsAround(x, y);
                if (headCount === 1 || headCount === 2) {
                    newGrid[y][x] = "head";
                }
            }
        }
    }

    grid.length = 0; // Clear the grid
    grid.push(...newGrid); // Update the grid with the new state
    updateGridView(); // Update the visual grid
}

// Count the number of heads around a specific cell
function countHeadsAround(x, y) {
    let count = 0;
    const directions = [
        [-1, 0], [1, 0], [0, -1], [0, 1], // 4 neighbors
        [-1, -1], [1, 1], [-1, 1], [1, -1] // Diagonal neighbors
    ];

    for (const [dx, dy] of directions) {
        const nx = x + dx;
        const ny = y + dy;
        if (nx >= 0 && ny >= 0 && nx < gridSize && ny < gridSize && grid[ny][nx] === "head") {
            count++;
        }
    }

    return count;
}

// Update the visual grid after a simulation step
function updateGridView() {
    for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
            updateCell(x, y);
        }
    }
}

// Show the modal info
function showInfo() {
    document.getElementById("infoModal").style.display = "flex";
}

// Close the info modal
function closeInfo() {
    document.getElementById("infoModal").style.display = "none";
}

// Reset the simulation grid
function resetSimulation() {
    clearInterval(interval);
    isPlaying = false;
    document.getElementById("playPauseButton").textContent = "Play";
    for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
            grid[y][x] = "empty";
            updateCell(x, y);
        }
    }
}

// Initialize the grid
createGrid();
