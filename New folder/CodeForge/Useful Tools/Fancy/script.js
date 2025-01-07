// Array to store words and their meanings
const wordsArray = [
    { word: `Hogwash`, meaning: `Nonsense; rubbish.` },
    { word: `Cumbersome`, meaning: `Large or heavy and therefore difficult to carry or use.` },
    { word: `Nefarious`, meaning: `Wicked or criminal.` },
    { word: `Bamboozle`, meaning: `To deceive or fool someone.` },
    { word: `Flabbergasted`, meaning: `Extremely surprised or shocked.` },
    { word: `Lackluster`, meaning: `Lacking in vitality, force, or conviction.` },
    { word: `Kerfuffle`, meaning: `A commotion or fuss.` },
    { word: `Ruckus`, meaning: `A noisy commotion.` },
    { word: `Clamber`, meaning: `To climb or move in an awkward way.` },
    { word: `Muddle`, meaning: `To confuse or mix up.` },
    { word: `Garrulous`, meaning: `Excessively talkative, especially on trivial matters.` },
    { word: `Quizzical`, meaning: `Indicating mild or amused curiosity.` },
    { word: `Cacophony`, meaning: `A harsh, discordant mixture of sounds.` },
    { word: `Flimflam`, meaning: `A deception or fraud.` },
    { word: `Fuddle`, meaning: `To confuse or stupefy, especially with alcohol.` },
    { word: `Tantamount`, meaning: `Equivalent in seriousness to; virtually the same as.` },
    { word: `Brouhaha`, meaning: `A noisy and overexcited reaction or response to something.` },
    { word: `Whimsy`, meaning: `Playfully quaint or fanciful behavior or humor.` },
    { word: `Cavort`, meaning: `To jump or dance around excitedly.` },
    { word: `Brevity`, meaning: `Shortness of time or duration; briefness.` },
    { word: `Pernicious`, meaning: `Having a harmful effect, especially in a gradual or subtle way.` },
    { word: `Inundate`, meaning: `To overwhelm with things or people to be dealt with.` },
    { word: `Flounder`, meaning: `To struggle or stagger helplessly.` },
    { word: `Hapless`, meaning: `Unfortunate or unlucky.` },
    { word: `Kaleidoscope`, meaning: `A constantly changing pattern or sequence of elements.` },
    { word: `Chicanery`, meaning: `The use of trickery to achieve a political, financial, or legal purpose.` },
    { word: `Jocular`, meaning: `Given to or characterized by joking; playful.` },
    { word: `Indignant`, meaning: `Feeling or showing anger or annoyance at what is perceived as unfair treatment.` },
    { word: `Alacrity`, meaning: `Brisk and cheerful readiness.` },
    { word: `Beguile`, meaning: `To charm or enchant, often in a deceptive way.` },
    { word: `Obfuscate`, meaning: `To deliberately make something unclear or difficult to understand.` },
    { word: `Ephemeral`, meaning: `Lasting for a very short time.` },
    { word: `Garrulous`, meaning: `Excessively talkative, especially on trivial matters.` },
    { word: `Forthwith`, meaning: `Immediately or without delay.` },
    { word: `Cursory`, meaning: `Hasty and therefore not thorough or detailed.` },
    { word: `Surreptitious`, meaning: `Kept secret, especially because it would not be approved of.` },
    { word: `Dawdle`, meaning: `To waste time; to be slow and lazy.` },
    { word: `Insidious`, meaning: `Proceeding in a subtle way but with harmful effects.` },
    { word: `Rancor`, meaning: `Bitter, long-lasting resentment or anger.` },
    { word: `Imbroglio`, meaning: `A complicated or confusing situation.` },
    { word: `Bucolic`, meaning: `Relating to the pleasant aspects of the countryside.` },
    { word: `Gloaming`, meaning: `Twilight, or the time of day when the sun has just set.` },
    { word: `Languid`, meaning: `Weak or faint from illness or fatigue.` },
    { word: `Flabbergasted`, meaning: `Extremely surprised or shocked.` },
    { word: `Wistful`, meaning: `Longing or yearning for something that is gone.` },
    { word: `Lugubrious`, meaning: `Looking or sounding sad and dismal.` },
    { word: `Imbue`, meaning: `To inspire or permeate with a feeling or quality.` },
    { word: `Effervescent`, meaning: `Bubbly, lively, or enthusiastic.` },
    { word: `Puerile`, meaning: `Childishly silly or trivial.` },
    { word: `Epiphany`, meaning: `A moment of sudden and profound revelation or realization.` },
    { word: `Trepidation`, meaning: `A feeling of fear or anxiety about something that may happen.` },
    { word: `Pragmatic`, meaning: `Dealing with things sensibly and realistically.` },
    { word: `Labyrinthine`, meaning: `Like a labyrinth; intricate and confusing.` },
    { word: `Frenetic`, meaning: `Fast-paced, energetic, and often chaotic.` },
    { word: `Ineffable`, meaning: `Too great or extreme to be expressed in words.` },
    { word: `Exacerbate`, meaning: `To make a problem, situation, or feeling worse.` },
    { word: `Sycophant`, meaning: `A person who acts obsequiously toward someone important in order to gain advantage.` },
    { word: `Scintillating`, meaning: `Sparkling or shining brightly.` },
    { word: `Flotsam`, meaning: `The wreckage of a ship or its cargo found floating on or washed up by the sea.` },
    { word: `Jetsam`, meaning: `Cargo or equipment thrown overboard from a ship to lighten it.` },
    { word: `Quixotic`, meaning: `Extremely idealistic; unrealistic and impractical.` },
    { word: `Cacophony`, meaning: `A harsh, discordant mixture of sounds.` },
    { word: `Pantomime`, meaning: `A dramatic performance using gestures and facial expressions without speech.` },
    { word: `Vicissitude`, meaning: `A change of circumstances or fortune, typically one that is unwelcome.` },
    { word: `Nocturnal`, meaning: `Active at night.` },
    { word: `Ostentatious`, meaning: `Characterized by vulgar or pretentious display; designed to impress.` },
    { word: `Pernicious`, meaning: `Having a harmful effect, especially in a gradual or subtle way.` },
    { word: `Miasma`, meaning: `A highly unpleasant or unhealthy atmosphere.` },
    { word: `Serendipity`, meaning: `The occurrence of events by chance in a happy or beneficial way.` },
    { word: `Misnomer`, meaning: `A wrong or inaccurate name or term.` },
    { word: `Sashay`, meaning: `To walk with a confident and playful step.` },
    { word: `Ubiquitous`, meaning: `Present, appearing, or found everywhere.` },
    { word: `Polemical`, meaning: `Relating to or involving strongly critical or controversial writing or speech.` },
    { word: `Histrionic`, meaning: `Overly theatrical or melodramatic in character or style.` },
    { word: `Pusillanimous`, meaning: `Lacking courage or determination.` },
    { word: `Vitriol`, meaning: `Cruel and bitter criticism.` },
    { word: `Avarice`, meaning: `Extreme greed for wealth or material gain.` },
    { word: `Sartorial`, meaning: `Relating to tailoring, clothes, or style of dress.` },
    { word: `Cognizant`, meaning: `Aware or conscious of something.` },
    { word: `Epistolary`, meaning: `Relating to the writing of letters.` },
    { word: `Dissonant`, meaning: `Lacking harmony; harsh and clashing.` },
    { word: `Acumen`, meaning: `The ability to make good judgments and quick decisions.` },
    { word: `Seraphic`, meaning: `Angel-like; blissfully serene.` },
    { word: `Sinewy`, meaning: `Lean and muscular.` }
];

// Function to highlight words
function highlightWord(element) {
    element.classList.add("highlight");
}

// Function to display words on the page
function displayWords() {
    const wordList = document.getElementById('word-list');
    wordList.innerHTML = ""; // Clear any existing content

    wordsArray.forEach(wordObj => {
        const wordContainer = document.createElement('div');
        wordContainer.classList.add('word-container');
        wordContainer.innerHTML = `
            <p class="word" onmouseover="highlightWord(this)">${wordObj.word}</p>
            <p class="meaning">${wordObj.meaning}</p>
        `;
        wordList.appendChild(wordContainer);
    });
}

// Function to get a random word from the array and display it
function RandomWord() {
    const randomIndex = Math.floor(Math.random() * wordsArray.length);
    const randomWord = wordsArray[randomIndex];
    alert(`Random Word: ${randomWord.word}\nMeaning: ${randomWord.meaning}`);
}

// Function to shuffle the words and re-display them
function shuffleWords() {
    wordsArray.sort(() => Math.random() - 0.5);
    displayWords(); // Re-render the shuffled words
}

// Initial display of words
displayWords();
