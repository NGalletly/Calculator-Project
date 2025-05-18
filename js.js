const allNumpad = document.querySelectorAll(".digit");
const allOps = document.querySelectorAll(".opsButtons");
const displayBar = document.querySelector(".display-bar");
const clearBtn = document.querySelector(".clear");
const equalsBtn = document.querySelector(".equalsBtn");

let numberA = null;
let numberB = null;
let operator = null;
const maxDisplayLength = 18;

let displayNeedsClearing = false;
let evaluated = false;

function resetDisplay() {
  displayBar.textContent = "";
}

displayBar.textContent = 0;
let inputData = "";

allNumpad.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.textContent === "." && inputData.includes(".")) return;

    if (displayBar.textContent.length >= maxDisplayLength) return;

    if (displayBar.textContent === "0" || displayNeedsClearing || evaluated) {
      resetDisplay();
      inputData = "";

      if (evaluated && operator !== null) {
        operator = null;
        numberA = null;
        numberB = null;
      }

      evaluated = false;
      displayNeedsClearing = false;
    }

    displayBar.textContent += button.textContent;
    inputData += button.textContent;
  });
});

// Clear button
clearBtn.addEventListener("click", () => {
  resetDisplay();
  displayBar.textContent = 0;
  inputData = "";
});

//Calculator functionality

allOps.forEach((button) => {
  button.addEventListener("click", () => {
    if (displayBar.textContent.length >= maxDisplayLength) {
      resetDisplay();
    }

    numberA = inputData;
    operator = button.textContent;
    displayNeedsClearing = true;
  });
});

equalsBtn.addEventListener("click", () => {
  console.log("equals button clicked");
  numberB = inputData;
  const a = parseFloat(numberA);
  const b = parseFloat(numberB);
  let result = null;

  switch (operator) {
    case "+":
      result = a + b;
      break;
    case "-":
      result = a - b;
      break;
    case "x":
      result = a * b;
      break;
    case "/":
      result = b === 0 ? "Error" : a / b;
      break;

    default:
      console.log(`3rr0r`);
  }
  const truncated = result.toString().slice(0, 18);
  displayBar.textContent = truncated;

  numberA = truncated;
  evaluated = true;
});
