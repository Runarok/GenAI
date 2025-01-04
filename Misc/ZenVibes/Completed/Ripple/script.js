const body = document.body; /* Select the body element */
const button = document.getElementById('toggleButton'); /* Select the toggle button */

let isColorful = false; /* Track whether the page is in colorful mode */

button.addEventListener('click', () => {
    isColorful = !isColorful; /* Toggle the mode */
    if (isColorful) {
        body.classList.add('colorful'); /* Add colorful class */
        body.classList.remove('normal'); /* Remove normal class */
    } else {
        body.classList.add('normal'); /* Add normal class */
        body.classList.remove('colorful'); /* Remove colorful class */
    }
});

document.body.addEventListener('click', function(event) {
    const ripple = document.createElement('div'); /* Create a new div for the ripple */
    ripple.classList.add('ripple'); /* Add the ripple class to the new div */
    document.body.appendChild(ripple); /* Append the ripple to the body */

    const size = Math.random() * 100 + 50; /* Randomly generate a size for the ripple */
    ripple.style.width = ripple.style.height = `${size}px`; /* Set the width and height of the ripple */
    ripple.style.top = `${event.clientY - size / 2}px`; /* Set the top position based on the mouse click */
    ripple.style.left = `${event.clientX - size / 2}px`; /* Set the left position based on the mouse click */

    setTimeout(() => {
        ripple.remove(); /* Remove the ripple after 2 seconds */
    }, 2000);
});
