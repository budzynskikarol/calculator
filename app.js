const currentNumber = document.querySelector('.currentNumber');
const previousNumber = document.querySelector('.previousNumber p');
const mathSign = document.querySelector('.mathSign');
const numbersButtons = document.querySelectorAll('.number');
const operatorsButtons = document.querySelectorAll('.operator');
const equalsButton = document.querySelector('.equals');
const clearButton = document.querySelector('.clear');
const calculatorHistory = document.querySelector('.history');
const historyBtn = document.querySelector('.history-btn');

let result = 0;
let a = 0;
let b = 0;
let operator = '';


function displayNumbers() {
    if(previousNumber.innerHTML.includes('=')) {
        operator = '';
        currentNumber.innerHTML = '';
        previousNumber.innerHTML = '';
        result = 0;
        a = 0;
        b = 0;
    }
    if(this.textContent === '.' && currentNumber.innerHTML.includes('.')) return ;
    if(this.textContent === '.' && currentNumber.innerHTML === '') return currentNumber.innerHTML = '0.';
    if(this.textContent === '.' && currentNumber.innerHTML === '0') return currentNumber.innerHTML = '0.';
    if(currentNumber.innerHTML === '0') {
        currentNumber.innerHTML = this.textContent;
        a = Number(currentNumber.innerHTML);
    }
    else currentNumber.innerHTML += this.textContent;
    a = Number(currentNumber.innerHTML);
}

function operate() {
    if(!previousNumber.innerHTML.includes('=')) {
        if(currentNumber.innerHTML !== '' && previousNumber.innerHTML === '') {
            operator = this.textContent;
            previousNumber.innerHTML = currentNumber.innerHTML + ' ' + operator;
            currentNumber.innerHTML = '';
            b = a; 
            a = 0;
        }
        else if (currentNumber.innerHTML !== '' && previousNumber.innerHTML !== ''){
            a = Number(currentNumber.innerHTML);
            showResult();
            operator = this.textContent;
            previousNumber.innerHTML = result + ' ' + operator;
        }
        else 
        {
            operator = this.textContent;
            previousNumber.innerHTML = b + ' ' + operator;
        }
    } 
    else {
        operator = this.textContent;
        previousNumber.innerHTML = currentNumber.innerHTML + ' ' + operator;
        currentNumber.innerHTML = '';
    }
}

function showResult() {
    if(previousNumber.innerHTML === '' || currentNumber.innerHTML === '') return;

    switch(operator) {
        case '+':
            result = a + b;
            break;
        case '-':
            result = b - a;
            break;
        case 'x':
            result = a * b;
            break;
        case ':':
            result = b / a;
            break;
        case '^':
            result = b ** a;
            break;
    }
    
    if(this.textContent === '=') {     
        addHistory();   
        historyBtn.classList.add('active');
        previousNumber.innerHTML = b + ' ' + operator + ' ' + a + ' =' ;
        currentNumber.innerHTML = result;
        b = result;
    }
    else {
        addHistory();
        historyBtn.classList.add('active');
        previousNumber.innerHTML = result + ' ' + operator;
        currentNumber.innerHTML = '';
        b = result;
        a = 0;
    }
}

function addHistory() {
    const newHistoryItem = document.createElement('li');
    newHistoryItem.innerHTML = `${b} ${operator} ${a} = ${result}`; 
    newHistoryItem.classList.add('history-item');
    calculatorHistory.appendChild(newHistoryItem);
}

function clearScreen() {
    previousNumber.innerHTML = '';
    operator = '';
    currentNumber.innerHTML = '0';
    result = 0;
    a = 0;
    b = 0;
}

function clearHistory() {
    calculatorHistory.textContent = '';
    if(calculatorHistory.textContent === '') {
        historyBtn.classList.remove('active');
    }
}

// Event listeners

numbersButtons.forEach((button) => button.addEventListener('click', displayNumbers));

operatorsButtons.forEach((button) => button.addEventListener('click', operate));

equalsButton.addEventListener('click', showResult);

clearButton.addEventListener('click', clearScreen);

historyBtn.addEventListener('click', clearHistory);