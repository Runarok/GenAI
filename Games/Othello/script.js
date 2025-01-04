        const boardElement = document.getElementById('board'); // Reference to the board element
        const statusElement = document.getElementById('status'); // Reference to the status display
        const modeSelect = document.getElementById('mode'); // Reference to the game mode selection
        const sizeSelect = document.getElementById('size'); // Reference to the board size selection
        const startButton = document.getElementById('start'); // Reference to the start button
        const resetButton = document.getElementById('reset'); // Reference to the reset button
        const infoButton = document.getElementById('infoButton'); // Reference to the info button
        const rulesElement = document.getElementById('rules'); // Reference to the rules section

        let boardSize = 8; // Default board size
        let board = []; // 2D array to represent the board
        let currentPlayer = 'black'; // Track the current player
        let gameMode = '2player'; // Track the game mode
        let scores = { black: 2, white: 2 }; // Track the scores of both players
        let gameEnded = false; // Flag to check if the game has ended

        function initializeBoard() {
            // Initialize the board with null values
            board = Array.from({ length: boardSize }, () => Array(boardSize).fill(null));
            const mid = Math.floor(boardSize / 2);
            // Set up the initial four pieces in the center
            board[mid - 1][mid - 1] = 'white';
            board[mid][mid] = 'white';
            board[mid - 1][mid] = 'black';
            board[mid][mid - 1] = 'black';
            renderBoard(); // Render the board
            gameEnded = false; // Reset game end flag
            boardElement.classList.add('visible'); // Make the board visible
            statusElement.style.visibility = 'hidden'; // Hide the status initially
            resetButton.style.display = 'block'; // Show the reset button
        }

        function renderBoard() {
            // Clear the board element and set its grid styles
            boardElement.innerHTML = '';
            boardElement.style.gridTemplateColumns = `repeat(${boardSize}, 50px)`;
            boardElement.style.gridTemplateRows = `repeat(${boardSize}, 50px)`;

            for (let row = 0; row < boardSize; row++) {
                for (let col = 0; col < boardSize; col++) {
                    const cell = document.createElement('div'); // Create a cell element
                    cell.className = 'cell';
                    cell.dataset.row = row; // Store row index
                    cell.dataset.col = col; // Store column index

                    if (board[row][col]) {
                        const piece = document.createElement('div'); // Create a piece element
                        piece.className = `piece ${board[row][col]}`; // Set the piece color class
                        cell.appendChild(piece); // Add piece to the cell
                    }

                    cell.addEventListener('click', () => handleCellClick(row, col)); // Add click listener for cell
                    boardElement.appendChild(cell); // Add cell to the board
                }
            }
            updateStatus(); // Update the status display
        }

        function handleCellClick(row, col) {
            // Handle click event on a cell
            if (!gameEnded && validMove(row, col)) {
                placePiece(row, col); // Place piece if the move is valid
                if (gameMode.includes('AI') && currentPlayer === 'white') {
                    // If it's AI's turn, make the move after a short delay
                    setTimeout(() => {
                        if (gameMode === 'easyAI') easyAIMove();
                        else hardAIMove();
                    }, 500);
                }
            }
        }

        function validMove(row, col) {
            // Check if the move is valid
            if (board[row][col] !== null) return false; // Cell must be empty

            const directions = [
                { x: 0, y: -1 }, { x: 0, y: 1 }, { x: -1, y: 0 },
                { x: 1, y: 0 }, { x: -1, y: -1 }, { x: -1, y: 1 },
                { x: 1, y: -1 }, { x: 1, y: 1 }
            ];

            // Check each direction for a valid move
            for (let { x, y } of directions) {
                let r = row + y; // Row increment
                let c = col + x; // Column increment
                let foundOpponent = false; // Flag to check if an opponent's piece is found

                while (r >= 0 && r < boardSize && c >= 0 && c < boardSize) {
                    if (board[r][c] === null) break; // No piece found in this direction
                    if (board[r][c] === currentPlayer) {
                        if (foundOpponent) return true; // Valid move found
                        break; // End of line with no outflanked pieces
                    }
                    foundOpponent = true; // Mark opponent's piece found
                    r += y; // Move in the y direction
                    c += x; // Move in the x direction
                }
            }
            return false; // No valid move found
        }

        function placePiece(row, col) {
            // Place the piece on the board
            board[row][col] = currentPlayer; // Set the current player's piece
            flipPieces(row, col); // Flip opponent's pieces
            updateScores(); // Update the scores
            if (checkGameOver()) {
                // Check if the game has ended after the move
                gameEnded = true;
                setTimeout(() => {
                    const winner = scores.black > scores.white ? 'Black' : scores.white > scores.black ? 'White' : 'It\'s a tie!';
                    alert(`Game Over! Winner: ${winner}. Final Score - Black: ${scores.black}, White: ${scores.white}`);
                    resetGame(); // Reset the game after showing the winner
                }, 100);
                return;
            }
            currentPlayer = currentPlayer === 'black' ? 'white' : 'black'; // Switch player
            renderBoard(); // Re-render the board
        }

        function flipPieces(row, col) {
            // Flip opponent's pieces according to the rules
            const directions = [
                { x: 0, y: -1 }, { x: 0, y: 1 }, { x: -1, y: 0 },
                { x: 1, y: 0 }, { x: -1, y: -1 }, { x: -1, y: 1 },
                { x: 1, y: -1 }, { x: 1, y: 1 }
            ];

            for (let { x, y } of directions) {
                let r = row + y; // Row increment
                let c = col + x; // Column increment
                const piecesToFlip = []; // Store pieces to be flipped

                while (r >= 0 && r < boardSize && c >= 0 && c < boardSize) {
                    if (board[r][c] === null) break; // No piece found in this direction
                    if (board[r][c] === currentPlayer) {
                        // Flip the stored pieces if a player's piece is found
                        for (let piece of piecesToFlip) {
                            board[piece.r][piece.c] = currentPlayer;
                        }
                        break; // End of line with no outflanked pieces
                    }
                    piecesToFlip.push({ r, c }); // Store opponent's piece for flipping
                    r += y; // Move in the y direction
                    c += x; // Move in the x direction
                }
            }
        }

        function updateScores() {
            // Reset scores and count pieces on the board
            scores.black = 0;
            scores.white = 0;
            for (let row of board) {
                for (let cell of row) {
                    if (cell === 'black') scores.black++; // Count black pieces
                    if (cell === 'white') scores.white++; // Count white pieces
                }
            }
            updateStatus(); // Update the status display
        }

        function updateStatus() {
            // Update the status element with current scores and turn
            statusElement.innerHTML = `<strong>Black:</strong> ${scores.black} <strong>White:</strong> ${scores.white} <br> <strong>${currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1)}'s turn.</strong>`;
            statusElement.style.visibility = 'visible'; // Show the status
        }

        function easyAIMove() {
            // Easy AI makes a random valid move
            const validMoves = getValidMoves();
            if (validMoves.length) {
                const move = validMoves[Math.floor(Math.random() * validMoves.length)]; // Select random move
                placePiece(move.row, move.col); // Place piece
            }
        }

        function hardAIMove() {
            // Hard AI selects the best valid move based on evaluation
            const validMoves = getValidMoves();
            if (validMoves.length) {
                let bestMove = validMoves[0];
                let bestScore = -1;
                for (let move of validMoves) {
                    const tempBoard = board.map(row => row.slice()); // Create a copy of the board
                    tempBoard[move.row][move.col] = 'white'; // Simulate the move
                    const score = evaluateBoard(tempBoard); // Evaluate the board
                    if (score > bestScore) {
                        bestScore = score; // Update best score
                        bestMove = move; // Update best move
                    }
                }
                placePiece(bestMove.row, bestMove.col); // Place the best move
            }
        }

        function getValidMoves() {
            // Get a list of all valid moves for the current player
            const moves = [];
            for (let row = 0; row < boardSize; row++) {
                for (let col = 0; col < boardSize; col++) {
                    if (validMove(row, col)) {
                        moves.push({ row, col }); // Add valid move to the list
                    }
                }
            }
            return moves; // Return the list of valid moves
        }

        function evaluateBoard(tempBoard) {
            // Evaluate the board to provide a score for the AI
            let score = 0;
            for (let row of tempBoard) {
                for (let cell of row) {
                    if (cell === 'white') score++; // Increase score for white pieces
                    else if (cell === 'black') score--; // Decrease score for black pieces
                }
            }
            return score; // Return the score
        }

        function checkGameOver() {
    const validMoves = getValidMoves(); // Get valid moves for the current player
    if (validMoves.length === 0) {
        currentPlayer = currentPlayer === 'black' ? 'white' : 'black'; // Switch player
        const nextValidMoves = getValidMoves(); // Check if the next player has valid moves
        if (nextValidMoves.length === 0) {
            // Both players have no valid moves, so the game is over
            gameEnded = true;
            const winner = scores.black > scores.white ? 'Black' : scores.white > scores.black ? 'White' : 'It\'s a tie!';
            showToast(`Game Over! ${winner} wins! Final Score - Black: ${scores.black}, White: ${scores.white}`);
            setTimeout(resetGame, 2000); // Reset the game after 2 seconds
            return true; // End the game
        }
    }
    return false; // Game is not over
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast'; // Add a class for styling
    toast.innerHTML = message;
    document.body.appendChild(toast); // Append the toast to the body

    // Set a timeout to hide and remove the toast after 2 seconds
    setTimeout(() => {
        toast.style.opacity = 0;
        setTimeout(() => {
            document.body.removeChild(toast); // Remove the toast from the DOM after fade out
        }, 500);
    }, 2000); // Toast visible for 2 seconds
}

        function startGame() {
            // Start the game with selected settings
            boardSize = parseInt(sizeSelect.value); // Get selected board size
            gameMode = modeSelect.value; // Get selected game mode
            initializeBoard(); // Initialize the board
            updateStatus(); // Update the status display
            document.getElementById('controls').style.display = 'none'; // Hide controls
        }

        function resetGame() {
            // Reset the game to initial state
            boardElement.classList.remove('visible'); // Hide the board
            document.getElementById('controls').style.display = 'block'; // Show controls
            resetButton.style.display = 'none'; // Hide reset button
            statusElement.style.visibility = 'hidden'; // Hide status
            scores = { black: 2, white: 2 }; // Reset scores
            currentPlayer = 'black'; // Reset current player
            gameEnded = false; // Reset game end flag
        }

        function toggleRules() {
            // Toggle visibility of the rules section
            if (rulesElement.style.display === 'none' || rulesElement.style.display === '') {
                rulesElement.style.display = 'block'; // Show rules
            } else {
                rulesElement.style.display = 'none'; // Hide rules
            }
        }

        // Event listeners for buttons
        startButton.addEventListener('click', startGame); // Start game when clicked
        resetButton.addEventListener('click', resetGame); // Reset game when clicked
        infoButton.addEventListener('click', toggleRules); // Toggle rules when clicked

        // Initialize the game (hide the board initially)
        resetGame(); // Call reset to hide elements initially
