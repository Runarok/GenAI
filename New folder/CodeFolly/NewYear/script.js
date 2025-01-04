// Array of Random New Year Quotes
const newYearQuotes = [
    "May the New Year bring you happiness, peace, and prosperity!",
    "Here's to a bright New Year and a fond farewell to the old. Cheers to a fantastic 2024!",
    "Wishing you health, wealth, and endless joy in the year ahead!",
    "Cheers to new beginnings and the adventures that await in the New Year!",
    "May your year be filled with new hope, new joy, and new beginnings. Happy New Year!",
    "Out with the old, in with the new—Happy New Year to you!",
    "Wishing you a year full of blessings and beyond. Happy New Year!",
    "As we step into the New Year, let's leave the past behind and embrace the future with hope!",
    "May your dreams take flight in 2024. Happy New Year!",
    "A New Year, a new chapter, and endless possibilities await. Wishing you the very best!"
];

// Initialize the name variable (defined or undefined)
let name = "";

// Function to generate the link and display the New Year card
function generateLink() {
    name = document.getElementById('nameInput').value.trim();
    if (name) {
        const encodedName = encodeURIComponent(name);
        const url = `https://runarok.github.io/GenAI/CodeFolly/NewYear/#${encodedName}`;
        navigator.clipboard.writeText(url).then(() => {
            showToast();
            setTimeout(() => {
                displayCard(name);
            }, 2000);
        });
    }
}

// Function to display the New Year card based on the name or hash
function displayCard(name) {
    document.querySelector('.input-section').style.display = 'none';
    document.querySelector('.card-section').style.display = 'block';
    document.getElementById('cardTitle').textContent = `Happy New Year, ${name}!`;

    const randomQuote = newYearQuotes[Math.floor(Math.random() * newYearQuotes.length)];
    document.getElementById('cardMessage').textContent = randomQuote;

    const images = [
        'https://raw.githubusercontent.com/Runarok/GenAI/main/CodeFolly/NewYear/images/Fireworks1.jpeg',
        'https://raw.githubusercontent.com/Runarok/GenAI/main/CodeFolly/NewYear/images/Fireworks2.jpeg',
        'https://raw.githubusercontent.com/Runarok/GenAI/main/CodeFolly/NewYear/images/Fireworks3.jpeg',
        'https://raw.githubusercontent.com/Runarok/GenAI/main/CodeFolly/NewYear/images/Fireworks4.jpeg',
        'https://raw.githubusercontent.com/Runarok/GenAI/main/CodeFolly/NewYear/images/Fireworks5.jpeg',
        'https://raw.githubusercontent.com/Runarok/GenAI/main/CodeFolly/NewYear/images/Fireworks6.jpeg'
    ];
    const randomImage = images[Math.floor(Math.random() * images.length)];
    document.getElementById('newYearImage').src = randomImage;
}

function showToast() {
    const toast = document.getElementById('toast');
    toast.className = 'toast show';
    setTimeout(() => {
        toast.className = toast.className.replace('show', '');
    }, 2000);
}

if (name) {
    displayCard(name);
} else {
    const hash = window.location.hash.substring(1);
    if (hash) {
        displayCard(decodeURIComponent(hash));
    } else {
        document.querySelector('.input-section').style.display = 'block';
    }
}
