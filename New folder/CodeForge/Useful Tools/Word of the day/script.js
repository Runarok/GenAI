async function fetchRandomWord() {
    try {
        const response = await fetch('https://random-word-api.herokuapp.com/word?number=1');
        const wordArray = await response.json();
        const word = wordArray[0];

        try {
            const meaningResponse = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
            const meaningData = await meaningResponse.json();

            if (meaningData.length > 0) {
                const meaning = meaningData[0].meanings[0].definitions[0].definition;
                displayWord(word, meaning);
            } else {
                displayWord(word, 'Meaning not found. Fetching another word...');
                fetchRandomWord(); // Fetch another word if no meaning is found
            }
        } catch (meaningError) {
            console.error('Error fetching meaning:', meaningError);
            displayWord(word, 'Meaning not available. Fetching another word...');
            fetchRandomWord(); // Fetch another word if meaning fetch fails
        }
    } catch (error) {
        console.error('Error fetching word:', error);
        document.getElementById('word').innerText = 'Error fetching word';
        document.getElementById('info').innerText = 'Please try again later.';
    }
}

function displayWord(word, meaning) {
    document.getElementById('word').innerText = word.charAt(0).toUpperCase() + word.slice(1); // Capitalizes the first letter of the word
    document.getElementById('info').innerText = meaning;
}

function displayRandomWord() {
    fetchRandomWord();
}

// Fetch a random word when the page loads
window.onload = fetchRandomWord;
