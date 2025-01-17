// Detect if the user is on a mobile device
function isMobileDevice() {
  return /Mobi|Android|iPhone|iPad|iPod/.test(navigator.userAgent);
}

if (isMobileDevice()) {
  // Show the mobile message and disable interaction
  document.getElementById("mobileMessage").style.display = "block";
  document.getElementById("gridCanvas").style.display = "none";
  document.getElementById("controls").style.display = "none";
} else {
  // Canvas and simulation logic for PC users
  const canvas = document.getElementById("gridCanvas");
  const ctx = canvas.getContext("2d");

  let scale = 20; // Cell size (initial)
  let minScale = 10; // Minimum scale (max zoom-out)
  let maxScale = 100; // Maximum scale (max zoom-in)
  let offsetX = 0; // X-offset for panning
  let offsetY = 0; // Y-offset for panning
  let zoomFactor = 1.1; // Zoom speed

  let cells = {}; // Stores the grid's "alive" cells
  let isPanning = false;
  let startX, startY;

  // Simulation State
  let running = false;
  let simulationInterval;

  // Resize canvas dynamically
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drawGrid();
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  // Get cell key from coordinates
  function getCellKey(x, y) {
    return `${x},${y}`;
  }

  // Draw the grid
  function drawGrid() {
    ctx.fillStyle = "#121212"; // Background
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Align the grid offsets to prevent misalignment
    const alignedOffsetX = offsetX % scale;
    const alignedOffsetY = offsetY % scale;

    // Draw gridlines
    ctx.strokeStyle = "#333";
    ctx.lineWidth = 1;
    for (let x = alignedOffsetX; x <= canvas.width; x += scale) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = alignedOffsetY; y <= canvas.height; y += scale) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    // Draw cells
    ctx.fillStyle = "#4CAF50"; // Green for alive cells
    for (let key in cells) {
      const [x, y] = key.split(",").map(Number);
      const screenX = x * scale + offsetX;
      const screenY = y * scale + offsetY;

      // Only draw cells that are visible on the screen
      if (
        screenX >= 0 &&
        screenX < canvas.width &&
        screenY >= 0 &&
        screenY < canvas.height
      ) {
        ctx.fillRect(screenX, screenY, scale, scale);
      }
    }
  }

  // Convert screen to grid coordinates
  function screenToGrid(x, y) {
    return [
      Math.floor((x - offsetX) / scale),
      Math.floor((y - offsetY) / scale),
    ];
  }

  // Toggle cell state
  canvas.addEventListener("click", (event) => {
    const [x, y] = screenToGrid(event.clientX, event.clientY);
    const key = getCellKey(x, y);
    if (cells[key]) {
      delete cells[key];
    } else {
      cells[key] = true;
    }
    drawGrid();
    saveGridState();
  });

  // Zoom in and out
  canvas.addEventListener("wheel", (event) => {
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    const [gridX, gridY] = screenToGrid(mouseX, mouseY);

    // Calculate new scale while respecting minScale and maxScale
    if (event.deltaY < 0) {
      // Zoom in
      scale = Math.min(maxScale, scale * zoomFactor);
    } else {
      // Zoom out
      scale = Math.max(minScale, scale / zoomFactor);
    }

    // Adjust offsets to keep the zoom centered around the mouse pointer
    const [newGridX, newGridY] = screenToGrid(mouseX, mouseY);
    offsetX += (newGridX - gridX) * scale;
    offsetY += (newGridY - gridY) * scale;

    drawGrid();
  });

  // Panning
  canvas.addEventListener("mousedown", (event) => {
    if (event.button === 1 || event.button === 2) {
      isPanning = true;
      startX = event.clientX;
      startY = event.clientY;
      canvas.style.cursor = "grabbing";
    }
  });
  canvas.addEventListener("mousemove", (event) => {
    if (isPanning) {
      offsetX += event.clientX - startX;
      offsetY += event.clientY - startY;
      startX = event.clientX;
      startY = event.clientY;
      drawGrid();
    }
  });
  canvas.addEventListener("mouseup", () => {
    isPanning = false;
    canvas.style.cursor = "pointer";
  });
  canvas.addEventListener("contextmenu", (event) => event.preventDefault());

  // Simulation logic
  function stepSimulation() {
    const newCells = {};
    const neighbors = {};

    for (let key in cells) {
      const [x, y] = key.split(",").map(Number);

      for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
          const nx = x + dx;
          const ny = y + dy;
          const neighborKey = getCellKey(nx, ny);
          if (dx === 0 && dy === 0) continue;

          neighbors[neighborKey] = (neighbors[neighborKey] || 0) + 1;
        }
      }
    }

    for (let key in neighbors) {
      const count = neighbors[key];
      if (count === 3 || (count === 2 && cells[key])) {
        newCells[key] = true;
      }
    }

    cells = newCells;
    drawGrid();
    saveGridState();
  }

  document.getElementById("start").addEventListener("click", () => {
    if (!running) {
      running = true;
      simulationInterval = setInterval(stepSimulation, 100);
    }
  });

  document.getElementById("pause").addEventListener("click", () => {
    running = false;
    clearInterval(simulationInterval);
  });

  document.getElementById("step").addEventListener("click", stepSimulation);

  document.getElementById("reset").addEventListener("click", () => {
    cells = {};
    drawGrid();
    saveGridState();
  });

  // Keyboard Shortcuts for Play/Pause, Reset, Step
  window.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
      if (!running) {
        running = true;
        simulationInterval = setInterval(stepSimulation, 100);
      } else {
        running = false;
        clearInterval(simulationInterval);
      }
    } else if (event.code === "KeyR") {
      cells = {};
      drawGrid();
      saveGridState();
    } else if (event.code === "KeyS") {
      stepSimulation();
    }
  });

  // LocalStorage
  function saveGridState() {
    localStorage.setItem("gridState", JSON.stringify(cells));
  }

  function loadGridState() {
    const savedState = localStorage.getItem("gridState");
    if (savedState) {
      cells = JSON.parse(savedState);
      drawGrid();
    }
  }

  // Load the saved grid state on page load
  loadGridState();

  drawGrid();
}
