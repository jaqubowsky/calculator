let displayValue = "";
let currentOperator = "";
let firstNum = 0;
let secondNum;
let shouldResetScreen = true;

const numberButtons = document.querySelectorAll("[data-number]");
const operatorButtons = document.querySelectorAll("[data-operator]");
const currentOperation = document.querySelector(".screen-current");
const previousOperation = document.querySelector(".screen-before");
const deleteButton = document.querySelector("[data-delete]");
const clearButton = document.querySelector("[data-all-clear]");
const equalButton = document.querySelector("[data-equal]");

numberButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const number = e.target.textContent;
    appendNumber(number);
  });
});

operatorButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    if (displayValue === "" && isNaN(firstNum)) {
      firstNum = 0;
    }
    if (currentOperator !== "" && !shouldResetScreen) {
      operate();
    } else if (firstNum === 0 && !shouldResetScreen) {
      firstNum = parseFloat(currentOperation.textContent);
    }

    shouldResetScreen = true;

    const operator = e.target;
    currentOperator = operator.textContent;
    previousOperation.textContent = `${firstNum} ${currentOperator}`;
  });
});

deleteButton.addEventListener("click", () => {
  deleteNumber();
});

equalButton.addEventListener("click", () => {
  if (!displayValue && typeof firstNum !== "number") return;
  secondNum = parseInt(currentOperation.textContent);
  operate(currentOperator, firstNum, secondNum);
  equalClear();
});

clearButton.addEventListener("click", () => {
  clearAll();
});

// FUNCTIONS

function equalClear() {
  currentOperator = "";
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

function deleteNumber() {
  currentOperation.textContent = currentOperation.textContent
    .toString()
    .slice(0, -1);
}

function clearAll() {
  currentOperator = "";
  firstNum = "";
  secondNum = "";
  displayValue = "";
  currentOperation.textContent = displayValue;
  previousOperation.textContent = displayValue;
  shouldResetScreen = false;
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
