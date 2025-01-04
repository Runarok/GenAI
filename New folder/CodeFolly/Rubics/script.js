// Cube color faces
const colors = ['red', 'yellow', 'blue', 'green', 'white', 'orange'];
let cubeSize = 2; // Default size

// Initialize with a 2x2 cube
generateCube(cubeSize);

// Key listener to toggle the menu
document.addEventListener('keydown', (e) => {
  if (e.key.toLowerCase() === 'm') {
    document.getElementById('menu').style.display = 'block';
    document.getElementById('sizeInput').focus();  // Automatically focus the input field
  }
});

// Close the menu when clicking the 'X' button
document.getElementById('closeMenu').addEventListener('click', () => {
  document.getElementById('menu').style.display = 'none';
});

// Function to generate the cube with user input size
function generateCube(size) {
  const cubeContainer = document.getElementById('cubeContainer');
  cubeContainer.innerHTML = ''; // Clear any existing cube

  const faces = ['front', 'back', 'left', 'right', 'top', 'bottom'];
  const faceClasses = ['front', 'back', 'left', 'right', 'top', 'bottom'];

  // Create the faces of the cube
  faces.forEach((face, index) => {
    const faceElement = document.createElement('div');
    faceElement.classList.add('cube-face', faceClasses[index]);

    // Add tiles to each face
    for (let i = 0; i < size * size; i++) {
      const tile = document.createElement('div');
      tile.classList.add('tile');
      tile.style.backgroundColor = colors[index];
      faceElement.appendChild(tile);
    }

    cubeContainer.appendChild(faceElement);
  });

  // Update CSS grid for size
  const cubeFaces = document.querySelectorAll('.cube-face');
  cubeFaces.forEach(face => {
    face.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    face.style.gridTemplateRows = `repeat(${size}, 1fr)`;
  });
}

// Event listener for the generate button
document.getElementById('generateButton').addEventListener('click', () => {
  const size = parseInt(document.getElementById('sizeInput').value, 10);
  if (size >= 2 && size <= 10) {
    cubeSize = size;
    generateCube(size);
    document.getElementById('menu').style.display = 'none'; // Hide menu
  } else {
    alert('Please enter a valid size between 2 and 10');
  }
});

// Zoom functionality via keyboard
document.addEventListener('keydown', (e) => {
  if (e.key === '+') {
    if (cubeSize < 10) {
      cubeSize++;
    }
  } else if (e.key === '-') {
    if (cubeSize > 2) {
      cubeSize--;
    }
  }
  generateCube(cubeSize);
});
