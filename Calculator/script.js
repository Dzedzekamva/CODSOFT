document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    let currentInput = '0';
    let previousInput = '';
    let operator = '';
    let shouldResetDisplay = false;

    const buttons = document.querySelectorAll('.button');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.getAttribute('data-value');
            handleButtonClick(value);
        });
    });

    function handleButtonClick(value) {
        if (value === 'C') {
            clear();
        } else if (value === '=') {
            calculate();
        } else if (isOperator(value)) {
            setOperator(value);
        } else {
            appendNumber(value);
        }
    }

    function clear() {
        currentInput = '0';
        previousInput = '';
        operator = '';
        shouldResetDisplay = true; // Set shouldResetDisplay to true
        display.innerText = currentInput; // Update display to '0'
    }

    function calculate() {
        if (operator === '' || shouldResetDisplay) return;
        const result = operate(parseFloat(previousInput), parseFloat(currentInput), operator);
        if (isNaN(result)) {
            clear();
            return;
        }
        display.innerText = previousInput + " " + operator + " " + currentInput + " = " + result;
        currentInput = result.toString();
        operator = '';
        previousInput = '';
        shouldResetDisplay = true;
    }

    function setOperator(op) {
        if (operator !== '' && !shouldResetDisplay) {
            calculate();
        }
        operator = op;
        previousInput = currentInput;
        currentInput = '';
        display.innerText = previousInput + " " + operator;
        shouldResetDisplay = true;
    }

    function appendNumber(number) {
        if (shouldResetDisplay) {
            currentInput = number;
            shouldResetDisplay = false;
        } else if (currentInput === '0') {
            currentInput = number;
        } else {
            currentInput += number;
        }
        display.innerText = operator ? previousInput + " " + operator + " " + currentInput : currentInput;
    }

    function isOperator(value) {
        return value === '+' || value === '-' || value === '*' || value === '/';
    }

    function operate(num1, num2, operator) {
        switch (operator) {
            case '+':
                return num1 + num2;
            case '-':
                return num1 - num2;
            case '*':
                return num1 * num2;
            case '/':
                return num1 / num2;
            default:
                return 0;
        }
    }
});
