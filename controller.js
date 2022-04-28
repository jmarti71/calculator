const displayEntry = document.querySelector('.displayEntry');
const displayResult = document.querySelector('.displayResult');
const valueButtons = document.querySelectorAll('.valBtn');
const equalBtn = document.querySelector('.equalsBtn');
const allCearBtn = document.querySelector('.allClearBtn');

var resultValue;
var currentValue = '0';
var valueA = 0;
var operator = '';

function operate (op, numA, numB) {
    const a = parseInt(numA);
    const b = parseInt(numB);
    // use switch?
    if(op == '+') {
       resultValue = add (a, b);
       displayResult.textContent = resultValue;
    }
    else if (op == '-') {
        resultValue = subtract(a, b);
        displayResult.textContent = resultValue;
    }
    else if (op == '*') {
        resultValue = multiply(a, b);
        displayResult.textContent = resultValue;
    }
    else if (op == '/') {
        resultValue = divide(a, b);
        displayResult.textContent = resultValue;
    }
    //resets operator after calculation is processed
    op = '';
}

function add (a, b) {
    const addResult = a + b;
    return addResult;
}

function subtract (a, b) {
    const subResult = a - b;
    return subResult;
}

function multiply (a, b) {
    const multResult = a * b;
    return multResult;
}

function divide (a, b) {
    const divResult = a / b;
    return divResult;
}

// WORK HERE //
function injectValue (value){
    // if we are entering an operator
    if(value == '+' || value == '-' || value == '*' || value == '/' ) {
        
        // if there is an active operator - get a result
        if ( operator == '+' || operator == '-' || operator == '*' || operator == '/' ) {
            operate(operator, valueA, currentValue);
            operator = value;
        }

        //if a numeric result value has been obtained - set aValue to result and reset the current value
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

function clearAll () {
    displayEntry.textContent = '';
    displayResult.textContent = '';
    resultValue = '0';
    currentValue = '0';
    valueA = 0;
    operator = '';
}

allCearBtn.addEventListener('click', () => { clearAll() });
equalBtn.addEventListener('click', () => { operate(operator, valueA, currentValue) });
valueButtons.forEach((button) => { button.addEventListener('click', () => {
    injectValue(button.textContent); });
});
