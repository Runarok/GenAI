function createQuote(quoteText, authorText) {
    const quoteContainer = document.createElement('div');
    quoteContainer.className = 'quote-container';
    quoteContainer.innerHTML = `
        <p class="quote">"${quoteText}"</p>
        <p class="author">- ${authorText}</p>
    `;
    document.body.appendChild(quoteContainer);

    // Add a brief delay to make the quote appear with a smooth animation
    setTimeout(() => {
        quoteContainer.classList.add('visible');
    }, 100);
}

function shuffleQuotes() {
    const containers = document.querySelectorAll('.quote-container');
    const parent = containers[0].parentNode;

    const containersArray = Array.from(containers);
    for (let i = containersArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [containersArray[i], containersArray[j]] = [containersArray[j], containersArray[i]];
    }

    containersArray.forEach(container => parent.appendChild(container));
}

function RandomQuote() {
    const containers = document.querySelectorAll('.quote-container');
    const randomIndex = Math.floor(Math.random() * containers.length);
    const randomContainer = containers[randomIndex];

    randomContainer.classList.add('highlight');
    randomContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });

    setTimeout(() => randomContainer.classList.remove('highlight'), 1000);
}

document.addEventListener('DOMContentLoaded', () => {
    createQuote("The only real mistake is the one from which we learn nothing.", "Henry Ford");
    createQuote("The future belongs to those who believe in the beauty of their dreams.", "Eleanor Roosevelt");
    createQuote("What we do today, right now, will have an accumulated effect on all our tomorrows.", "Alexandra Stoddard");
    createQuote("A journey of a thousand miles begins with a single step.", "Lao Tzu");
    createQuote("Believe you can and you're halfway there.", "Theodore Roosevelt");
    createQuote("Success is not final, failure is not fatal: It is the courage to continue that counts.", "Winston Churchill");
    createQuote("Act as if what you do makes a difference. It does.", "William James");
    createQuote("An unexamined life is not worth living.", "Socrates");
    createQuote("Be yourself; everyone else is already taken.", "Oscar Wilde");
    createQuote("Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle.", "Christian D. Larson");
    createQuote("Change your thoughts and you change your world.", "Norman Vincent Peale");
    createQuote("Do not wait to strike till the iron is hot, but make it hot by striking.", "William Butler Yeats");
    createQuote("Do what you can, with what you have, where you are.", "Theodore Roosevelt");
    createQuote("Don't count the days; make the days count.", "Muhammad Ali");
    createQuote("Dream bigger. Do bigger.", "Anonymous");
    createQuote("Everything you can imagine is real.", "Pablo Picasso");
    createQuote("Get busy living or get busy dying.", "Stephen King");
    createQuote("Great things never come from comfort zones.", "Anonymous");
    createQuote("Happiness is not something ready-made. It comes from your own actions.", "Dalai Lama");
    createQuote("Hardships often prepare ordinary people for an extraordinary destiny.", "C.S. Lewis");
    createQuote("If you can believe it, the mind can achieve it.", "Anonymous");
    createQuote("If you can dream it, you can achieve it.", "Zig Ziglar");
    createQuote("In the middle of every difficulty lies opportunity.", "Albert Einstein");
    createQuote("It always seems impossible until it’s done.", "Nelson Mandela");
    createQuote("Keep your face always toward the sunshine—and shadows will fall behind you.", "Walt Whitman");
    createQuote("Life is 10% what happens to us and 90% how we react to it.", "Charles R. Swindoll");
    createQuote("Life is either a daring adventure or nothing at all.", "Helen Keller");
    createQuote("Life is not about waiting for the storm to pass, but about learning to dance in the rain.", "Vivian Greene");
    createQuote("Life is what happens when you're busy making other plans.", "John Lennon");
    createQuote("Opportunities don't happen, you create them.", "Chris Grosser");
    createQuote("Push yourself, because no one else is going to do it for you.", "Anonymous");
    createQuote("Sometimes we’re tested not to show our weaknesses, but to discover our strengths.", "Anonymous");
    createQuote("Start where you are. Use what you have. Do what you can.", "Arthur Ashe");
    createQuote("Success is not final, failure is not fatal: It is the courage to continue that counts.", "Winston Churchill");
    createQuote("Success is walking from failure to failure with no loss of enthusiasm.", "Winston S. Churchill");
    createQuote("The best way to predict the future is to create it.", "Peter Drucker");
    createQuote("The biggest adventure you can take is to live the life of your dreams.", "Oprah Winfrey");
    createQuote("The greatest glory in living lies not in never falling, but in rising every time we fall.", "Nelson Mandela");
    createQuote("The mind is everything. What you think you become.", "Buddha");
    createQuote("The only limit to our realization of tomorrow is our doubts of today.", "Franklin D. Roosevelt");
    createQuote("The secret of getting ahead is getting started.", "Mark Twain");
    createQuote("The way to get started is to quit talking and begin doing.", "Walt Disney");
    createQuote("To succeed in life, you need three things: a wishbone, a backbone, and a funny bone.", "Reba McEntire");
    createQuote("We cannot solve our problems with the same thinking we used when we created them.", "Albert Einstein");
    createQuote("What lies behind us and what lies before us are tiny matters compared to what lies within us.", "Ralph Waldo Emerson");
    createQuote("What we do in life echoes in eternity.", "Maximus Decimus Meridius");
    createQuote("What we fear doing most is usually what we most need to do.", "Tim Ferriss");
    createQuote("What you do today can improve all your tomorrows.", "Ralph Marston");
    createQuote("You are never too old to set another goal or to dream a new dream.", "C.S. Lewis");
    createQuote("You miss 100% of the shots you don’t take.", "Wayne Gretzky");
    createQuote("You must be the change you wish to see in the world.", "Mahatma Gandhi");
    createQuote("Your life does not get better by chance, it gets better by change.", "Jim Rohn");
    createQuote("Your limitation—it’s only your imagination.", "Anonymous");
    createQuote("Your time is limited, don’t waste it living someone else’s life.", "Steve Jobs");
    createQuote("Believe you can and you’re halfway there.", "Theodore Roosevelt");
    createQuote("Change your thoughts and you change your world.", "Norman Vincent Peale");
    createQuote("Don’t wait for opportunity. Create it.", "Anonymous");
    createQuote("Dream big and dare to fail.", "Norman Vaughan");
    createQuote("Dream it. Wish it. Do it.", "Anonymous");
    createQuote("If you can dream it, you can do it.", "Walt Disney");
    createQuote("If you want to achieve greatness stop asking for permission.", "Anonymous");
    createQuote("If you want to fly, give up everything that weighs you down.", "Buddha");
    createQuote("If you want to lift yourself up, lift up someone else.", "Booker T. Washington");
    createQuote("In three words I can sum up everything I've learned about life: it goes on.", "Robert Frost");
    createQuote("Keep your eyes on the stars, and your feet on the ground.", "Theodore Roosevelt");
    createQuote("Life is what we make it, always has been, always will be.", "Grandma Moses");
    createQuote("Little things make big days.", "Anonymous");
    createQuote("Success is how high you bounce when you hit bottom.", "George S. Patton");
    createQuote("The best revenge is massive success.", "Frank Sinatra");
    createQuote("The best way to find yourself is to lose yourself in the service of others.", "Mahatma Gandhi");
    createQuote("The best way to predict the future is to invent it.", "Alan Kay");
    createQuote("The journey of a thousand miles begins with one step.", "Lao Tzu");
    createQuote("The only way to do great work is to love what you do.", "Steve Jobs");
    createQuote("We will either find a way, or make one.", "Hannibal");
    createQuote("What we achieve inwardly will change outer reality.", "Plutarch");
    createQuote("You only live once, but if you do it right, once is enough.", "Mae West");
    createQuote("Your best life will not be found in the past, but in the future. Start moving forward now.", "Anonymous");
    createQuote("Don’t stop when you’re tired. Stop when you’re done.", "Anonymous");
});

