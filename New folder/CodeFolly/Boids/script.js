const canvas = document.getElementById("boidCanvas");
const ctx = canvas.getContext("2d");

// Set canvas size to fill entire window
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas(); // Initial resize

const boids = [];
let dangerZone = null;
let maxBoids = 200; // Default limit for boids

// Helper function for creating random vectors
function randomVector(scale) {
    return {
        x: (Math.random() * 2 - 1) * scale,
        y: (Math.random() * 2 - 1) * scale
    };
}

// Boid constructor
function Boid(x, y) {
    this.position = { x, y };
    this.velocity = randomVector(2);
    this.acceleration = { x: 0, y: 0 };
    this.size = 3;
    this.maxSpeed = 4;
    this.maxForce = 0.1;
}

// Update boid position with boundary checks (wrapping)
Boid.prototype.update = function () {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    // Boundary wrapping
    if (this.position.x > canvas.width) this.position.x = 0;
    if (this.position.x < 0) this.position.x = canvas.width;
    if (this.position.y > canvas.height) this.position.y = 0;
    if (this.position.y < 0) this.position.y = canvas.height;

    this.velocity.x += this.acceleration.x;
    this.velocity.y += this.acceleration.y;
    const speed = Math.hypot(this.velocity.x, this.velocity.y);
    if (speed > this.maxSpeed) {
        this.velocity.x = (this.velocity.x / speed) * this.maxSpeed;
        this.velocity.y = (this.velocity.y / speed) * this.maxSpeed;
    }

    this.acceleration.x = 0;
    this.acceleration.y = 0;
};

// Apply a force to a boid
Boid.prototype.applyForce = function (force) {
    this.acceleration.x += force.x;
    this.acceleration.y += force.y;
};

// Avoid danger zone (left-clicked area)
Boid.prototype.avoidDangerZone = function () {
    if (!dangerZone) return { x: 0, y: 0 };

    const dist = Math.hypot(this.position.x - dangerZone.x, this.position.y - dangerZone.y);
    if (dist < 100) {
        let force = { x: this.position.x - dangerZone.x, y: this.position.y - dangerZone.y };
        const magnitude = Math.hypot(force.x, force.y);
        if (magnitude > 0) {
            force.x /= magnitude;
            force.y /= magnitude;
            force.x *= this.maxSpeed;
            force.y *= this.maxSpeed;
            force.x -= this.velocity.x;
            force.y -= this.velocity.y;
            const forceMagnitude = Math.hypot(force.x, force.y);
            if (forceMagnitude > this.maxForce) {
                force.x = (force.x / forceMagnitude) * this.maxForce;
                force.y = (force.y / forceMagnitude) * this.maxForce;
            }
        }
        return force;
    }
    return { x: 0, y: 0 };
};

// Align with nearby boids
Boid.prototype.align = function (boids) {
    let steering = { x: 0, y: 0 };
    let total = 0;
    for (let i = 0; i < boids.length; i++) {
        const boid = boids[i];
        const distance = Math.hypot(this.position.x - boid.position.x, this.position.y - boid.position.y);
        if (distance < 50) {
            steering.x += boid.velocity.x;
            steering.y += boid.velocity.y;
            total++;
        }
    }
    if (total > 0) {
        steering.x /= total;
        steering.y /= total;
        const magnitude = Math.hypot(steering.x, steering.y);
        if (magnitude > 0) {
            steering.x /= magnitude;
            steering.y /= magnitude;
            steering.x *= this.maxSpeed;
            steering.y *= this.maxSpeed;
            steering.x -= this.velocity.x;
            steering.y -= this.velocity.y;
            const steeringMagnitude = Math.hypot(steering.x, steering.y);
            if (steeringMagnitude > this.maxForce) {
                steering.x = (steering.x / steeringMagnitude) * this.maxForce;
                steering.y = (steering.y / steeringMagnitude) * this.maxForce;
            }
        }
    }
    return steering;
};

// Cohere with nearby boids
Boid.prototype.cohere = function (boids) {
    let steering = { x: 0, y: 0 };
    let total = 0;
    for (let i = 0; i < boids.length; i++) {
        const boid = boids[i];
        const distance = Math.hypot(this.position.x - boid.position.x, this.position.y - boid.position.y);
        if (distance < 100) {
            steering.x += boid.position.x;
            steering.y += boid.position.y;
            total++;
        }
    }
    if (total > 0) {
        steering.x /= total;
        steering.y /= total;
        steering.x -= this.position.x;
        steering.y -= this.position.y;
        const magnitude = Math.hypot(steering.x, steering.y);
        if (magnitude > 0) {
            steering.x /= magnitude;
            steering.y /= magnitude;
            steering.x *= this.maxSpeed;
            steering.y *= this.maxSpeed;
            steering.x -= this.velocity.x;
            steering.y -= this.velocity.y;
            const steeringMagnitude = Math.hypot(steering.x, steering.y);
            if (steeringMagnitude > this.maxForce) {
                steering.x = (steering.x / steeringMagnitude) * this.maxForce;
                steering.y = (steering.y / steeringMagnitude) * this.maxForce;
            }
        }
    }
    return steering;
};

// Render boids
function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < boids.length; i++) {
        const boid = boids[i];
        boid.applyForce(boid.align(boids));
        boid.applyForce(boid.cohere(boids));
        boid.applyForce(boid.avoidDangerZone());
        boid.update();

        ctx.beginPath();
        ctx.arc(boid.position.x, boid.position.y, boid.size, 0, Math.PI * 2);
        ctx.fillStyle = "#00ff00";
        ctx.fill();
    }
}

// Game loop
function loop() {
    render();
    requestAnimationFrame(loop);
}

// Click event to create boids and danger zone
canvas.addEventListener("click", (event) => {
    if (event.button === 0) { // Left click
        dangerZone = { x: event.clientX, y: event.clientY }; // Set danger zone
    }
    if (boids.length < maxBoids) {
        boids.push(new Boid(event.clientX, event.clientY));
    }
});

// Info button toggle
const infoBtn = document.getElementById("infoBtn");
const infoModal = document.getElementById("infoModal");
const closeBtn = document.getElementById("closeBtn");

infoBtn.addEventListener("click", () => {
    infoModal.style.display = infoModal.style.display === "block" ? "none" : "block";
});

closeBtn.addEventListener("click", () => {
    infoModal.style.display = "none";
});

// Clear all boids
const clearBtn = document.getElementById("clearBtn");
clearBtn.addEventListener("click", () => {
    boids.length = 0;
    dangerZone = null;
});

// Boid limit input handler
const boidLimitInput = document.getElementById("boidLimitInput");
boidLimitInput.addEventListener("input", (event) => {
    maxBoids = Math.max(10, Math.min(500, parseInt(event.target.value, 10)));
});

// Start the simulation
loop();
