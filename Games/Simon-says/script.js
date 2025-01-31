    const Colors = [
      'green', 'red', 'yellow', 'blue', 'purple', 'orange', 'pink', 'cyan', 'brown', 'gray'
    ];

    // Element References
    const status = document.getElementById('status');
    const startButton = document.getElementById('startButton');
    const buttonBox = document.getElementById('buttonBox');
    const numTilesInput = document.getElementById('numTiles');
    const gameArea = document.querySelector('.game-area');
    const achievementsBtn = document.getElementById('achievements');
    const achievementsModal = document.getElementById('achievements-modal');
    const achievementsList = document.getElementById('achievements-list');
    const closeModal = document.getElementById('close-modal');
    const toast = document.getElementById('toast');

    let pattern = [];
    let answer = [];
    let score = 0;
    let tiles = [];
    let numTiles = 4;

    // Toast Function
    const showToast = (message) => {
      toast.textContent = message;
      toast.className = "show";
      setTimeout(() => {
        toast.className = toast.className.replace("show", "");
      }, 3000);
    };

    const disableInput = () => {
      tiles.forEach(button => {
        button.removeEventListener('pointerdown', pushToAnswer);
        button.classList.remove('button--answering');
      });
    };

    const extendPattern = () => {
      const randomIndex = Math.floor(Math.random() * tiles.length);
      pattern.push(randomIndex);
    };

    const removeBlink = () => {
      const blinked = document.querySelector('.button--blink');
      if (blinked) {
        blinked.classList.remove('button--blink');
      }
    };

    const blink = squareId => {
      const square = tiles[squareId];
      square.classList.add('button--blink');
      setTimeout(removeBlink, 500);
    };

    const playPattern = (pos = 0) => {
      if (pos >= pattern.length) {
        setTimeout(prepareInput, 1000);
        return;
      }

      setTimeout(() => {
        removeBlink();
        blink(pattern[pos]);
        playPattern(pos + 1);
      }, 1000);
    };

    const playSequence = () => {
      answer = [];
      status.textContent = score;
      disableInput();
      extendPattern();
      playPattern();
    };

    const prepareInput = () => {
      removeBlink();
      tiles.forEach((button, index) => {
        button.addEventListener('pointerdown', pushToAnswer);
        button.classList.add('button--answering');
      });
    };

    const pushToAnswer = e => {
      const id = e.target.dataset.index;
      answer.push(parseInt(id));

      const correctSquare = pattern[answer.length - 1];
      if (id != correctSquare || answer.length === pattern.length) {
        validationSequence();
      }
    };

    const answerMatchesPattern = () => {
      for (let i = 0; i < pattern.length; i++) {
        if (pattern[i] !== answer[i]) return false;
      }
      return true;
    };

    const validationSequence = () => {
      if (answerMatchesPattern()) {
        showToast('Correct!');
        score++;
        setTimeout(playSequence, 1000);
      } else {
        showToast('FAIL');
        saveHighScore(numTiles);
        setTimeout(resetGame, 1000);
      }
    };

    const resetGame = () => {
      pattern = [];
      answer = [];
      score = 0;
      playSequence();
    };

    const startGame = () => {
      numTiles = parseInt(numTilesInput.value);
      buttonBox.innerHTML = ''; // Clear previous tiles
      gameArea.style.display = 'block'; // Show the game area
      tiles = [];

      for (let i = 0; i < numTiles; i++) {
        const color = Colors[i];
        const button = document.createElement('div');
        button.classList.add('button', `button--${color}`);
        button.dataset.index = i;
        buttonBox.appendChild(button);
        tiles.push(button);
      }

      buttonBox.style.gridTemplateColumns = `repeat(${Math.min(5, numTiles)}, 1fr)`;
      resetGame();
    };

    // Save High Score in Local Storage
    const saveHighScore = (numTiles) => {
      const highScoreKey = `highScore_${numTiles}`;
      const currentHighScore = localStorage.getItem(highScoreKey) || 0;
      if (score > currentHighScore) {
        localStorage.setItem(highScoreKey, score);
      }
      localStorage.setItem('lastGameScore', score);
    };

    // Show Achievements
    const showAchievements = () => {
      let achievements = '';
      for (let i = 2; i <= 10; i++) {
        const highScore = localStorage.getItem(`highScore_${i}`) || 0;
        achievements += `<p>${i} Tiles: High Score - ${highScore}</p>`;
      }
      const lastGameScore = localStorage.getItem('lastGameScore') || 0;
      achievements += `<p>Last Game Score: ${lastGameScore}</p>`;
      achievementsList.innerHTML = achievements;
      achievementsModal.style.display = 'block';
    };

    // Event Listeners
    startButton.addEventListener('click', startGame);
    achievementsBtn.addEventListener('click', showAchievements);
    closeModal.addEventListener('click', () => {
      achievementsModal.style.display = 'none';
    });
