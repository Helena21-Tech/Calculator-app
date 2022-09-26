class Calculator {
  constructor(calcDisplay) {
    this.currentOperandValue = calcDisplay;
    this.clear();
  }
  clear() {
    this.prevOperand = "";
    this.curOperand = "";
    this.operation = undefined;
  }
  appendNumber(number) {
    if (number === "." && this.curOperand.includes(".")) return;
    if (this.curOperand.toString().length >= 1) {
      this.prevNum = this.curOperand;
      this.newNum = number;
      this.curOperand = this.prevNum.toString() + this.newNum.toString();
    } else {
      this.curOperand = number;
    }
  }
  delete() {
    this.curOperand = this.curOperand.toString().slice(0, -1);
  }
  chooseOperation(operator) {
    if (this.curOperand === "") return;
    if (this.prevOperand !== "") {
      this.compute();
      console.log(this.curOperand);
    }
    this.operation = operator;
    this.prevOperand = this.curOperand;
    this.curOperand = "";
    
  }

  compute() {
    let computation;

    const prev = parseFloat(this.prevOperand);
    const cur = parseFloat(this.curOperand);
    console.log(prev, cur);
    if (isNaN(prev) || isNaN(cur)) return;
    switch (this.operation) {
      case "+":
        computation = prev + cur;
        break;
      case "/":
        computation = prev / cur;
        break;
      case "-":
        computation = prev - cur;
        break;
      case "*":
        computation = prev * cur;
        break;
      default:
        return;
    }
    this.curOperand = computation;
    this.operation = undefined;
    this.prevOperand = "";
  }
  getNumDisplay(number){
    const numString = number.toString();
    const integerNum = numString.split(".")[0];
    const decimalNum = numString.split(".")[1];
    let integerDisplay;
    if( isNaN(integerNum)){
      integerDisplay = "";
    } else{
      integerDisplay = integerNum.toLocaleString("en-US", {
        maximumFractionDigits : 0
      });
    }
    if (decimalNum != null){
     return `${integerDisplay}.${decimalNum}`
    } else{
      return integerDisplay;
    }
  }
  updateDisplay() {
    this.currentOperandValue.innerText = this.getNumDisplay(this.curOperand) ;
  }
}

const calcBtns = document.querySelectorAll(".btn");
const calcOperators = document.querySelectorAll(".operator");
const calcNumbers = document.querySelectorAll(".number");
const calcDisplay = document.querySelector(".display");
const calcDel = document.querySelector(".delete");
const calcClear = document.querySelector(".all-clear");
const calcCompute = document.querySelector(".compute");
const toggleCir = document.querySelector(".slide");
const calcDiv = document.querySelector(".calculator");



const toggleTheme = ()=>{
  if(calcDiv.classList.contains("theme-1")){
    calcDiv.classList.replace("theme-1", "theme-2")
  } else if (calcDiv.classList.contains("theme-2")){
    calcDiv.classList.replace("theme-2", "theme-3");
  } else if ((calcDiv.classList.contains("theme-3"))){
    calcDiv.classList.replace("theme-3", "theme-1");
  }
}
toggleCir.addEventListener("click", toggleTheme)
const calculator = new Calculator(calcDisplay);

calcNumbers.forEach((btn) => {
  btn.addEventListener("click", () => {
    calculator.appendNumber(btn.innerText);
    calculator.updateDisplay();
  });
});

calcOperators.forEach((btn) => {
  btn.addEventListener("click", () => {
    calculator.chooseOperation(btn.innerText);
    calculator.updateDisplay();
  });
});
calcCompute.addEventListener("click", () => {
  calculator.compute();
  calculator.updateDisplay();
});
calcDel.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});
calcClear.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});
