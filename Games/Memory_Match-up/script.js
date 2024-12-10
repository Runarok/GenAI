const cards = [
    "🌙", "🌟", "🌈", "🌊", "🌻", "🔮", "🍂", "🌌", "🌱", "🦋",
    "🐚", "🌳", "❄️", "🌸", "🐉", "🎋", "🍁", "🌼", "🎆", "🦄",
    "⚡", "🌍", "🔥", "🍀", "🌠", "🐾", "🗺️", "⛰️", "🎨", "🌧️",
    "🌞", "🕊️", "🥥", "🎶", "🎈", "🧚‍♀️", "🌐", "🌕", "🏔️", "🔔",
    "🐬", "🚀", "🍒", "💫", "🥇", "⚓", "🌿", "🔑", "🧊", "🏝️",
    "🦅", "🎃", "🎩", "🏞️", "🧞‍♂️", "🏕️", "⛷️", "🚴‍♂️", "🧗‍♀️", "🎳",
    "🏹", "🎿", "🚤", "🥨", "🍕", "🍔", "🌭", "🍩", "🍦", "🍉",
    "🌽", "🍇", "🍏", "🥭", "🍍", "🍓", "🍋", "🥝", "🌶️", "🌰",
    "🍈", "🥥", "🥑", "🍊", "🌴", "🏄‍♀️", "🧜‍♀️", "🐢", "🐙", "🦈",
    "🌋", "🧙‍♂️", "🌌", "🔥", "🐾", "🥳"
];

let timer;
let seconds = 0;

document.getElementById("startButton").addEventListener("click", function() {
    const count = Math.min(Math.max(parseInt(document.getElementById("cardCount").value) * 2, 2), 100);
    const uniquePairs = count / 2;

    const selectedCards = cards.slice(0, uniquePairs);
    const shuffledCards = [...selectedCards, ...selectedCards].sort(() => 0.5 - Math.random());
    const gameBoard = document.getElementById("gameBoard");
    gameBoard.innerHTML = '';
    gameBoard.style.display = 'grid';

    shuffledCards.forEach((card) => {
        const cardElement = document.createElement("div");
        cardElement.classList.add("card");
        cardElement.setAttribute("data-card", card);
        cardElement.addEventListener("click", flipCard);
        gameBoard.appendChild(cardElement);
    });

    // Reset timer
    clearInterval(timer);
    seconds = 0;
    document.getElementById("timerDisplay").textContent = "Time: 0s";
    timer = setInterval(() => {
        seconds++;
        document.getElementById("timerDisplay").textContent = `Time: ${seconds}s`;
    }, 1000);
});

let firstCard, secondCard;
let lockBoard = false;
let matchedCount = 0;

function flipCard() {
    if (lockBoard || this.classList.contains('match')) return;
    this.classList.add("flipped");
    this.textContent = this.getAttribute("data-card");

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    lockBoard = true;

    checkForMatch();
}

function checkForMatch() {
    const isMatch = firstCard.getAttribute("data-card") === secondCard.getAttribute("data-card");
    isMatch ? handleMatch() : unflipCards();
}

function handleMatch() {
    firstCard.classList.add('match');
    secondCard.classList.add('match');
    resetBoard();
    matchedCount += 2;

    if (matchedCount === document.querySelectorAll('.card').length) {
        clearInterval(timer);
        showToast();
    }
}

function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");
        firstCard.textContent = '';
        secondCard.textContent = '';
        resetBoard();
    }, 1500);
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

function showToast() {
    const toast = document.getElementById("toast");
    toast.textContent = `You Memory Matched ${matchedCount / 2} pairs in ${Math.floor(seconds / 60)}min ${seconds % 60}sec`;
    toast.style.display = 'block';
    toast.style.opacity = 1;
    setTimeout(() => {
        toast.style.opacity = 0;
        setTimeout(() => {
            toast.style.display = 'none';
        }, 500);
    }, 3000);
}
