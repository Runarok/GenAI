const canvas = document.getElementById("liquidCanvas"); /* Get the canvas element */
const ctx = canvas.getContext("2d"); /* Get the 2D drawing context */

let colors = ["#6a11cb", "#2575fc"]; /* Default gradient colors */
let blackHoles = []; /* Array to hold black hole data */
let time = 0; /* Time variable for animation */
let isGrayBackground = false; /* Flag to track current background state */

function resizeCanvas() {
    canvas.width = window.innerWidth; /* Set canvas width to window width */
    canvas.height = window.innerHeight; /* Set canvas height to window height */
}

function generateGradient() {
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height); /* Create a gradient based on canvas size */
    gradient.addColorStop(0, colors[0]); /* Add the first color stop */
    gradient.addColorStop(1, colors[1]); /* Add the second color stop */
    return gradient; /* Return the generated gradient */
}

function drawBackground() {
    const bgGradient = generateGradient(); /* Generate the gradient */
    ctx.fillStyle = bgGradient; /* Set the fill style to the gradient */
    ctx.fillRect(0, 0, canvas.width, canvas.height); /* Fill the canvas with the gradient */
}

function drawBlackHoles() {
    for (let i = 0; i < blackHoles.length; i++) {
        const bh = blackHoles[i]; /* Get the black hole data */

        ctx.beginPath(); /* Start a new path */
        ctx.arc(bh.x, bh.y, bh.size, 0, Math.PI * 2); /* Draw a circle representing the black hole */
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)"; /* Set the fill color for the black hole */
        ctx.fill(); /* Fill the black hole */

        const gradient = ctx.createRadialGradient(bh.x, bh.y, 0, bh.x, bh.y, bh.size * 2); /* Create a radial gradient around the black hole */
        gradient.addColorStop(0, "rgba(255, 255, 255, 0.1)"); /* Set the first color stop */
        gradient.addColorStop(0.8, "rgba(0, 0, 0, 0.4)"); /* Set the second color stop */
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)"); /* Set the final color stop */
        ctx.fillStyle = gradient; /* Set the fill style for the gradient */
        ctx.globalCompositeOperation = "multiply"; /* Multiply the colors for blending */
        ctx.beginPath(); /* Start a new path */
        ctx.arc(bh.x, bh.y, bh.size * 2, 0, Math.PI * 2); /* Draw the outer circle with the gradient */
        ctx.fill(); /* Fill the outer circle with the gradient */

        bh.size += 0.5; /* Increment the size of the black hole */
        if (bh.size > 50) { /* Remove the black hole if it exceeds the max size */
            blackHoles.splice(i, 1); /* Remove the black hole from the array */
            i--; /* Adjust the index after removal */
        }
    }
}

function updateLiquidEffect() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); /* Clear the canvas */
    drawBackground(); /* Draw the background gradient */
    drawBlackHoles(); /* Draw the black holes */
    time += 0.05; /* Increment time for animation */
    requestAnimationFrame(updateLiquidEffect); /* Request the next animation frame */
}

canvas.addEventListener("mousemove", (e) => {
    const mouseX = e.clientX; /* Get mouse X position */
    const mouseY = e.clientY; /* Get mouse Y position */
    blackHoles.push({ /* Add a new black hole at the cursor position */
        x: mouseX,
        y: mouseY,
        size: 5 /* Initial size of the black hole */
    });
});

function toggleBackground() {
    isGrayBackground = !isGrayBackground; /* Toggle the background state */
    if (isGrayBackground) { /* If the background is gray */
        colors = ["#606060", "#c0c0c0"]; /* Set gray gradient colors */
        document.getElementById("backgroundToggle").textContent = "Color Gradient"; /* Update button text */
    } else { /* If the background is colored */
        colors = ["#6a11cb", "#2575fc"]; /* Set color gradient colors */
        document.getElementById("backgroundToggle").textContent = "Gray Gradient"; /* Update button text */
    }
}

window.addEventListener("resize", resizeCanvas); /* Adjust canvas size on window resize */
document.getElementById("backgroundToggle").addEventListener("click", toggleBackground); /* Attach click event to toggle background */

resizeCanvas(); /* Initial canvas size adjustment */
toggleBackground(); /* Set initial background */
updateLiquidEffect(); /* Start the animation */
