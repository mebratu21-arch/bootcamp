document.addEventListener('DOMContentLoaded', () => {
    const calculator = document.querySelector('.calculator-keys');
    const display = document.querySelector('.calculator-display');

    let firstValue = null;
    let operator = null;
    let waitingForSecondValue = false;
    let memory = 0;

    // --- Core Calculation Function ---
    const calculate = (n1, operator, n2) => {
        const num1 = parseFloat(n1);
        const num2 = parseFloat(n2);

        if (operator === 'add') return num1 + num2;
        if (operator === 'subtract') return num1 - num2;
        if (operator === 'multiply') return num1 * num2;
        if (operator === 'divide') {
            if (num2 === 0) return 'Error'; // Division by zero
            return num1 / num2;
        }
        return num2; // Default for '=' when no operator is active
    }

    // --- Memory Operations ---
    const handleMemory = (action, displayValue) => {
        const value = parseFloat(displayValue);

        if (action === 'memory-add') {
            memory += value;
        } else if (action === 'memory-subtract') {
            memory -= value;
        } else if (action === 'memory-recall') {
            display.textContent = memory.toString();
            // After MR, subsequent number presses should start a new value
            waitingForSecondValue = true; 
        } else if (action === 'memory-clear') {
            memory = 0;
        }
    }

    // --- Main Event Handler ---
    calculator.addEventListener('click', e => {
        if (!e.target.matches('button')) return; // Ignore clicks not on a button

        const key = e.target;
        const action = key.dataset.action;
        const keyContent = key.textContent;
        const displayedNum = display.textContent;

        // 1. Handle Number Input (0-9)
        if (!action) {
            if (displayedNum === '0' || waitingForSecondValue || displayedNum === 'Error') {
                display.textContent = keyContent;
                waitingForSecondValue = false;
            } else {
                display.textContent = displayedNum + keyContent;
            }
        } 
        
        // 2. Handle Decimal
        else if (action === 'decimal') {
            if (waitingForSecondValue) {
                display.textContent = '0.';
                waitingForSecondValue = false;
            } else if (!displayedNum.includes('.')) {
                display.textContent = displayedNum + '.';
            }
        } 
        
        // 3. Handle Operators (+, -, x, /)
        else if (
            action === 'add' || 
            action === 'subtract' || 
            action === 'multiply' || 
            action === 'divide'
        ) {
            // Convert action names to match 'add', 'subtract', etc.
            const newOperator = action; 

            // If we already have a first value and an operator, perform the intermediate calculation
            if (firstValue !== null && operator !== null && !waitingForSecondValue) {
                const result = calculate(firstValue, operator, displayedNum);
                display.textContent = result;
                firstValue = result; // Set result as the new first value
            } else {
                firstValue = displayedNum;
            }
            
            operator = newOperator;
            waitingForSecondValue = true;
        }
        
        // 4. Handle Equals (=)
        else if (action === 'calculate') {
            if (firstValue === null || operator === null) return;

            const secondValue = displayedNum;
            const result = calculate(firstValue, operator, secondValue);

            display.textContent = result;
            
            // Reset for the next calculation
            firstValue = null;
            operator = null;
            waitingForSecondValue = true;
        } 
        
        // 5. Handle Clear (AC/C)
        else if (action === 'clear-all') { // AC
            display.textContent = '0';
            firstValue = null;
            operator = null;
            waitingForSecondValue = false;
            memory = 0; // AC clears memory too for a full reset
        }
        else if (action === 'clear') { // C
            display.textContent = '0';
            // C only clears the current entry, keeps the rest of the calculation state
        }

        // 6. Handle Negate (±)
        else if (action === 'negate') {
            const num = parseFloat(displayedNum);
            display.textContent = (-num).toString();
        }

        // 7. Handle Memory Features (M+, M-, MR, MC)
        else if (action.startsWith('memory-')) {
            handleMemory(action, displayedNum);
        }
    });
});