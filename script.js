let displayValue = "";
let currentOperator = "";
let firstNum = "";
let secondNum = "";
let shouldResetScreen = false;

const numberButtons = document.querySelectorAll("[data-number]");
const operatorButtons = document.querySelectorAll("[data-operator]");
const currentOperation = document.querySelector(".screen-current");
const previousOperation = document.querySelector(".screen-before");
const equalButton = document.querySelector("[data-equal]");

numberButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const number = e.target.textContent;
    appendNumber(number);
  });
});

operatorButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    if (currentOperator !== "" && !shouldResetScreen) {
      operate();
    } else {
      firstNum = parseFloat(currentOperation.textContent);
    }

    shouldResetScreen = true;

    const operator = e.target;
    currentOperator = operator.textContent;
    previousOperation.textContent = `${firstNum} ${currentOperator}`;
  });
});

equalButton.addEventListener("click", () => {
  secondNum = parseInt(currentOperation.textContent);
  operate(currentOperator, firstNum, secondNum);
  equalClear();
});

// FUNCTIONS

function equalClear() {
  currentOperator = "";
  firstNum = "";
  secondNum = "";
  shouldResetScreen = true;
}

function operate() {
  if (!shouldResetScreen) {
    shouldResetScreen = true;
    secondNum = parseFloat(currentOperation.textContent);
    calculate(currentOperator, firstNum, secondNum);
    previousOperation.textContent = `${firstNum} ${currentOperator} ${secondNum} =`;
  }

  firstNum = parseFloat(currentOperation.textContent);
}

function add(firstNum, secondNum) {
  return firstNum + secondNum;
}

function subtract(firstNum, secondNum) {
  return firstNum - secondNum;
}

function multiply(firstNum, secondNum) {
  return firstNum * secondNum;
}

function divide(firstNum, secondNum) {
  return firstNum / secondNum;
}

function appendNumber(number) {
  if (displayValue === "0" || shouldResetScreen) {
    currentOperation.textContent = "";
    shouldResetScreen = false;
  }
  displayValue = currentOperation.textContent += number;
}

function calculate(operator, firstNumber, secondNumber) {
  switch (operator) {
    case "%":
      currentOperation.innerHTML = divide(firstNumber, secondNumber);
      break;
    case "-":
      currentOperation.innerHTML = subtract(firstNumber, secondNumber);
      break;
    case "×":
      currentOperation.innerHTML = multiply(firstNumber, secondNumber);
      break;
    case "+":
      currentOperation.innerHTML = add(firstNumber, secondNumber);
      break;
    default:
      return;
  }
}
