
let of = document.getElementById('js-off').addEventListener('click', off);
let screen = document.querySelector('.screen');
let buttons = document.querySelectorAll('.button');
let flag = 0;

function off() {
    console.log('hello')
    document.querySelector('.screen').value = '';
}

buttons.forEach(function (button) {
    button.addEventListener('click', function (event) {
        let value = button.textContent;
        document.querySelector('.screen').value += value
        let presentValue = document.querySelector('.screen').value
        let checkingRepatedOperator = presentValue[presentValue.length - 1]
        let lastShowingThing = presentValue[presentValue.length - 1]
        let secondLastShowingThing = presentValue[presentValue.length - 2]
        console.log(lastShowingThing)
        if (value !== '=') {
            if (presentValue.length - 1 !== 0) {
                console.log(presentValue[presentValue.length - 1])
                if (lastShowingThing === '.') {  // in between . than 0.
                    if (['/', '*', '+', '-'].includes(presentValue[presentValue.length - 2])) {
                        let newInput = document.querySelector('.screen').value.slice(0, -1)     //write code to insert 0 in second last place of string
                        document.querySelector('.screen').value = newInput + "0."
                    }
                    // if (typeof presentValue[presentValue.length - 2] === 'number') {

                    // }
                    if (presentValue[presentValue.length - 2] === '.') {
                        alert('invalid number')
                        screen.value = screen.value.slice(0, -1)                                  // remove last . decimal from ..
                    }
                    if (presentValue.includes('+') || presentValue.includes('-') || presentValue.includes('*') || presentValue.includes('/')) {
                        let string = ''
                        for (let i = presentValue.length - 2; i >= 0; i--) {
                            if (presentValue[i] >= 0 || presentValue <= 9 || presentValue[i]=='.') {
                                string = string + presentValue[i]
                            }
                            else {
                                break                                              // remove second decimal from  5*4.4+5.5.
                            }
                        }
                        console.log(string)
                       if(string.includes('.')){
                        alert('invalid number')
                        screen.value = screen.value.slice(0, -1)
                       }
                    }
                    else {
                        console.log("hello")
                        let numberWithoutFirstDecimal = screen.value.slice(0, -1)
                       if(numberWithoutFirstDecimal.includes('.')){
                        alert('invalid number')
                        screen.value=screen.value.slice(0, -1)
                       }                                                         //  remove second decimal from 5.5.
                                                                                          
                    }
                }
                if (checkingRepatedOperator === '/'
                    || checkingRepatedOperator === '*'
                    || checkingRepatedOperator === '+'
                    || checkingRepatedOperator === '-') {
                    if (!(presentValue[presentValue.length - 2] >= 0
                        && presentValue[presentValue.length - 2] <= 9) && !(presentValue[presentValue.length - 2] === '.')) {
                        alert('Two operator continous')                                 // to stop +/ but ./ not stop
                        let showAfterReaptedOperator = presentValue.slice(0, -1)
                        document.querySelector('.screen').value = showAfterReaptedOperator
                    }
                }
            }
            else {   //if first time . than it will be 0.
                if (lastShowingThing === '.') {
                    document.querySelector('.screen').value = "0."     // write to insert o in front of .   , in first letters of question
                }
            }
        }
        if (value === "=") {
            if (presentValue.length - 1 === 0) {
                document.querySelector('.screen').value = ''    //if first value is = than empty input field //stoping====
            }
            else {
                if (lastShowingThing === '=' && !(isNaN(presentValue.slice(0, -1)))) {
                    document.querySelector('.screen').value = document.querySelector('.screen').value.slice(0, -1)  //stoping first letter 8==
                }
                else {
                    let checkingLastOperatorWithoutNumber = presentValue[presentValue.length - 2]
                    if (checkingLastOperatorWithoutNumber === '/'
                        || checkingLastOperatorWithoutNumber === '*'
                        || checkingLastOperatorWithoutNumber === '+'
                        || checkingLastOperatorWithoutNumber === '-'
                    ) {
                        alert('enter valid number')  //checking if just after operator no equal sign
                        document.querySelector('.screen').value = ''
                    }
                    else {
                        let solveValue = presentValue.slice(0, -1)
                        console.log(solveValue)
                        startEvaluation(solveValue)
                    }
                }
            }

        }
    })
});


