class Calculator{
    constructor(previousOperandTextElement,currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }
    clear(){
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }
    delete(){
      this.currentOperand = this.currentOperand.toString().slice(0,-1)
    }
    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
      }
    
    chooseOperation(operation){
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
          this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
      }
      
    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return
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
          case '÷':
            computation = prev / current
            break
          default:
            return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
      }

    getDisplayNumber(number){
    //  const floatNumber = parseFloat(number)
    //  if(isNaN(floatNumber)) return ''
    //  return floatNumber.toLocaleString('en')
    // to get over this problem we must divide the number in two parts before the point and after the point after
    const stringNumber = number.toString()  // as we need to split the number in two parts before
    const integerpart = parseFloat(stringNumber.split('.')[0])  // are taking the left part of that stringNumber
    const decimalpart = stringNumber.split('.')[1] // right part of the stringNumber

    let intergerDisplay;
    if(isNaN(integerpart)) {
      intergerDisplay = ''
    }else{
      intergerDisplay = integerpart.toLocaleString('en',{maximumFractionDigits:0})
    }
    if(decimalpart!=null){
      return `${intergerDisplay}.${decimalpart}`
    }
    return intergerDisplay
}
    updateDisplay(){
        this.currentOperandTextElement.innerText = 
        this.getDisplayNumber(this.currentOperand)
        // this.previousOperandTextElement.innerText = this.previousOperand

        if (this.operation != null) {
            this.previousOperandTextElement.innerText =
              `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        }else{
            this.previousOperandTextElement.innerText = ''
        }
    }
}


const numbers = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]')
const allclear = document.querySelector('[data-all-clear]');
const deletebutton = document.querySelector('[data-delete]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');



const calculator = new Calculator(previousOperandTextElement,currentOperandTextElement);



numbers.forEach(button => {
    button.addEventListener('click',() => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.chooseOperation(button.innerText);
      calculator.updateDisplay();
    })
  })

allclear.addEventListener('click',button => {
    calculator.clear();
     calculator.updateDisplay();
})

equalsButton.addEventListener('click',button => {
    calculator.compute();
     calculator.updateDisplay();
})

deletebutton.addEventListener('click',button => {
    calculator.delete();
    calculator.updateDisplay();
})
