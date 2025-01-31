let wins = 0;
let losses = 0;
let draws = 0;

function play(playerChoice) {
    const choices = ['rock', 'paper', 'scissors'];
    const computerChoice = choices[Math.floor(Math.random() * 3)];
    let result;

    if (playerChoice === computerChoice) {
        result = "It's a tie! Both chose " + playerChoice;
        draws++;
    } else if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'paper' && computerChoice === 'rock') ||
        (playerChoice === 'scissors' && computerChoice === 'paper')
    ) {
        result = "You win! " + playerChoice + " beats " + computerChoice;
        wins++;
    } else {
        result = "You lose! " + computerChoice + " beats " + playerChoice;
        losses++;
    }

    document.getElementById('result').innerText = result;
    document.getElementById('wins').innerText = wins;
    document.getElementById('losses').innerText = losses;
    document.getElementById('draws').innerText = draws;
}
