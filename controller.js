const displayEntry = document.querySelector('.displayEntry');
const displayResult = document.querySelector('.displayResult');
const valueButtons = document.querySelectorAll('.valBtn');
const equalBtn = document.querySelector('.equalsBtn');
const allCearBtn = document.querySelector('.allClearBtn');
const negativeBtn = document.querySelector('.negativeBtn');
const percentBtn = document.querySelector('.percentBtn');

let activeError = false;
let resultValue = '';
let currentValue = '';
let valueA = 0;
let operator = '';

function operate (op, numA, numB) {
    if(numA ==''){numA = '0';}
    const a = parseFloat(numA);
    const b = parseFloat(numB);

    if(isNaN(a) || isNaN(b)) {
        displayResult.textContent = 'OPERATOR ERROR';
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
            case '÷':
                if(assessDBZ(b)){
                    displayResult.textContent = 'DIVIDE BY ZERO ERROR';
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
        // if value is operator
        if(value == '+' || value == '-' || value == '*' || value == '÷' ) {     
            
            // (string of numbers) if there is an active operator - execute operate() on number set & active operator 
            // then set operator to new operator
            if ( operator == '+' || operator == '-' || operator == '*' || operator == '÷' ) {
                operate(operator, valueA, currentValue);
                operator = value;
            }
   
            // if adding to our previous result
            if(typeof(resultValue) == 'number') {
                console.log("ran result");
                valueA = resultValue;           
                currentValue = ''; //reset
                console.log(valueA);
                operator = value;
                resultValue = '';    
                displayEntry.textContent = `${valueA}${operator}${currentValue}`;
            }
            else {
                valueA = currentValue;
                console.log(valueA);
                currentValue = ''; //reset
                operator = value;
                console.log(operator); //also an array?
                displayEntry.textContent = `${valueA}${operator}${currentValue}`;
            }
        }

        // if value is number
        else if (!isNaN(value)) {
            // if entering number after result, clear and proceed
            if(typeof(resultValue) == 'number'){
                clearAll();
            }
            currentValue = currentValue + value;
            console.log(currentValue);
            if(operator !== ''){
                displayEntry.textContent = `${valueA}${operator}${currentValue}`;
            }
            else {
                displayEntry.textContent = currentValue;
            }
            console.log(currentValue);          
        }  
    }
}

function percentOperation() {
    if(currentValue.length >= 1) {
        // if operating on result
        if(typeof(resultValue) == 'number') {
            currentValue = resultValue.toString();
            resultValue = '';           
            displayEntry.textContent = `${currentValue}`;          
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
    // toggle the result
    if(typeof(resultValue) == 'number') {
        currentValue = (resultValue * (-1)).toString();
        resultValue = '';           
        displayEntry.textContent = `${currentValue}`;          
    } 
    else {
        // toggle non-result
        if(currentValue.charAt(0) !== '-') {
            currentValue = '-'.concat(currentValue);
        }
        else if (currentValue.charAt(0) == '-') {
            console.log('neg detected');
            currentValue = currentValue.substring(1);
        }

        // display based on operator status
        if(operator !== ''){
            displayEntry.textContent = `${valueA}${operator}${currentValue}`;
        }
        else {
            displayEntry.textContent = currentValue;
        }
    }
}

function roundResultResetOp (result) {
    operator = '';
    return Math.round((result + Number.EPSILON) * 100000) / 100000;
}

function assessDBZ(number) {
    if (number === 0) { return true; }
}

function clearAll () {
    displayEntry.textContent = '';
    displayResult.textContent = '';
    resultValue = '0';
    currentValue = '';
    valueA = 0;
    operator = '';
    activeError = false;
}

negativeBtn.addEventListener('click', () =>  { toggleNegative() });
percentBtn.addEventListener('click', () =>  { percentOperation() });
allCearBtn.addEventListener('click', () => { clearAll() });
equalBtn.addEventListener('click', () => { operate(operator, valueA, currentValue) });
valueButtons.forEach((button) => { button.addEventListener('click', () => {
    injectValue(button.textContent); });
});