function startEvaluation(equation) {
    console.log(equation)
    let operators = []
    let operands = []
    let operandString = ""

    for (let index = 0, operatorIndex = 0, bracketIndex = 0; index < equation.length; index++) {

        if (equation.charAt(index) == '+'
            || equation.charAt(index) == '-'
            || equation.charAt(index) == '*'
            || equation.charAt(index) == '/') {

            operators[operatorIndex++] = equation.charAt(index)
            operandString += " "
        }
        else {
            operandString += equation.charAt(index)
        }
    }

    operandsTemp = operandString.split(" ")
    console.log(operandsTemp)  // in string here in array
    console.log(operators)    // array operator in string

    // Storing operands into operands[] array
    for (var index = 0, indexOperand = 0; index < operators.length; index++) {
        operands[index] = Number(operandsTemp[indexOperand++])
        console.log(operands)
    }
    operands[operands.length] = Number(operandsTemp[indexOperand])
    console.log(operands)   //in number here in array


    // Result variables
    let result = 0
    let finalResult = 0

    // This will evaluate remaining equation (without brackets)
    // after processing brackets (if available)
    finalResult = evaluate(0, operators.length, operators, operands)


    // FINAL RESULT
    console.log(`FINAL RESULT = ${finalResult}`)
    console.log(document.getElementsByClassName('screen').value)
    screen.value = finalResult
}

// Evaluation of equation by using BOAD MASS method
function evaluate(indexStart, indexEnd, operators, operands) {

    // First evaluating MULTIPLICATION and DIVISION
    for (let index = indexStart; index < indexEnd; index++) {

        let indexFirstOperand = index
        let indexNextOperand = index + 1
        let indexNextOperator = index

        if (operators[indexNextOperator] == null) {
            for (let indexNext = indexNextOperator + 1; indexNext < operators.length; indexNext++) {
                if (operators[indexNext] != null) {
                    indexNextOperator = indexNext
                    indexFirstOperand = indexNext
                    indexNextOperand = indexNext + 1
                    index = indexNext - 1
                    break
                }
            }
        }

        if (operands[indexNextOperand] == null) {
            for (let indexNext = indexNextOperand + 1; indexNext < operands.length; indexNext++) {
                if (operands[indexNext] != null) {
                    indexNextOperand = indexNext
                    index = indexNext - 1
                    break
                }
            }
        }

        // MULTIPLICATION 
        if (operators[indexNextOperator] == '*') {
            result = operands[indexFirstOperand] * operands[indexNextOperand]
            operands[indexNextOperand] = result
            operands[indexFirstOperand] = null
            operators[indexNextOperator] = null
            finalResult = result
            result = 0
            console.log(operands)
            console.log(operators)
        }
        // DIVISION
        else if (operators[indexNextOperator] == '/') {
            result = operands[indexFirstOperand] / operands[indexNextOperand]

            operands[indexNextOperand] = result
            operands[indexFirstOperand] = null
            operators[indexNextOperator] = null
            finalResult = result
            result = 0

            console.log(operands)
            console.log(operators)
        }
    }

    // Next evaluating ADDITION and SUBSTRACTION
    for (let index = indexStart; index < indexEnd; index++) {
        console.log(index)
        let indexFirstOperand = index
        let indexNextOperand = index + 1
        let indexNextOperator = index

        if (operators[indexNextOperator] == null) {
            for (let indexNext = indexNextOperator + 1; indexNext < operators.length; indexNext++) {
                if (operators[indexNext] != null) {
                    indexNextOperator = indexNext
                    indexFirstOperand = indexNext
                    indexNextOperand = indexNext + 1
                    index = indexNext - 1
                    break
                }
            }
        }

        if (operands[indexNextOperand] == null) {
            for (let indexNext = indexNextOperand + 1; indexNext < operands.length; indexNext++) {
                if (operands[indexNext] != null) {
                    indexNextOperand = indexNext
                    index = indexNext - 1
                    break
                }
            }
        }

        // ADDITION 
        if (operators[indexNextOperator] == '+') {
            result = operands[indexFirstOperand] + operands[indexNextOperand]
            operands[indexNextOperand] = result
            operands[indexFirstOperand] = null
            operators[indexNextOperator] = null
            finalResult = result
            result = 0
            console.log(operands)
            console.log(operators)
        }
        // SUBSTRACTION
        else if (operators[indexNextOperator] == '-') {

            result = operands[indexFirstOperand] - operands[indexNextOperand]
            operands[indexNextOperand] = result
            operands[indexFirstOperand] = null
            operators[indexNextOperator] = null
            console.log(operands)
            console.log(operators)
            finalResult = result
            result = 0

            console.log(operands)
            console.log(operators)
        }
    }
    // Returning FINAL RESULT
    console.log(finalResult)
    return finalResult
}