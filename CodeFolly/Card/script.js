// Array of Random Happy Birthday Quotes
const birthdayQuotes = [
    "Wishing you a day filled with happiness and a year filled with joy!",
    "May your birthday be the start of a year filled with good luck, good health, and much happiness.",
    "Happy Birthday! May your day be filled with love, laughter, and joy!",
    "On your special day, may you be surrounded by love and happiness! Enjoy every moment!",
    "Sending you smiles for every moment of your special day…Have a wonderful time and a very happy birthday!",
    "May your birthday be the beginning of a year filled with good luck, good health, and much happiness.",
    "Cheers to you and your incredible journey ahead. Have a fantastic birthday!",
    "Here's to another year of making beautiful memories! Happy Birthday!",
    "May your heart be filled with joy and laughter on your special day. Happy Birthday!",
    "On your birthday, may the sun shine as brightly as your spirit. Enjoy every moment!",
    "Wishing you a year full of love, adventure, and endless possibilities. Happy Birthday!",
    "May every moment of your birthday be filled with love and happiness. Enjoy it to the fullest!",
    "Happy Birthday to someone who lights up every room they walk into. May your day shine bright!",
    "Here’s to you and your special day! May all your dreams come true. Happy Birthday!",
    "Another year older, another year wiser! Happy Birthday, and cheers to all the wonderful things ahead!",
    "Happy Birthday to someone who makes the world a better place just by being in it.",
    "Birthdays are nature’s way of telling us to eat more cake! Have a sweet and delightful day!",
    "Wishing you all the success, love, and happiness in the world on your special day. Happy Birthday!",
    "Your birthday is the perfect time to remind you how much you are loved. Have a wonderful day!",
    "Wishing you a lifetime of happiness, peace, and prosperity. Happy Birthday!",
    "May your birthday be filled with all your favorite things and surrounded by the ones you love. Enjoy!"
];

// Initialize the name variable (defined or undefined)
let name = ""; // Predefined name, change this if you need

// Function to generate the link and display the birthday card
function generateLink() {
    name = document.getElementById('nameInput').value.trim();
    if (name) {
        // Generate the link for the birthday card
        const encodedName = encodeURIComponent(name); // Handle spaces as %20
        const url = `https://runarok.github.io/GenAI/CodeFolly/Card/#${encodedName}`;

        // Copy the link to the clipboard
        navigator.clipboard.writeText(url).then(() => {
            // Show the toast notification immediately
            showToast();

            // Delay the hash check by 2000ms (after the toast disappears)
            setTimeout(() => {
                // Check the hash and display the birthday card
                displayCard(name); // Display the card after 2000ms
            }, 2000); // Delay for card appearance
        });
    }
}

// Function to display the birthday card based on the name or hash
function displayCard(name) {
    // Display the birthday card and hide the input section
    document.querySelector('.input-section').style.display = 'none';
    document.querySelector('.card-section').style.display = 'block';
    document.getElementById('cardTitle').textContent = `Happy Birthday, ${name}!`;

    // Select a random happy birthday quote
    const randomQuote = birthdayQuotes[Math.floor(Math.random() * birthdayQuotes.length)];
    document.getElementById('cardMessage').textContent = randomQuote;

    // Randomly select an image from GitHub repository
    const images = [
        'https://raw.githubusercontent.com/Runarok/GenAI/main/CodeFolly/Card/images/gift%20(1).jpeg',
        'https://raw.githubusercontent.com/Runarok/GenAI/main/CodeFolly/Card/images/gift%20(2).jpeg',
        'https://raw.githubusercontent.com/Runarok/GenAI/main/CodeFolly/Card/images/gift%20(3).jpeg',
        'https://raw.githubusercontent.com/Runarok/GenAI/main/CodeFolly/Card/images/gift%20(4).jpeg'
    ];  // GitHub image URLs
    const randomImage = images[Math.floor(Math.random() * images.length)];
    document.getElementById('birthdayImage').src = randomImage;
}

// Toast Notification Logic
function showToast() {
    const toast = document.getElementById('toast');
    toast.className = 'toast show';
    setTimeout(function() {
        toast.className = toast.className.replace('show', '');
    }, 2000); // Toast visibility duration of 2000ms
}

// Check if `name` is defined, if not check for hash in the URL
if (name) {
    // If name is predefined or set, display the card
    displayCard(name);
} else {
    // If no name, check for a hash in the URL
    const hash = window.location.hash.substring(1);
    if (hash) {
        // If hash exists, display the card for the name in the hash
        displayCard(decodeURIComponent(hash));
    } else {
        // If no name or hash, show the input section
        document.querySelector('.input-section').style.display = 'block';
    }
}
