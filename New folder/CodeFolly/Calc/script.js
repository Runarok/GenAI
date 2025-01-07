let display = document.getElementById('result');
let currentInput = '';

function appendToDisplay(value) {
    if (currentInput === '0' && value !== '.') {
        currentInput = value;
    } else {
        currentInput += value;
    }
    display.value = currentInput;
}

function clearDisplay() {
    currentInput = '';
    display.value = '0';
}

function calculateResult() {
    try {
        currentInput = eval(currentInput).toString();
        display.value = currentInput;
    } catch (e) {
        display.value = 'Error';
        currentInput = '';
    }
}

// Event listener for keyboard support
document.addEventListener('keydown', function(event) {
    if (event.key >= '0' && event.key <= '9') {
        appendToDisplay(event.key);
    } else if (event.key === '+' || event.key === '-' || event.key === '*' || event.key === '/') {
        appendToDisplay(event.key);
    } else if (event.key === 'Enter') {
        calculateResult();
    } else if (event.key === 'Backspace') {
        currentInput = currentInput.slice(0, -1);
        display.value = currentInput || '0';
    } else if (event.key === '.') {
        appendToDisplay('.');
    } else if (event.key === 'c' || event.key === 'C') {
        clearDisplay();
    }
});
