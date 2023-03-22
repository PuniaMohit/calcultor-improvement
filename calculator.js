
let of = document.getElementById('js-off').addEventListener('click', off);
let screen = document.querySelector('.screen');
let buttons = document.querySelectorAll('.button');
let flag = 0;

function off() {
    console.log('hello')
    document.querySelector('.screen').value = '';
    flag = 0;
}

buttons.forEach(function (button) {
    button.addEventListener('click', function (event) {
        let value = button.textContent;
        document.querySelector('.screen').value += value
        let presentValue = document.querySelector('.screen').value
        let checkingRepatedOperator = presentValue[presentValue.length - 1]
        console.log(presentValue.length - 1)
        if (value !== '=') {
            if (presentValue.length - 1 !== 0) {
                if (checkingRepatedOperator === '-'
                    || checkingRepatedOperator === '*'
                    || checkingRepatedOperator === '+'
                    || checkingRepatedOperator === '-') {
                    if (!(presentValue[presentValue.length - 2] >= 0
                        && presentValue[presentValue.length - 2] <= 9)) {
                        alert('Two operator continous')
                        let showAfterReaptedOperator = presentValue.slice(0, -1)
                        document.querySelector('.screen').value = showAfterReaptedOperator
                    }
                }
            }
        }
        if (value === "=") {
            let checkingLastOperatorWithoutNumber = presentValue[presentValue.length - 2]
            if (checkingLastOperatorWithoutNumber === '/'
                || checkingLastOperatorWithoutNumber === '*'
                || checkingLastOperatorWithoutNumber === '+'
                || checkingLastOperatorWithoutNumber === '-') {
                alert('enter valid number')
                document.querySelector('.screen').value = ''
            }
            else {
                let solveValue = presentValue.slice(0, -1)
                console.log(solveValue)
                startEvaluation(solveValue)
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