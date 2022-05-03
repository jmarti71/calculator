const displayEntry = document.querySelector('.displayEntry');
const displayResult = document.querySelector('.displayResult');
const valueButtons = document.querySelectorAll('.valBtn');
const equalBtn = document.querySelector('.equalsBtn');
const allCearBtn = document.querySelector('.allClearBtn');
const negativeBtn = document.querySelector('.negativeBtn');
const percentBtn = document.querySelector('.percentBtn');

let errorPresent = false;
let resultValue = '';
let currentValue = '';
let valueA = 0;
let operator = '';

function operate (op, numA, numB) {
    if (numA =='') { numA = '0'; }
    const a = parseFloat(numA);
    const b = parseFloat(numB);

    if(isNaN(a) || isNaN(b)) {
        displayResult.textContent = 'OPERATOR ERROR';
        errorPresent = true;
    }
    else {
        switch(op) {
            case '+':
                resultValue = add (a, b);
                break;
            case '-':
                resultValue = subtract(a, b);
                break;
            case '*':
                resultValue = multiply(a, b);
                break;
            case '÷':
                if(assessDBZ(b)){
                    displayResult.textContent = 'DIVIDE BY ZERO ERROR';
                    errorPresent = true;      
                }
                else {
                    resultValue = divide(a, b);        
                }        
                break;
        }
        if(errorPresent == false){
            displayResult.textContent = resultValue;
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
    if(errorPresent == false) {
        // if entered value is operator
        if(value == '+' || value == '-' || value == '*' || value == '÷' ) {     
            
            // (string of numbers) if there is an active operator, execute operate() on number set & active operator 
            // then set operator to new operator after getting result
            if ( operator == '+' || operator == '-' || operator == '*' || operator == '÷' ) {
                operate(operator, valueA, currentValue);
                operator = value;
            }
   
            // if adding to our previous result
            if(typeof(resultValue) == 'number') {
                valueA = resultValue;           
                resultValue = '';    
            }
            else {
                valueA = currentValue;
            }
            //reset to be operated on
            currentValue = '';
            operator = value;
            displayEntry.textContent = `${valueA}${operator}${currentValue}`;
        }

        // if entered value is number
        else if (!isNaN(value)) {
            // if entering number after result, clear and proceed
            if(typeof(resultValue) == 'number'){ clearAll(); }
            currentValue = currentValue + value;
            displayEntryHelper();  
        }  
    }
}

function percentOperation() {
    if(currentValue.length >= 1) {
        // if operating on result
        if(typeof(resultValue) == 'number') {
            currentValue = resultValue.toString();
            resultValue = '';                    
        } 
        
        displayEntry.textContent = `${currentValue}%`;
        currentValue = parseFloat(currentValue) / 100;
        currentValue = Math.round((currentValue + Number.EPSILON) * 100000) / 100000;
        currentValue = currentValue.toString();
       
        if(operator !== ''){
            displayEntry.textContent = `${valueA}${operator}${currentValue}`;
        }
        else {
            displayResult.textContent = `${currentValue}`;
        }
    }
}

function toggleNegative () {
    // if result, toggle the result
    if(typeof(resultValue) == 'number') {
        currentValue = (resultValue * (-1)).toString();
        resultValue = '';           
        displayEntry.textContent = `${currentValue}`;          
    } 
    else {
        // if not result, toggle non-result
        if(currentValue.charAt(0) !== '-') {
            currentValue = '-'.concat(currentValue);
        }
        else if (currentValue.charAt(0) == '-') {
            currentValue = currentValue.substring(1);
        }
        displayEntryHelper();
    }
}

function roundResultResetOp (result) {
    operator = '';
    return Math.round((result + Number.EPSILON) * 100000) / 100000;
}

function assessDBZ(number) {
    if (number === 0) { return true; }
}

//if operator has been entered, display values with operator
function displayEntryHelper() {
    if(operator !== ''){
        displayEntry.textContent = `${valueA}${operator}${currentValue}`;
    }
    else {
        displayEntry.textContent = currentValue;
    }
}

function clearAll () {
    displayEntry.textContent = '';
    displayResult.textContent = '';
    resultValue = '0';
    currentValue = '';
    valueA = 0;
    operator = '';
    errorPresent = false;
}

negativeBtn.addEventListener('click', () =>  { toggleNegative() });
percentBtn.addEventListener('click', () =>  { percentOperation() });
allCearBtn.addEventListener('click', () => { clearAll() });
equalBtn.addEventListener('click', () => { operate(operator, valueA, currentValue) });
valueButtons.forEach((button) => { button.addEventListener('click', () => {
    injectValue(button.textContent); });
});