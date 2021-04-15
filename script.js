class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear()
    }

    clear() {
        this.currentOperand = ''
        this.perviousOperand = ''
        this.operation = undefined
    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0,-1)
    }
    allDelete(){
        this.currentOperand = this.currentOperand.toString().slice(0,0)
    }

    appendNumber(number){
        if (this.currentOperand === undefined){
            this.currentOperand = number;
        }
        else if (number === '.' && this.currentOperand.includes('.')){
        return 
        }
        else if (this.currentOperand === '.') {
        return this.currentOperand = '0.'+ number 
        }
        else {
            this.currentOperand = this.currentOperand.toString() + number.toString()
        }
    }
    chooseOperation(operation){
        if (this.currentOperand === '') return
        if (this.perviousOperand !== ''){
            this.compute()
        }
        this.operation = operation
        this.perviousOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute(){
        let computation 
        const prev = parseFloat(this.perviousOperand)
        const current = parseFloat(this.currentOperand)
        if(isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break    
            case '/':
                computation = prev / current
                 break  
            default:
                return 
        }
        // для решения проблемы ниже надо поключать библиотеку. 
        if (computation === 0.30000000000000004){
            computation = 0.3
        }
        this.currentOperand = computation
        this.operation = undefined
        this.perviousOperand = ''
    }

    getDisplayNumber(number){
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)){
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en',{
                maximumFractionDigits: 0 })
            }
            if (decimalDigits != null){
                return `${integerDisplay}.${decimalDigits}`
            } else {
                return integerDisplay
            }
        }  


    updateDisplay(){
        this.currentOperandTextElement.innerText =  
            this.getDisplayNumber(this.currentOperand)
        if (this.operation != null){
            this.previousOperandTextElement.innerText = 
             `${this.getDisplayNumber(this.perviousOperand)} ${this.operation}`           
        } else {
            this.previousOperandTextElement.innerText = ''
        }
    }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');


const calculator = new Calculator(previousOperandTextElement,currentOperandTextElement)


numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})
    

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click',button => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click',button => {
    calculator.allDelete()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click',button => {
    calculator.delete()
    calculator.updateDisplay()
})