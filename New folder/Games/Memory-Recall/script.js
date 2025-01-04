 // List of items for the game
        const itemsList = [
            "Toothbrush", "Toothpaste", "Soap", "Shampoo", "Conditioner", "Towel", "Toilet paper", "Razor", 
            "Deodorant", "Lotion", "Hairbrush", "Comb", "Nail clippers", "Cotton swabs", "Cotton balls", 
            "Face wash", "Sunscreen", "Lip balm", "Mouthwash", "Perfume", "Shampoo", "Dish soap", 
            "Sponges", "Paper towels", "Trash bags", "Laundry detergent", "Fabric softener", "Iron", 
            "Ironing board", "Vacuum cleaner", "Broom", "Dustpan", "Mop", "Bucket", "Cleaning spray", 
            "Spatula", "Cutting board", "Knife", "Pot", "Pan", "Oven mitts", "Measuring cups", 
            "Measuring spoons", "Whisk", "Can opener", "Peeler", "Colander", "Mixing bowl", 
            "Food storage containers", "Aluminum foil", "Plastic wrap", "Baking sheets", "Coffee maker", 
            "Coffee filters", "Teapot", "Kettle", "Blender", "Microwave", "Toaster", "Cutting knife", 
            "Grater", "Tupperware", "Ice cube tray", "Water bottle", "Lunchbox", "Thermos", "Scissors", 
            "Tape", "Glue", "Notebooks", "Pens", "Pencils", "Highlighters", "Sticky notes", "Stapler", 
            "Paper clips", "Rubber bands", "Calendar", "Phone charger", "Headphones", "Laptop", 
            "Tablet", "Remote control", "Light bulbs", "Extension cord", "First aid kit", "Flashlight", 
            "Batteries", "Umbrella", "Sunglasses", "Wallet", "Keys", "Backpack", "Watering can", 
            "Plant pots", "Garden gloves", "Bicycle pump", "Sports equipment", "Board games", "Books"
        ];

        // Element references
        const startBtn = document.getElementById('start-btn'); // Start game button
        const resetBtn = document.getElementById('reset-btn'); // Reset game button
        const gameArea = document.getElementById('game-area'); // Game area container
        const guessInput = document.getElementById('guess-input'); // User input for guesses
        const correctItemsContainer = document.getElementById('correct-items'); // Container for correct guesses
        const numItemsInput = document.getElementById('num-items'); // Input for number of items
        const limitGuessesCheckbox = document.getElementById('limit-guesses'); // Checkbox for limiting guesses
        const itemsModal = document.getElementById('items-modal'); // Modal for items
        const itemsListElement = document.getElementById('items-list'); // List for displaying items in modal
        const closeModalBtn = document.getElementById('close-modal'); // Close button for modal
        const toast = document.getElementById('toast'); // Toast notification

        // Variables for game logic
        let correctItems = []; // Array for correct guesses
        let shownItems = []; // Array for items shown to the user
        let wrongGuesses = 0; // Count of wrong guesses
        let maxWrongGuesses = 0; // Maximum allowable wrong guesses

        // Function to show toast notifications
        function showToast(message) {
            toast.innerHTML = message; // Set message
            toast.className = "show"; // Show toast
            setTimeout(() => { 
                toast.className = toast.className.replace("show", ""); // Hide toast after timeout
            }, 3500);
        }

        // Function to reset the game state
        function resetGame() {
            correctItems = []; // Clear correct guesses
            shownItems = []; // Clear shown items
            wrongGuesses = 0; // Reset wrong guesses count
            correctItemsContainer.innerHTML = ''; // Clear displayed correct items
            gameArea.style.display = 'none'; // Hide game area
            numItemsInput.value = 10; // Reset number of items input
            limitGuessesCheckbox.checked = false; // Reset limit guesses checkbox
            itemsModal.style.display = 'none'; // Hide modal
        }

        // Function to start the game
        function startGame() {
            const numItems = parseInt(numItemsInput.value); // Get number of items from input

            // Calculate maximum wrong guesses based on the checkbox
            maxWrongGuesses = limitGuessesCheckbox.checked ? Math.floor(numItems * 0.2) : Infinity;

            // Randomly select items from the list
            shownItems = itemsList.sort(() => 0.5 - Math.random()).slice(0, numItems);
            
            // Show the items in the modal for memorization
            itemsListElement.innerHTML = ''; // Clear previous items
            shownItems.forEach(item => {
                const listItem = document.createElement('li'); // Create list item
                listItem.textContent = item; // Set item text
                itemsListElement.appendChild(listItem); // Add item to the list
            });

            // Display the modal
            itemsModal.style.display = 'flex'; // Show modal
        }

        // Function to close the modal and start the game
        function closeModalAndStartGame() {
            itemsModal.style.display = 'none'; // Hide modal
            gameArea.style.display = 'block'; // Show game area
            showToast("Start guessing!"); // Notify user to start guessing
            guessInput.focus(); // Focus on input for guesses
        }

        // Function to check the user's guess
        function checkGuess() {
            const guess = guessInput.value.trim().toLowerCase(); // Get and format user guess
            if (guess === '') return; // Ignore empty guesses
            guessInput.value = ''; // Clear input

            // Check if the guess is correct
            if (shownItems.map(item => item.toLowerCase()).includes(guess)) {
                if (!correctItems.includes(guess)) { // If not already guessed
                    correctItems.push(guess); // Add to correct guesses
                    const correctItemElement = document.createElement('div'); // Create element for correct item
                    correctItemElement.textContent = guess; // Set item text
                    correctItemsContainer.appendChild(correctItemElement); // Add to correct items container
                    showToast(`Correct: ${guess}`); // Show correct notification
                } else {
                    showToast(`Already guessed: ${guess}`); // Notify already guessed
                }

                // Check if all items have been guessed correctly
                if (correctItems.length === shownItems.length) {
                    showToast("You won!"); // Notify user of win
                    setTimeout(resetGame, 3000); // Reset game after delay
                }
            } else { // If the guess is incorrect
                wrongGuesses++; // Increment wrong guesses count
                const remainingGuesses = maxWrongGuesses === Infinity ? 'infinite guesses left' : `${maxWrongGuesses - wrongGuesses} guesses left`; // Determine remaining guesses
                showToast(`Wrong: ${guess}. ${remainingGuesses}. ${shownItems.includes(guess) ? '' : `${guess} is not an item!`}`); // Notify user of wrong guess

                // Check if the game is over due to too many wrong guesses
                if (wrongGuesses >= maxWrongGuesses) {
                    showToast("Game over! You lost."); // Notify user of loss
                    setTimeout(resetGame, 3000); // Reset game after delay
                }
            }
        }

        // Event listeners for user interactions
        startBtn.addEventListener('click', startGame); // Start game button click
        resetBtn.addEventListener('click', resetGame); // Reset game button click
        closeModalBtn.addEventListener('click', closeModalAndStartGame); // Close modal button click
        guessInput.addEventListener('keydown', (e) => { // Input field for guesses
            if (e.key === 'Enter') { // Check for Enter key press
                checkGuess(); // Call checkGuess function
            }
        });
