// Toast function
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(function () {
        toast.classList.remove('show');
    }, 4000); // Increased duration for toast visibility
}

// Game variables
let piles = generateRandomPiles();
let currentPlayer = 1;

// Get DOM elements
const pilesContainer = document.getElementById('piles');
const statusDiv = document.getElementById('status');
const inputModal = document.getElementById('inputModal');
const closeInputModal = document.getElementById('closeInputModal');
const inputAmountContainer = document.getElementById('inputAmountContainer');
const infoBtn = document.getElementById('infoBtn');
const infoModal = document.getElementById('infoModal');
const closeModal = document.getElementById('closeModal');

// Function to generate random piles
function generateRandomPiles() {
    const numPiles = Math.floor(Math.random() * 3) + 3; // Generate 3 to 5 piles
    let piles = [];
    for (let i = 0; i < numPiles; i++) {
        piles.push(Math.floor(Math.random() * 8) + 5); // Each pile has a random number between 5 and 12
    }
    return piles;
}

// Function to update the display of piles
function updatePiles() {
    pilesContainer.innerHTML = '';
    piles.forEach((pile, index) => {
        const pileDiv = document.createElement('div');
        pileDiv.classList.add('pile');
        pileDiv.innerHTML = `
            <p>Pile ${index + 1}</p>
            <span>${pile}</span>
        `;
        pileDiv.onclick = () => handlePileClick(index);
        pilesContainer.appendChild(pileDiv);
    });
}

// Handle pile click
function handlePileClick(index) {
    if (piles[index] === 0) return; // Ignore empty piles

    // Show the modal to input how many objects to remove
    inputAmountContainer.innerHTML = '';
    const maxRemove = Math.min(piles[index], 5); // Can remove at most 5 objects
    for (let i = 1; i <= maxRemove; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.onclick = () => makeMove(index, i);
        inputAmountContainer.appendChild(button);
    }

    inputModal.style.display = 'block';
}

// Make a move by removing objects from a pile
function makeMove(pileIndex, amount) {
    piles[pileIndex] -= amount;
    updatePiles();
    checkGameStatus();
    currentPlayer = currentPlayer === 1 ? 2 : 1; // Switch player
    inputModal.style.display = 'none';
}

// Check the game status after each move
function checkGameStatus() {
    const remainingObjects = piles.reduce((acc, pile) => acc + pile, 0);
    if (remainingObjects === 0) {
        showToast(`Player ${currentPlayer} wins!`);
        resetGame();
    } else {
        statusDiv.textContent = `Player ${currentPlayer === 1 ? 2 : 1}'s turn.`;
    }
}

// Reset the game to initial state
function resetGame() {
    piles = generateRandomPiles();
    currentPlayer = 1;
    updatePiles();
    statusDiv.textContent = "Your turn! Click a pile to remove objects.";
}

// Modal handling for info
infoBtn.onclick = () => infoModal.style.display = 'block';
closeModal.onclick = () => infoModal.style.display = 'none';
closeInputModal.onclick = () => inputModal.style.display = 'none';

// Close modal when clicking outside
window.onclick = (event) => {
    if (event.target === infoModal) {
        infoModal.style.display = 'none';
    } else if (event.target === inputModal) {
        inputModal.style.display = 'none';
    }
};

// Initialize the game
updatePiles();
