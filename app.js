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
const grid = document.querySelector('.grid');

// Stored Variables
let firstNum;
let secondNum;
let operator;
let total;
let initialZero = true;
let clearOutput = false;
let containsDecimal = false;
let isPercent = false;

btnDivide.addEventListener('click', storeFirstNum);
btnMultiply.addEventListener('click', storeFirstNum);
btnSubtract.addEventListener('click', storeFirstNum);
btnAdd.addEventListener('click', storeFirstNum);
btnEquals.addEventListener('click', storeSecondNum);

btnPercent.addEventListener('click', makePercent);
btnDecimal.addEventListener('click', addDecimal);
btnPlusAndMinus.addEventListener('click', changeOperation);

// Accurate clock
function updateClock() {
  const date = new Date();
  const formattedHours = () => {
    const hours = date.getHours();
    if (hours < 10) {
      return `0${hours}`;
    }
    return hours;
  };
  const formattedMinutes = () => {
    const minutes = date.getMinutes();
    if (minutes < 10) {
      return `0${minutes}`;
    }
    return minutes;
  };
  const currentTime = `${formattedHours()}:${formattedMinutes()}`;
  timeDisplay.textContent = currentTime;
}
updateClock();

(() => {
  setInterval(function () {
    updateClock(timeDisplay);
  }, 1000);
})();

output.textContent = '0'; // Inital display

grid.addEventListener('click', addInput);

function addInput(e) {
  if (e.target.classList.contains('number')) {
    if (initialZero) {
      output.textContent = '';
      initialZero = false;
    }
    if (clearOutput) {
      output.textContent = '';
      clearOutput = false;
    }
    if (output.textContent.length < 8) {
      output.textContent += e.target.value;
    }
  }
}

function storeFirstNum() {
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
function evaluate(operator) {
  switch (operator) {
    case '÷':
      if (secondNum == 0) {
        output.textContent = `Error`;
        clearOutput = true;
        return;
      }
      total = firstNum / secondNum;
      output.textContent = formattedOutput(total);
      break;
    case '*':
      total = firstNum * secondNum;
      output.textContent = formattedOutput(total);
      break;
    case '-':
      total = firstNum - secondNum;
      output.textContent = formattedOutput(total);
      break;
    case '+':
      total = firstNum + secondNum;
      output.textContent = formattedOutput(total);
      break;
  }
}

const formattedOutput = (total) => {
  return total >= 1000000000 ? total.toExponential(2) : total;
};

// Other Methods
function makePercent() {
  if (!containsDecimal && !isPercent) {
    output.textContent = parseFloat(output.textContent) / 100;
    containsDecimal = true;
    isPercent = true;
  }
}

function addDecimal() {
  if (!containsDecimal && !isPercent) {
    output.textContent = `${output.textContent}.`;
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
  output.textContent = '0';
  initialZero = true;
  containsDecimal = false;
  isPercent = false;
  firstNum = '';
  secondNum = '';
  operator = '';
}
