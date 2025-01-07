 // Element references
        const boardElement = document.getElementById('board'); // Reference to the game board
        const scoreElement = document.getElementById('score'); // Reference to the score display
        const timerElement = document.getElementById('time'); // Reference to the timer display
        const playButton = document.getElementById('play-button'); // Reference to the play button
        const resetButton = document.getElementById('reset-button'); // Reference to the reset button
        const gridSizeSelect = document.getElementById('grid-size'); // Reference to the grid size dropdown
        const tileCountSelect = document.getElementById('tile-count'); // Reference to the tile count dropdown
        const menu = document.getElementById('menu'); // Reference to the menu container
        const game = document.getElementById('game'); // Reference to the game container
        const toast = document.getElementById('toast'); // Reference to the toast notification
        const infoModal = document.getElementById('info-modal'); // Reference to the instructions modal
        const closeModalButton = document.getElementById('close-modal'); // Reference to the close modal button
        const infoButton = document.getElementById('info-button'); // Reference to the info button
        const highestScoreElement = document.getElementById('highest-score'); // Reference to highest score display
        const highestModeElement = document.getElementById('highest-mode'); // Reference to highest mode display

        // Variables for game state
        let score = 0; // Current score
        let timeLeft = 30; // Time left in seconds
        let tileInterval; // Interval ID for showing tiles
        let boardSize = parseInt(gridSizeSelect.value); // Current board size
        let tileCount = parseInt(tileCountSelect.value); // Current number of active tiles
        let scoreMultiplier = 1; // Multiplier for score based on active tiles

        // Function to load highest score and mode from local storage
        function loadHighestScore() {
            const highestScore = localStorage.getItem('highestScore') || 0; // Get highest score or default to 0
            const highestMode = localStorage.getItem('highestMode') || "N/A"; // Get highest mode or default to N/A
            highestScoreElement.textContent = highestScore; // Display highest score
            highestModeElement.textContent = highestMode; // Display highest mode
        }

        // Function to create the game board
        function createBoard() {
            boardElement.innerHTML = ''; // Clear previous tiles
            boardElement.style.gridTemplateColumns = `repeat(${boardSize}, 100px)`; // Set grid columns based on size
            for (let i = 0; i < boardSize * boardSize; i++) { // Loop to create each tile
                const tile = document.createElement('div'); // Create a new tile
                tile.className = 'tile'; // Set tile class
                tile.addEventListener('click', () => whackTile(tile)); // Add click event listener
                boardElement.appendChild(tile); // Append tile to the board
            }
        }

        // Function to handle tile click
        function whackTile(tile) {
            if (tile.classList.contains('active')) { // Check if tile is active
                score += scoreMultiplier; // Increase score by multiplier
                scoreElement.textContent = score; // Update score display
                tile.classList.remove('active'); // Remove active class from tile
                
                // Animation for correct click
                tile.classList.add('correct'); // Add correct class for animation
                setTimeout(() => tile.classList.remove('correct'), 300); // Remove class after animation
            } else {
                score--; // Decrease score for wrong click
                scoreElement.textContent = score; // Update score display
                
                // Animation for wrong click
                tile.classList.add('wrong'); // Add wrong class for animation
                setTimeout(() => tile.classList.remove('wrong'), 300); // Remove class after animation
            }
        }

        // Function to show active tiles on the board
        function showTiles() {
            const tiles = document.querySelectorAll('.tile'); // Select all tiles
            tiles.forEach(tile => tile.classList.remove('active')); // Remove active class from all tiles
            for (let i = 0; i < tileCount; i++) { // Loop to activate random tiles
                const randomTile = tiles[Math.floor(Math.random() * tiles.length)]; // Pick a random tile
                randomTile.classList.add('active'); // Add active class to the selected tile
            }
        }

        // Function to display toast messages
        function showToast(message) {
            toast.textContent = message + ' Your score: ' + score; // Set toast message
            toast.style.opacity = 1; // Make toast visible
            setTimeout(() => {
                toast.style.opacity = 0; // Fade out toast after 3 seconds
            }, 3000);
        }

        // Function to start the game
        function startGame() {
            boardSize = parseInt(gridSizeSelect.value); // Get current grid size
            tileCount = parseInt(tileCountSelect.value); // Get current tile count
            scoreMultiplier = tileCount; // Set score multiplier based on tile count
            createBoard(); // Create the game board
            menu.classList.remove('active'); // Hide the menu
            game.classList.add('active'); // Show the game area
            score = 0; // Reset score
            timeLeft = 30; // Reset timer
            scoreElement.textContent = score; // Update score display
            timerElement.textContent = timeLeft; // Update timer display
            loadHighestScore(); // Load highest score at game start

            // Interval to show tiles and update timer
            tileInterval = setInterval(() => {
                showTiles(); // Show active tiles
                if (timeLeft > 0) { // Check if time is still left
                    timeLeft--; // Decrease time
                    timerElement.textContent = timeLeft; // Update timer display
                } else {
                    clearInterval(tileInterval); // Stop interval when time is up
                    showToast('Time is up!'); // Show time up message
                    saveHighestScore(); // Save highest score if applicable
                    resetGame(); // Reset game state
                }
            }, 1000); // Run every second
        }

        // Function to save the highest score to local storage
        function saveHighestScore() {
            const highestScore = localStorage.getItem('highestScore') || 0; // Get current highest score
            if (score > highestScore) { // Check if current score is greater than highest score
                localStorage.setItem('highestScore', score); // Update highest score in local storage
                localStorage.setItem('highestMode', tileCount + ' Tiles'); // Update highest mode
                loadHighestScore(); // Refresh displayed highest score
            }
        }

        // Function to reset the game state
        function resetGame() {
            menu.classList.add('active'); // Show the menu
            game.classList.remove('active'); // Hide the game area
            clearInterval(tileInterval); // Clear tile showing interval
            score = 0; // Reset score
            timeLeft = 30; // Reset timer
            scoreElement.textContent = score; // Update score display
            timerElement.textContent = timeLeft; // Update timer display
        }

        // Modal functionality
        infoButton.addEventListener('click', () => {
            infoModal.classList.add('active'); // Show info modal
        });
        closeModalButton.addEventListener('click', () => {
            infoModal.classList.remove('active'); // Hide info modal
        });

        playButton.addEventListener('click', startGame); // Start game on play button click
        resetButton.addEventListener('click', resetGame); // Reset game on reset button click
        gridSizeSelect.addEventListener('change', createBoard); // Recreate board on grid size change
        tileCountSelect.addEventListener('change', () => {
            tileCount = parseInt(tileCountSelect.value); // Update tile count on change
        });

        loadHighestScore(); // Load highest score on page load
        createBoard(); // Create initial board on page load
