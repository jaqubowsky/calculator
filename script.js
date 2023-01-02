let displayValue = "";
let currentOperator = "";
let firstNum;
let secondNum;
let shouldResetScreen = true;

const numberButtons = document.querySelectorAll("[data-number]");
const operatorButtons = document.querySelectorAll("[data-operator]");
const currentOperation = document.querySelector(".screen-current");
const previousOperation = document.querySelector(".screen-before");
const pointNumber = document.querySelector("[data-point-number]");
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
    if (displayValue === "" && typeof firstNumber === "undefined") {
      firstNum = 0;
    }
    if (currentOperator !== "" && !shouldResetScreen) {
      operate();
    } else if (firstNum === undefined && !shouldResetScreen) {
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
  if (!currentOperator) return;
  if (!displayValue && typeof firstNum === undefined) return;
  operate(currentOperator, firstNum, secondNum);
  equalClear();
});

clearButton.addEventListener("click", () => {
  clearAll();
});

pointNumber.addEventListener("click", () => createPoint());

// FUNCTIONS

function equalClear() {
  currentOperator = "";
  secondNum = undefined;
  shouldResetScreen = true;
}

function operate() {
  if (!shouldResetScreen) {
    shouldResetScreen = true;
    secondNum = parseFloat(currentOperation.textContent);
    calculate(currentOperator, firstNum, secondNum);
  }
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
  if (currentOperation.textContent === "0" || shouldResetScreen) {
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

function createPoint() {
  if (displayValue.includes(".") && !shouldResetScreen) return;
  if (shouldResetScreen) {
    currentOperation.textContent = "0";
    shouldResetScreen = false;
  }
  currentOperation.textContent += ".";
}

function clearAll() {
  currentOperator = "";
  firstNum = undefined;
  secondNum = undefined;
  displayValue = "";
  currentOperation.textContent = displayValue;
  previousOperation.textContent = displayValue;
  shouldResetScreen = true;
}

function calculate(operator, firstNumber, secondNumber) {
  switch (operator) {
    case "%":
      if (secondNum === 0) {
        alert("You can't divide by zero!");
        clearAll();
        return;
      }
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

  previousOperation.textContent = `${firstNum} ${currentOperator} ${secondNum} =`;
  firstNum = parseFloat(currentOperation.textContent);
}
