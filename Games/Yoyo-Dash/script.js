window.onload = function() { // Wait for the window to load
    var canvas = document.getElementById("canvas"); // Get canvas element
    var ctx = canvas.getContext("2d"); // Get 2D context for drawing
    var width = canvas.width = window.innerWidth; // Set canvas width
    var height = canvas.height = window.innerHeight; // Set canvas height
    var radius = 30; // Radius of the player-controlled ball
    var centerX1 = width / 2; // Initial X position of the ball
    var centerY1 = height / 2; // Initial Y position of the ball
    var centerX2 = Math.random() * (width - radius * 2) + radius; // Random X for target ball
    var centerY2 = Math.random() * (height - radius * 2) + radius; // Random Y for target ball
    var velocityX1 = 0, velocityY1 = 0; // Initial velocity
    var gravityX1 = 0, gravityY1 = 0; // Gravity variables
    var bounce = 0.8, friction = 0.99; // Bounce and friction factors
    var collisionCount = 0, wallCollisionCount = 0; // Collision counts
    var dots = []; // Array to hold dots
    var numDots = 0; // Counter for dots
    var score = 0; // Initial score
    var dotInterval; // Interval for spawning dots

    var highScore = localStorage.getItem('highScore') || 0; // Load high score from local storage
    document.getElementById("highScore").innerText = highScore; // Display high score

    function spawnDot() { // Function to spawn dots
        if (dots.length < 10) { // Check if less than 10 dots exist
            dots.push({ // Add new dot to array
                x: Math.random() * (width - radius * 2) + radius, // Random X position
                y: Math.random() * (height - radius * 2) + radius, // Random Y position
                collected: false // Dot not collected
            });
        }
    }

    dotInterval = setInterval(spawnDot, 2000); // Spawn a dot every 2 seconds

    var myVar = setInterval(animation, 20); // Start animation loop

    function animation() { // Animation function
        if (centerX1 >= width - radius || centerX1 <= radius) { // Check for horizontal wall collision
            velocityX1 = -velocityX1 * bounce; // Reverse velocity with bounce effect
            centerX1 = Math.max(radius, Math.min(centerX1, width - radius)); // Clamp position
            wallCollisionCount++; // Increment wall collision count
        }
        if (centerY1 >= height - radius || centerY1 <= radius) { // Check for vertical wall collision
            velocityY1 = -velocityY1 * bounce; // Reverse velocity with bounce effect
            centerY1 = Math.max(radius, Math.min(centerY1, height - radius)); // Clamp position
            wallCollisionCount++; // Increment wall collision count
        }

        if (wallCollisionCount > 10) { // Check if wall collisions exceed limit
            resetGame(); // Reset game state
            return; // Exit animation function
        }

        centerX1 += velocityX1; // Update X position
        centerY1 += velocityY1; // Update Y position

        if (Math.sqrt(Math.pow(centerX1 - centerX2, 2) + Math.pow(centerY1 - centerY2, 2)) < radius * 2) { // Check for target collision
            score += 10; // Increase score
            centerX2 = Math.random() * (width - radius * 2) + radius; // Reset target X position
            centerY2 = Math.random() * (height - radius * 2) + radius; // Reset target Y position
        }

        dots = dots.filter(dot => { // Check for collisions with dots
            if (!dot.collected && Math.sqrt(Math.pow(centerX1 - dot.x, 2) + Math.pow(centerY1 - dot.y, 2)) < radius) {
                dot.collected = true; // Mark dot as collected
                score += 1; // Increase score
                return false; // Remove dot from array
            }
            return true; // Keep dot in array
        });

        velocityX1 = (velocityX1 + gravityX1) * friction; // Apply gravity and friction to velocity
        velocityY1 = (velocityY1 + gravityY1) * friction; // Apply gravity and friction to velocity

        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas for redrawing

        ctx.beginPath(); // Start drawing player ball
        ctx.arc(centerX1, centerY1, radius, 0, 2 * Math.PI); // Draw player ball
        ctx.fillStyle = `hsla(180, 100%, 50%, 1)`; // Set color for player ball
        ctx.shadowColor = 'hsla(180, 100%, 50%, 0.8)'; // Set shadow color
        ctx.shadowBlur = 20; // Set shadow blur
        ctx.fill(); // Fill player ball

        ctx.fillStyle = '#00ccff'; // Set color for symbol
        ctx.font = 'bold 24px Arial'; // Set font for symbol
        ctx.textAlign = 'center'; // Center align text
        ctx.textBaseline = 'middle'; // Middle align text
        ctx.fillText('★', centerX1, centerY1); // Draw symbol

        ctx.beginPath(); // Start drawing target ball
        ctx.arc(centerX2, centerY2, radius, 0, 2 * Math.PI); // Draw target ball
        ctx.fillStyle = '#007399'; // Set color for target ball
        ctx.fill(); // Fill target ball

        dots.forEach(dot => { // Iterate over dots
            if (!dot.collected) { // If dot not collected
                ctx.beginPath(); // Start drawing dot
                ctx.arc(dot.x, dot.y, radius / 4, 0, 2 * Math.PI); // Draw dot
                ctx.fillStyle = 'lime'; // Set color for dot
                ctx.shadowColor = 'lime'; // Set shadow color
                ctx.shadowBlur = 15; // Set shadow blur for glow effect
                ctx.fill(); // Fill dot
            }
        });

        ctx.beginPath(); // Start drawing line
        ctx.moveTo(centerX1, centerY1); // Move to player ball
        ctx.lineTo(mouseX, mouseY); // Draw line to mouse position
        ctx.strokeStyle = 'cyan'; // Set line color
        ctx.lineWidth = 2; // Set line width
        ctx.stroke(); // Draw line

        document.getElementById("scoreDisplay").innerText = score; // Update score display
        document.getElementById("wallCollisions").innerText = wallCollisionCount; // Update wall collision count
    }

    var mouseX = width / 2; // Initialize mouse X position
    var mouseY = height / 2; // Initialize mouse Y position

    canvas.addEventListener('mousemove', function(e) { // Mouse move event listener
        mouseX = e.clientX; // Update mouse X position
        mouseY = e.clientY; // Update mouse Y position
        gravityX1 = ((mouseX - width / 2) / (width / 2)) / 2; // Calculate gravity effect based on mouse position
        gravityY1 = ((mouseY - height / 2) / (height / 2)) / 2; // Calculate gravity effect based on mouse position
    });

    document.addEventListener('keydown', (e) => { // Keydown event listener
        if (e.key === 'r' || e.key === 'R') { // Check for 'R' key
            resetGame(); // Reset game state
        }
    });

    function resetGame() { // Reset game function
        wallCollisionCount = 0; // Reset wall collision count
        collisionCount = 0; // Reset collision count
        score = 0; // Reset score
        dots = []; // Clear existing dots
        clearInterval(dotInterval); // Stop previous dot spawning
        spawnDot(); // Spawn initial dots
        dotInterval = setInterval(spawnDot, 2000); // Restart dot spawning interval
        centerX1 = width / 2; // Reset player ball position
        centerY1 = height / 2; // Reset player ball position
        velocityX1 = 0; // Reset X velocity
        velocityY1 = 0; // Reset Y velocity
        document.getElementById("scoreDisplay").innerText = score; // Update score display
        document.getElementById("wallCollisions").innerText = wallCollisionCount; // Update wall collision display
    }
}
