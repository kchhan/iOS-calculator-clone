// Model
const ItemCtrl = (() => {
  const data = {
    firstNumber: {
      value: null,
      containsDecimal: false,
    },
    secondNumber: {
      value: null,
      containsDecimal: false,
    },
    operator: null,
    total: null,
    outputOverwrite: true,
  };

  const methods = {
    add: (a, b) => a + b,
    subtract: (a, b) => a - b,
    multiply: (a, b) => a * b,
    divide: (a, b) => {
      if (b === 0) {
        return null;
      }
      return parseFloat(a / b);
    },
  };

  const checkDecimal = (number) => {
    if (number === 'first') {
      return data.firstNumber.containsDecimal;
    } else if (number === 'second') {
      return data.secondNumber.containsDecimal;
    }
  };

  const checkNumberToUpdate = () => {
    if (data.firstNumber.value === null) return 'first';
    if (data.secondNumber.value === null) return 'second';
    if (
      data.firstNumber.value !== null &&
      data.secondNumber.value !== null &&
      (data.operator === '+' || data.operator === '*')
    ) {
      data.firstNumber.value === data.total;
      data.secondNumber.value = null;
      return 'second';
    }
    if (
      data.firstNumber.value !== null &&
      data.secondNumber.value !== null &&
      (data.operator === '/' || data.operator === '-')
    ) {
      data.secondNumber.value === data.total;
      data.firstNumber.value = null;
      return 'first';
    }
  };

  const getOutputOverwrite = () => {
    return data.outputOverwrite;
  };

  const setOutputOverwrite = (boolean) => {
    return (data.outputOverwrite = boolean);
  };

  const setNumber = (value, number) => {
    if (number === 'first') {
      data.firstNumber.value = value;
    } else if (number === 'second') {
      data.secondNumber.value = value;
    }
  };

  const setOperator = (value) => {
    return (data.operator = value);
  };

  const setDecimal = (number) => {
    if (number === 'first') {
      data.firstNumber.containsDecimal = true;
    } else if (number === 'second') {
      data.secondNumber.containsDecimal = true;
    }
    return;
  };

  const setTotal = (total) => {
    return (data.total = total);
  };

  const evaluate = () => {
    const firstNumber = parseFloat(data.firstNumber.value);
    const secondNumber = parseFloat(data.secondNumber.value);
    const operator = data.operator;
    let total = data.total;

    if (operator === null || firstNumber === null) {
      return 0;
    }

    if (firstNumber && secondNumber) {
      switch (operator) {
        case '+':
          total = methods.add(firstNumber, secondNumber);
          break;
        case '-':
          total = methods.subtract(firstNumber, secondNumber);
          break;
        case '*':
          total = methods.multiply(firstNumber, secondNumber);
          break;
        case '/':
          total = methods.divide(firstNumber, secondNumber);
          break;
      }
    }
    return total;
  };

  const clearData = () => {
    data.firstNumber.value = null;
    data.firstNumber.containsDecimal = false;

    data.secondNumber.value = null;
    data.secondNumber.containsDecimal = false;

    data.operator = null;
    data.total = null;
    data.outputOverwrite = true;
  };

  return {
    checkDecimal,
    checkNumberToUpdate,
    getOutputOverwrite,
    setOutputOverwrite,
    setNumber,
    setOperator,
    setDecimal,
    setTotal,
    evaluate,
    clearData,
  };
})();

