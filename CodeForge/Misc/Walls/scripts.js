let canvas = document.getElementById('matrixCanvas');
let ctx = canvas.getContext('2d');

// Set canvas dimensions to full screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let columns = Math.floor(canvas.width / 20);
let drops = [];

// Function to initialize drops based on density
function initializeDrops() {
    const density = parseInt(document.getElementById('density').value) || 1;
    columns = Math.floor(canvas.width / 20);
    drops = new Array(columns * density).fill(0); // Initialize to 0 for better performance
}

// Initialize drops
initializeDrops();

// Generate random matrix symbols
function randomSymbol() {
    const textInput = document.getElementById('textInput').value || '01';
    return textInput.charAt(Math.floor(Math.random() * textInput.length));
}

// Main function for drawing the matrix rain
function drawMatrix() {
    const bgColor = document.getElementById('bgColor').value;
    const symbolColor = document.getElementById('symbolColor').value;
    const fontStyle = document.getElementById('fontStyle').value;
    const fontSize = document.getElementById('fontSize').value;

    ctx.fillStyle = bgColor + '10'; // Add transparency to make the symbols more visible
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = symbolColor;
    ctx.font = `${fontSize}px ${fontStyle}`;

    const density = parseInt(document.getElementById('density').value) || 1;
    for (let i = 0; i < drops.length; i++) {
        let text = randomSymbol();
        let x = (i % columns) * 20; // Keep space based on symbol width
        let y = drops[i] * fontSize; // Adjust y based on font size

        ctx.fillText(text, x, y);

        // Reset the drop to the top of the screen
        if (y > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }

        // Move the drop down
        drops[i]++;
    }
}

let lastTimestamp = 0;
let rainSpeed = 50;

// Function to continuously update the matrix with adjustable speed
function startMatrixRain(timestamp) {
    if (lastTimestamp) {
        const delta = timestamp - lastTimestamp;
        if (delta >= rainSpeed) {
            drawMatrix();
            lastTimestamp = timestamp;
        }
    } else {
        lastTimestamp = timestamp;
    }
    requestAnimationFrame(startMatrixRain);
}

// Start the matrix rain initially
startMatrixRain();

// Event listener for window resize to adjust the canvas size dynamically
window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initializeDrops();
});

// Event listener for density change
document.getElementById('density').addEventListener('input', function() {
    initializeDrops(); // Reinitialize drops based on new density
});

// Event listener for rain speed change to adjust speed in real-time
document.getElementById('rainSpeed').addEventListener('input', function() {
    rainSpeed = this.value;  // Update rain speed based on user input
});

// Function to download the canvas as a PNG
function downloadImage() {
    const link = document.createElement('a');
    link.download = 'matrix_rain.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
}
