const choiceInput = document.getElementById('choice-input');
const addChoiceButton = document.getElementById('add-choice');
const choiceList = document.getElementById('choice-list');
const makeDecisionButton = document.getElementById('make-decision');
const decisionResult = document.getElementById('decision-result');
const toast = document.getElementById('toast');

const choicesSet = new Set();

// Pre-fill initial choices
const initialChoices = ["Yes", "No", "Maybe", "Maybe Not", "Definitely"];
initialChoices.forEach(choice => addChoice(choice));

function addChoice(choice) {
    const lowerCaseChoice = choice.toLowerCase();
    if (!choicesSet.has(lowerCaseChoice)) {
        choicesSet.add(lowerCaseChoice);
        const li = document.createElement('li');
        li.innerHTML = `<input type="checkbox" class="choice" value="${lowerCaseChoice}" checked> ${choice} <button class="remove-button">X</button>`;
        choiceList.appendChild(li);

        const removeButton = li.querySelector('.remove-button');
        removeButton.addEventListener('click', () => {
            choicesSet.delete(lowerCaseChoice);
            choiceList.removeChild(li);
            showToast(`${choice} removed`);
        });
    } else {
        showToast(`${choice} is a duplicate!`);
    }
}

addChoiceButton.addEventListener('click', () => {
    const input = choiceInput.value.split(',').map(choice => choice.trim()).filter(choice => choice);
    input.forEach(choice => addChoice(choice));
    choiceInput.value = ''; // Clear the input
});

makeDecisionButton.addEventListener('click', () => {
    const checkedChoices = Array.from(choiceList.querySelectorAll('input[type="checkbox"]:checked'))
        .map(input => input.value);
    if (checkedChoices.length > 0) {
        const randomChoice = checkedChoices[Math.floor(Math.random() * checkedChoices.length)];
        decisionResult.textContent = `Decision: ${randomChoice.charAt(0).toUpperCase() + randomChoice.slice(1)}`; // Capitalize the first letter
        decisionResult.classList.add('highlight', 'show');
        decisionResult.classList.remove('hidden');
    } else {
        showToast('No choices selected!');
        decisionResult.classList.remove('show');
        decisionResult.classList.add('hidden');
    }
});

function showToast(message) {
    toast.textContent = message;
    toast.style.display = 'block';
    setTimeout(() => {
        toast.style.opacity = 0;
        setTimeout(() => {
            toast.style.display = 'none';
            toast.style.opacity = 1;
        }, 500);
    }, 2000);
}
