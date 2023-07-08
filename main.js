// Calculator class
class Calculator {
	constructor(previousOperandTextElement, currentOperandTextElement) {
		this.previousOperandTextElement = previousOperandTextElement;
		this.currentOperandTextElement = currentOperandTextElement;
		this.clear();
		this.registerKeyboardEvents();
	}

	clear() {
		this.currentOperand = "";
		this.previousOperand = "";
		this.operation = undefined;
	}

	delete() {
		this.currentOperand = this.currentOperand.toString().slice(0, -1);
	}

	appendNumber(number) {
		if (number === "." && this.currentOperand.includes(".")) return;
		this.currentOperand = this.currentOperand.toString() + number.toString();
	}

	chooseOperation(operation) {
		if (operation === "(" || operation === ")") {
			this.handleParentheses(operation);
		} else if (operation === "^") {
			this.square();
		} else if (operation === "sin") {
			this.sin();
		} else if (operation === "cos") {
			this.cos();
		} else if (operation === "tan") {
			this.tan();
		} else if (operation === "sqrt") {
			this.sqrt();
		} else {
			if (this.currentOperand === "") return;
			if (this.operation && this.previousOperand) {
				this.compute();
			}
			this.operation = operation;
			this.previousOperand = this.currentOperand;
			this.currentOperand = "";
		}
	}

	handleParentheses(parenthesis) {
		if (parenthesis === "(") {
			this.currentOperand += parenthesis;
		} else {
			if (!this.currentOperand.includes("(")) return;
			this.currentOperand += parenthesis;
		}
	}

	square() {
		const current = parseFloat(this.currentOperand);
		if (isNaN(current)) return;
		const result = current * current;
		this.currentOperand = result.toString();
		this.operation = undefined;
		this.previousOperand = "";
	}

	sin() {
		const current = parseFloat(this.currentOperand);
		if (isNaN(current)) return;
		const result = Math.sin(current);
		this.currentOperand = result.toString();
		this.operation = undefined;
		this.previousOperand = "";
	}

	cos() {
		const current = parseFloat(this.currentOperand);
		if (isNaN(current)) return;
		const result = Math.cos(current);
		this.currentOperand = result.toString();
		this.operation = undefined;
		this.previousOperand = "";
	}

	tan() {
		const current = parseFloat(this.currentOperand);
		if (isNaN(current)) return;
		const result = Math.tan(current);
		this.currentOperand = result.toString();
		this.operation = undefined;
		this.previousOperand = "";
	}

	sqrt() {
		const current = parseFloat(this.currentOperand);
		if (isNaN(current)) return;
		const result = Math.sqrt(current);
		this.currentOperand = result.toString();
		this.operation = undefined;
		this.previousOperand = "";
	}

	compute() {
		let computation;
		const prev = parseFloat(this.previousOperand);
		const current = parseFloat(this.currentOperand);
		if (isNaN(prev) || isNaN(current)) return;
		switch (this.operation) {
			case "+":
				computation = prev + current;
				break;
			case "-":
				computation = prev - current;
				break;
			case "*":
				computation = prev * current;
				break;
			case "/":
				computation = prev / current;
				break;
			case "%":
				computation = prev % current;
				break;
			case "|":
				computation = prev | current;
				break;
			default:
				return;
		}
		this.currentOperand = computation.toString();
		this.operation = undefined;
		this.previousOperand = "";
	}

	updateDisplay() {
		this.currentOperandTextElement.textContent = this.currentOperand;
		if (this.operation && this.previousOperand) {
			this.previousOperandTextElement.textContent = `${this.previousOperand} ${this.operation} `;
		} else {
			this.previousOperandTextElement.textContent = "";
		}
	}

	copyOutput() {
		const output = this.currentOperandTextElement.textContent;
		navigator.clipboard.writeText(output);
		alert("ATR Company tells you the result: " + output);
	}

	registerKeyboardEvents() {
		document.addEventListener("keydown", (event) => {
			const key = event.key;
			if (/\d/.test(key)) {
				// Number key pressed
				this.appendNumber(key);
				this.updateDisplay();
			} else {
				// Operator key pressed
				switch (key) {
					case "+":
					case "-":
					case "*":
					case "/":
					case "%":
					case "|":
					case "^":
						this.chooseOperation(key);
						this.updateDisplay();
						break;
					case "Enter":
						this.compute();
						this.updateDisplay();
						break;
					case "Backspace":
						this.delete();
						this.updateDisplay();
						break;
					case "Escape":
						this.clear();
						this.updateDisplay();
						break;
					case "s":
						this.chooseOperation("sin");
						this.updateDisplay();
						break;
					case "c":
						this.chooseOperation("cos");
						this.updateDisplay();
						break;
					case "t":
						this.chooseOperation("tan");
						this.updateDisplay();
						break;
					case "r":
						this.chooseOperation("sqrt");
						this.updateDisplay();
						break;
					default:
						break;
				}
			}
		});
	}
}

// Initialize calculator
const previousOperandTextElement = document.querySelector("[data-previous-operand]");
const currentOperandTextElement = document.querySelector("[data-current-operand]");
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

// Button event listeners
const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const copyButton = document.querySelector(".oop");

numberButtons.forEach((button) => {
	button.addEventListener("click", () => {
		calculator.appendNumber(button.textContent);
		calculator.updateDisplay();
	});
});

operationButtons.forEach((button) => {
	button.addEventListener("click", () => {
		calculator.chooseOperation(button.textContent);
		calculator.updateDisplay();
	});
});

equalsButton.addEventListener("click", () => {
	calculator.compute();
	calculator.updateDisplay();
});

allClearButton.addEventListener("click", () => {
	calculator.clear();
	calculator.updateDisplay();
});

deleteButton.addEventListener("click", () => {
	calculator.delete();
	calculator.updateDisplay();
});

copyButton.addEventListener("click", () => {
	calculator.copyOutput();
});
