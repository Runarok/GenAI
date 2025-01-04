// Helper function for creating points (used for ball and dots)
function Pt(x, y) {
    this.x = x;  // X-coordinate
    this.y = y;  // Y-coordinate
}

// Function to create random dots
function Dot() {
    this.pos = new Pt(Math.random() * c.width, Math.random() * c.height);  // Assign random position
    this.radius = Math.random() * 10 + 5;  // Random radius between 5 and 15
}

// Ball class that handles drawing and movement
function Ball() {
    this.pos = new Pt(c.width / 2, c.height / 2);  // Ball's initial position
    this.mPos = new Pt(0, 0);  // Store mouse position
    this.Xvel = 0;  // X-axis velocity
    this.Yvel = 0;  // Y-axis velocity
    this.accel = new Pt(0, 0);  // Acceleration
    this.boundaryEnabled = true;  // Toggle for boundary constraints
}

// Draw the ball on canvas
Ball.prototype.draw = function () {
    $.fillStyle = "hsla(180, 100%, 50%, 1)";  // Set fill color for ball
    $.shadowColor = 'hsla(180, 100%, 50%, 0.8)';  // Set shadow color for glow effect
    $.shadowBlur = 20;  // Set shadow blur amount
    $.shadowOffsetX = 5;  // Set shadow horizontal offset
    $.shadowOffsetY = 5;  // Set shadow vertical offset
    $.beginPath();  // Start drawing a path
    $.arc(this.pos.x, this.pos.y, 60, 0, 2 * Math.PI);  // Draw a circle for the ball
    $.fill();  // Fill the circle with color
};

// Update ball's position and velocity
Ball.prototype.update = function () {
    this.accel.x = (this.mPos.x - this.pos.x) * 0.01;  // Calculate acceleration based on mouse X position
    this.accel.y = (this.mPos.y - this.pos.y) * 0.01;  // Calculate acceleration based on mouse Y position

    this.Xvel += this.accel.x;  // Update X velocity based on acceleration
    this.Yvel += this.accel.y;  // Update Y velocity based on acceleration

    this.pos.x += this.Xvel;  // Update ball's X position
    this.pos.y += this.Yvel;  // Update ball's Y position

    this.Xvel *= 0.97;  // Apply damping to X velocity
    this.Yvel *= 0.97;  // Apply damping to Y velocity

    // Boundary checks if boundaries are enabled
    if (this.boundaryEnabled) {
        const ballRadius = 60;  // Ball's radius
        if (this.pos.x < ballRadius) {
            this.pos.x = ballRadius;  // Reflect ball at left boundary
            this.Xvel *= -0.5;  // Reverse X velocity
        } else if (this.pos.x > c.width - ballRadius) {
            this.pos.x = c.width - ballRadius;  // Reflect ball at right boundary
            this.Xvel *= -0.5;  // Reverse X velocity
        }

        if (this.pos.y < ballRadius) {
            this.pos.y = ballRadius;  // Reflect ball at top boundary
            this.Yvel *= -0.5;  // Reverse Y velocity
        } else if (this.pos.y > c.height - ballRadius) {
            this.pos.y = c.height - ballRadius;  // Reflect ball at bottom boundary
            this.Yvel *= -0.5;  // Reverse Y velocity
        }
    }
};

// Update the mouse position
Ball.prototype.mouseMove = function (e) {
    this.mPos.x = e.clientX;  // Set mouse X position
    this.mPos.y = e.clientY;  // Set mouse Y position
};

// Resize canvas when the window is resized
function resizeCanv() {
    c.width = window.innerWidth;  // Set canvas width to window width
    c.height = window.innerHeight;  // Set canvas height to window height
    if (ball) ball.pos = new Pt(c.width / 2, c.height / 2);  // Reposition the ball when resized
}

// Initialize canvas and context
var c = document.getElementById('canv');  // Get canvas element
var $ = c.getContext('2d');  // Get 2D context for drawing

window.addEventListener('resize', resizeCanv, false);  // Handle window resize
resizeCanv();  // Initial canvas size adjustment

// Create an instance of the Ball
var ball = new Ball();

// Array to store random dots
var dots = [];
var numDots = 20;  // Set initial number of dots

// Function to spawn random dots
function spawnDots() {
    for (var i = 0; i < numDots; i++) {
        dots.push(new Dot());  // Add a new dot to the array
    }
}

// Initial dot spawning
spawnDots();

// Function to check for collision between ball and a dot
function checkCollision(dot) {
    const dx = dot.pos.x - ball.pos.x;  // Calculate X distance
    const dy = dot.pos.y - ball.pos.y;  // Calculate Y distance
    const distance = Math.sqrt(dx * dx + dy * dy);  // Calculate Euclidean distance
    return distance < 60 + dot.radius;  // Return true if the ball overlaps with the dot
}

// Remove dots that the ball has collided with
function removeHitDots() {
    for (var i = 0; i < dots.length; i++) {
        if (checkCollision(dots[i])) {
            dots.splice(i, 1);  // Remove the dot from the array
            i--;  // Adjust index after removal
        }
    }
}

// Function to draw all dots
function drawDots() {
    $.fillStyle = "hsla(100, 100%, 50%, 1)";  // Set fill color for dots
    for (var i = 0; i < dots.length; i++) {
        $.beginPath();  // Start drawing each dot
        $.arc(dots[i].pos.x, dots[i].pos.y, dots[i].radius, 0, 2 * Math.PI);  // Draw dot circle
        $.fill();  // Fill the dot with color
    }
}

// Periodic dot respawn function
function periodicDotRespawn() {
    setInterval(function () {
        // Only spawn new dots if there are fewer than numDots
        if (dots.length < numDots) {
            dots.push(new Dot());  // Add a new dot
        }
    }, 500);  // Every 0.5 seconds
}

// Call the function to periodically spawn dots
periodicDotRespawn();

// Handle mouse movements to update ball's mouse position
window.addEventListener('mousemove', function (e) {
    ball.mPos.x = e.clientX;  // Update X mouse position
    ball.mPos.y = e.clientY;  // Update Y mouse position
});

// Toggle button for enabling/disabling boundary constraints
document.getElementById('toggleBoundaries').addEventListener('click', function () {
    ball.boundaryEnabled = !ball.boundaryEnabled;  // Toggle boundary flag
    this.textContent = ball.boundaryEnabled ? "Disable Boundaries" : "Enable Boundaries";  // Update button text
});

// Request Animation Frame for smooth animations
window.requestAnimFrame = (function (callback) {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);  // Fall back to setTimeout if needed
        };
})();

// Animation loop
function animate() {
    ball.update();  // Update ball position and velocity
    $.clearRect(0, 0, c.width, c.height);  // Clear canvas
    ball.draw();  // Draw the ball
    drawDots();  // Draw the dots
    removeHitDots();  // Remove any dots the ball has hit
    window.requestAnimFrame(animate);  // Request the next frame
}

animate();  // Start the animation loop
