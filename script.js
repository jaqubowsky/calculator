const numberButtons = document.querySelectorAll("[data-number]");
const operatorButtons = document.querySelectorAll("[data-operator]");
const currentOperation = document.querySelector(".screen-current");
const previousOperation = document.querySelector(".screen-before");
const equalButton = document.querySelector("[data-equal]");

let displayValue = "";
let currentOperator = "";

numberButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const number = e.target.textContent;
    displayValue = currentOperation.textContent += number;
    console.log(displayValue);
  });
});

operatorButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const operator = e.target.textContent;
    currentOperator = operator;
    console.log(currentOperator);
    updateValueBefore(displayValue, currentOperator);
  });
});

equalButton.addEventListener("click", () => {
  operate();
  updateValueBefore();
});

// FUNCTIONS

function operate(operator, firstNumber, secondNumber) {
  switch (operator) {
    case "%":
      divide(firstNumber, secondNumber);
      break;
    case "-":
      subtract(firstNumber, secondNumber);
    case "*":
      multiply(firstNumber, secondNumber);
    case "+":
      add(firstNumber, secondNumber);
    default:
      return;
  }
}

function add(firstNum, secondNum) {
  currentOperation.innerHTML = firstNum + secondNum;
}

function subtract(firstNum, secondNum) {
  currentOperation.innerHTML = firstNum + secondNum;
}

function multiply(firstNum, secondNum) {
  currentOperation.innerHTML = firstNum + secondNum;
}

function divide(firstNum, secondNum) {
  currentOperation.innerHTML = firstNum + secondNum;
}

function updateValueBefore(displayValue, currentOperator) {
  previousOperation.textContent = `${displayValue} ${currentOperator}`;
}
