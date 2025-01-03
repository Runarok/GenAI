// Function to handle keyboard input
document.addEventListener('keydown', function(event) {
    const key = event.key;

    // Handling number keys (0-9)
    if (key >= '0' && key <= '9') {
        display.value += key;
    }

    // Handling operators
    switch (key) {
        case '+':
            display.value += '+';
            break;
        case '-':
            display.value += '-';
            break;
        case '*':
            display.value += '*';
            break;
        case '/':
            display.value += '/';
            break;
        case '.':
            display.value += '.';
            break;
        case '%':
            display.value += '%';
            break;
        case '^':
            display.value += '**'; // Power operator
            break;
        case 'Enter':
        case '=':
            calculate();
            break;
        case 'Backspace':
            backspace();
            break;
        case 'Escape':
        case 'c':
        case 'C':
            display.value = '';
            break;
        case '(':
            display.value += '(';
            break;
        case ')':
            display.value += ')';
            break;
        case 's':
            if (event.shiftKey) {
                display.value += 'sin(';
            }
            break;
        case 'c':
            if (event.shiftKey) {
                display.value += 'cos(';
            }
            break;
        case 't':
            if (event.shiftKey) {
                display.value += 'tan(';
            }
            break;
        case 'l':
            if (event.altKey) {
                display.value += 'Math.LOG2E';
            }
            break;
        case 'e':
            if (event.altKey) {
                e();
            }
            break;
        case 'p':
            if (event.altKey) {
                pi();
            }
            break;
        case 'l':
            if (event.shiftKey && event.altKey) {
                base10Log();
            }
            break;
        case 'x':
            display.value += '*';
            break;
        default:
            break;
    }
});

// Function to calculate the expression
function calculate() {
    try {
        display.value = eval(display.value);
    } catch (error) {
        display.value = "Error";
    }
}

// Function for backspace
function backspace() {
    display.value = display.value.slice(0, -1);
}

// Function to insert the value of 'e'
function e() {
    display.value += Math.E;
}

// Function to insert the value of 'pi'
function pi() {
    display.value += Math.PI;
}

// Function for square root
function squareRoot() {
    display.value += 'Math.sqrt(';
}

// Function for logarithm base 10
function base10Log() {
    display.value += 'Math.log10(';
}
