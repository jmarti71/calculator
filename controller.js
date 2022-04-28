const displayEntry = document.querySelector('.displayEntry');
const displayResult = document.querySelector('.displayResult');
const valueButtons = document.querySelectorAll('.valBtn');
const equalBtn = document.querySelector('.equalsBtn');
const allCearBtn = document.querySelector('.allClearBtn');

let activeError = false;
let resultValue = '';
let currentValue = '0';
let valueA = 0;
let operator = '';

function operate (op, numA, numB) {
    const a = parseFloat(numA);
    const b = parseFloat(numB);

    if(isNaN(a) || isNaN(b)) {
        displayResult.textContent = 'OPERATOR ERROR: RESET AND TRY AGAIN';
        activeError = true;
    }
    else {
        switch(op) {
            case '+':
                resultValue = add (a, b);
                displayResult.textContent = resultValue;
                return;
            case '-':
                resultValue = subtract(a, b);
                displayResult.textContent = resultValue;
                return;
            case '*':
                resultValue = multiply(a, b);
                displayResult.textContent = resultValue;
                return;
            case '/':
                if(assessDBZ(b)){
                    displayResult.textContent = 'DIVIDE BY ZERO ERROR: RESET AND TRY AGAIN';
                    activeError = true;      
                }
                else {
                    resultValue = divide(a, b);        
                    displayResult.textContent = resultValue;
                }        
                return;
        }
    }   
}

function add (a, b) {
    const addResult = a + b;
    return roundResultResetOp(addResult);
}

function subtract (a, b) {
    const subResult = a - b;
    return roundResultResetOp(subResult);
}

function multiply (a, b) {
    const multResult = a * b;
    return roundResultResetOp(multResult);
}

function divide (a, b) {
    const divResult = a / b;
    return roundResultResetOp(divResult);
}

function injectValue (value){
    if(activeError == false) {

        // if we enter an operator
        if(value == '+' || value == '-' || value == '*' || value == '/' ) {     
            
            // if select an operator while there is an active operator - execute operate() to obtain value of 1st number set
            if ( operator == '+' || operator == '-' || operator == '*' || operator == '/' ) {
                operate(operator, valueA, currentValue);
                operator = value;
            }
   
            // if adding to our previous result
            if(typeof(resultValue) == 'number') {
                console.log("ran result");
                valueA = resultValue; 
                displayEntry.textContent = resultValue;
                currentValue = ''; //reset
                console.log(valueA);
                operator = value;
                resultValue == 0;    
            }
            else {
                valueA = currentValue;
                console.log(valueA);
                currentValue = ''; //reset
                operator = value;
                console.log(operator); //also an array?
            }
        }
        // if we are entering a number
        else if (!isNaN(value)) {
            currentValue = currentValue + value;
            console.log(currentValue);
        }  
        displayEntry.textContent = displayEntry.textContent + value;
    }
}

function roundResultResetOp (result) {
    op = '';
    return Math.round((result + Number.EPSILON) * 100000) / 100000;
}

function assessDBZ(number) {
    if (number === 0) { return true; }
}

function clearAll () {
    displayEntry.textContent = '';
    displayResult.textContent = '';
    resultValue = '0';
    currentValue = '0';
    valueA = 0;
    operator = '';
    activeError = false;
}

allCearBtn.addEventListener('click', () => { clearAll() });
equalBtn.addEventListener('click', () => { operate(operator, valueA, currentValue) });
valueButtons.forEach((button) => { button.addEventListener('click', () => {
    injectValue(button.textContent); });
});
