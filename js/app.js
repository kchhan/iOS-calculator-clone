// DOM 
const timeDisplay = document.querySelector('.timeDisplay');
const output = document.querySelector('.output');
const btnClear = document.querySelector('.clear');
const btnPlusAndMinus = document.querySelector('.plusAndMinus');
const btnPercent = document.querySelector('.percent');
const btnDivide = document.querySelector('.divide');
const btnMultiply = document.querySelector('.multiply');
const btnSubtract = document.querySelector('.subtract');
const btnAdd = document.querySelector('.add');
const btnEquals = document.querySelector('.equals');
const btnDecimal = document.querySelector('.decimal');
const btn = document.getElementsByClassName('btn');

// Accurate clock
function updateClock() {
  const date = new Date();
  const currentTime = `${date.getHours()}:${date.getMinutes()}`;
  timeDisplay.textContent = currentTime;  
}
updateClock();

(function() {
  setInterval(function(){
    updateClock(timeDisplay)
  }, 1000);
}());

// Add listener to btn input
// btn[8] = 9, btn[9] = 8, all the way to btn[17] = 0
output.textContent = "0"; // Inital display
for (let i = 8; i <= 17; i++){
  btn[i].addEventListener('click', addInput);
}

function addInput() {
  if (initialZero) {
    output.textContent = "";
    initialZero = false;
  }
  if (clearOutput) {
    output.textContent = "";
    clearOutput = false;
  }
  if (output.textContent.length < 8) { 
    output.textContent += this.value; 
  }
}

btnDivide.addEventListener('click', storeFirstNum);
btnMultiply.addEventListener('click', storeFirstNum);
btnSubtract.addEventListener('click', storeFirstNum);
btnAdd.addEventListener('click', storeFirstNum);
btnEquals.addEventListener('click', storeSecondNum);

btnPercent.addEventListener('click', makePercent);
btnDecimal.addEventListener('click', addDecimal);
btnPlusAndMinus.addEventListener('click', changeOperation);

// Stored Variables
let firstNum;
let secondNum;
let operator;
let total;
let initialZero = true;
let clearOutput = false;
let containsDecimal = false;
let isPercent = false;

function storeFirstNum(){
  operator = this.value;
  firstNum = parseFloat(output.textContent);
  clearOutput = true;
  containsDecimal = false;
  isPercent = false;
}

function storeSecondNum() {
  secondNum = parseFloat(output.textContent);
  evaluate(operator);
}

// Methods
function evaluate(operator){
  switch (operator) {
    case '÷':
      divide(firstNum, secondNum);
      break;
    case '*':
      multiply(firstNum, secondNum);
      break;
    case '-':
      subtract(firstNum, secondNum);
      break;
    case '+':
      add(firstNum, secondNum);
      break;
  }
}

function divide() {
  if (secondNum == 0) {
    output.textContent = `Error`;
    clearOutput = true;
    return;
  }
  total = firstNum/secondNum;
  output.textContent = total;
}

function multiply() {
  total = firstNum * secondNum;
  output.textContent = total;
}

function subtract() {
  total = firstNum - secondNum;
  output.textContent = total;
}

function add() {
  total = firstNum + secondNum;
  output.textContent = total;
}


// Other Methods
function makePercent() {
  if (!containsDecimal && !isPercent){
    output.textContent = parseFloat(output.textContent) / 100;
    containsDecimal = true;
    isPercent = true;
  }
  
}

function addDecimal() {
  if (!containsDecimal && !isPercent) {
    output.textContent = `${output.textContent}.`
    containsDecimal = true;
    isPercent = true;
  }
}

function changeOperation() {
  if (output.textContent[0] == '-') {
    output.textContent = output.textContent.substring(1);
  } else {
    output.textContent = `-${output.textContent}`;
  }
    
}

// All clear variables
btnClear.addEventListener('click', clear);

function clear() {
  output.textContent = "0";
  initialZero = true;
  containsDecimal = false;
  isPercent = false;
  firstNum = "";
  secondNum = "";
  operator = "";
}