// View
const UICtrl = (() => {
  const UISelectors = {
    timeDisplay: '.timeDisplay',
    output: '.output',
    btnClear: '.clear',
    btnPlusAndMinus: '.plusAndMinus',
    btnNumber: '.number',
    btnOperator: '.operator',
    btnPercent: '.percent',
    btnDecimal: '.decimal',
    btnEquals: '.equals',
  };

  // for brevity
  const $ = (element) => {
    return document.querySelector(element);
  };

  const getSelectors = () => {
    return UISelectors;
  };

  const getTimeDisplay = () => {
    return UISelectors.timeDisplay;
  };

  const getOutput = () => {
    return $(UISelectors.output).textContent;
  };

  const setOutput = (value) => {
    const output = $(UISelectors.output);
    if (output.textContent.trim().length + 1 < 10) {
      return (output.textContent += value);
    }
  };

  const setOutputOverwrite = (value) => {
    return ($(UISelectors.output).textContent = value);
  };

  const setDecimal = () => {
    let output = $(UISelectors.output).textContent;
    output = `${output}.`;
    return ($(UISelectors.output).textContent = output);
  };

  const setPercent = () => {
    let output = parseFloat($(UISelectors.output).textContent);
    output /= 100;
    output = `${output}`;
    return ($(UISelectors.output).textContent = output);
  };

  const setTotal = (total) => {
    if (total === null) {
      return ($(UISelectors.output).textContent = 'ERROR');
    }
    if (total.toString().length > 9) {
      total = total.toExponential(3);
      return ($(UISelectors.output).textContent = total);
    }
    return ($(UISelectors.output).textContent = total);
  };

  const changeSign = () => {
    let output = parseFloat($(UISelectors.output).textContent);
    output > 0
      ? (output = `-${Math.abs(output)}`)
      : (output = `${Math.abs(output)}`);
    return ($(UISelectors.output).textContent = output);
  };

  const clearOutput = () => {
    $(UISelectors.output).textContent = '0';
  };

  return {
    getSelectors,
    getTimeDisplay,
    getOutput,
    setOutput,
    setOutputOverwrite,
    setDecimal,
    setPercent,
    setTotal,
    changeSign,
    clearOutput,
  };
})();

// Controller
const AppCtrl = ((ItemCtrl, UICtrl) => {
  const loadEventListeners = () => {
    const UISelectors = UICtrl.getSelectors();

    const numberButtons = document.querySelectorAll(UISelectors.btnNumber);
    numberButtons.forEach((button) =>
      button.addEventListener('click', updateInput)
    );

    const operatorButtons = document.querySelectorAll(UISelectors.btnOperator);
    operatorButtons.forEach((button) =>
      button.addEventListener('click', updateOperator)
    );

    document
      .querySelector(UISelectors.btnEquals)
      .addEventListener('click', evaluate);

    document
      .querySelector(UISelectors.btnClear)
      .addEventListener('click', allClear);

    document
      .querySelector(UISelectors.btnPlusAndMinus)
      .addEventListener('click', changeSign);

    document
      .querySelector(UISelectors.btnDecimal)
      .addEventListener('click', addDecimal);

    document
      .querySelector(UISelectors.btnPercent)
      .addEventListener('click', addPercent);
  };

  const updateInput = (e) => {
    const outputOverwrite = ItemCtrl.getOutputOverwrite();
    console.log(outputOverwrite);
    if (outputOverwrite) {
      UICtrl.setOutputOverwrite(e.target.value);
      ItemCtrl.setOutputOverwrite(false);
    } else {
      UICtrl.setOutput(e.target.value);
    }
  };

  const updateOperator = (e) => {
    const output = UICtrl.getOutput();
    const number = ItemCtrl.checkNumberToUpdate();
    const operator = e.target.value;
    ItemCtrl.setNumber(output, number);
    ItemCtrl.setOperator(operator);

    if (number === 'first') {
      ItemCtrl.setOutputOverwrite(true);
    }
  };

  const changeSign = () => {
    UICtrl.changeSign();
  };

  const addDecimal = (e) => {
    const number = ItemCtrl.checkNumberToUpdate();
    const containsDecimal = ItemCtrl.checkDecimal(number);
    if (!containsDecimal) {
      ItemCtrl.setDecimal(number);
      UICtrl.setDecimal();
    }
  };

  const addPercent = () => {
    const number = ItemCtrl.checkNumberToUpdate();
    const containsDecimal = ItemCtrl.checkDecimal(number);
    if (!containsDecimal) {
      ItemCtrl.setDecimal(number);
      UICtrl.setPercent();
    }
  };

  const evaluate = () => {
    const output = UICtrl.getOutput();
    const number = ItemCtrl.checkNumberToUpdate();
    ItemCtrl.setNumber(output, number);
    const total = ItemCtrl.evaluate();
    ItemCtrl.setTotal(total);
    UICtrl.setTotal(total);
  };

  const allClear = () => {
    ItemCtrl.clearData();
    UICtrl.clearOutput();
  };

  const updateClock = () => {
    const timeDisplay = document.querySelector(UICtrl.getTimeDisplay());
    let date = new Date();
    date = date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    return (timeDisplay.textContent = date);
  };

  return {
    init() {
      loadEventListeners();
      allClear();

      // set up clock and auto update every minute
      updateClock();
      setInterval(() => {
        updateClock();
      }, 1000 * 60);
    },
  };
})(ItemCtrl, UICtrl);

// initialize app
AppCtrl.init();
