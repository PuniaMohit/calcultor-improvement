
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
            if(presentValue.length - 1!==0){
            if (checkingRepatedOperator === '-'
                || checkingRepatedOperator === '*'
                || checkingRepatedOperator === '+'
                || checkingRepatedOperator === '-') {
                if (!(presentValue[presentValue.length - 2] >= 0
                    && presentValue[presentValue.length - 2] <= 9)) {
                        alert('Two operator continous')
                        document.querySelector('.screen').value = ''
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
                let solveValue=presentValue.slice(0, -1)
                console.log(solveValue)
                startEvaluation(solveValue)
            }
        }
    })
});


function startEvaluation(equation) {
    console.log(equation)

    // console.log(eval(equation))

    // var equation = prompt("Enter the equation")

    // Creating empty arrays for storing
    // brackets, operators, operands
    var brackets = []
    var operators = []
    var operands = []
    var operandString = ""


    for (var index = 0, operatorIndex = 0, bracketIndex = 0; index < equation.length; index++) {

        // Checking for operators
        if (equation.charAt(index) == '+'
            || equation.charAt(index) == '-'
            || equation.charAt(index) == '*'
            || equation.charAt(index) == '/') {

            // Below condition is to deal with (a+b)+(c+d) this part of equation
            if (equation.charAt(index - 1) == ')' && equation.charAt(index + 1) == '(') {
                operators[operatorIndex++] = "*"
                brackets[bracketIndex++] = null
                brackets[bracketIndex++] = null
                operators[operatorIndex++] = equation.charAt(index)
                operandString += " 1 "
            }
            // Fetching operators and storing into operators[] array
            else {
                operators[operatorIndex++] = equation.charAt(index)
                brackets[bracketIndex++] = null

                operandString += " "
            }
        }
        // Fetching brackets and storing into brackets[] array
        else if (equation.charAt(index) == '(' || equation.charAt(index) == ')') {
            brackets[bracketIndex++] = equation.charAt(index)
            operators[operatorIndex++] = null
        }
        // Fetching operand digits and storing into operandString
        else {
            operandString += equation.charAt(index)
        }
    }

    // Temp array of operands for further processing
    // before storing operands into operands[] array
    operandsTemp = operandString.split(" ")

    // Storing operands into operands[] array
    for (var index = 0, indexOperand = 0; index < operators.length; index++) {
        if (brackets[index] == null) {
            operands[index] = Number(operandsTemp[indexOperand++])
        }
        else {
            operands[index] = null
        }
    }
    operands[operands.length] = Number(operandsTemp[indexOperand])



    console.log(brackets)
    console.log(operators)
    console.log(operands)


    // Result variables
    var result = 0
    var finalResult = 0

    // Checking if brackets are present in the equation or not
    if (brackets.length > 0) {

        for (var index = 0; index < brackets.length; index++) {

            // Checking for occurance of closing bracket
            // and then searching for its corresponding
            // opening bracket by reverse traversing
            // and then evaluating that particular bracket equation
            // PROCESSES NESTED BRACKETS AS WELL
            if (brackets[index] == ')') {
                var indexBracketEnd = index
                for (var indexBracket = indexBracketEnd; indexBracket >= 0; indexBracket--) {
                    if (brackets[indexBracket] == '(') {
                        var indexBracketStart = indexBracket
                        evaluate(indexBracketStart, indexBracketEnd, operators, operands)
                        brackets[indexBracketStart] = null
                        brackets[indexBracketEnd] = null
                        break
                    }
                }
                console.log(brackets)
            }
        }
    }



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
    for (var index = indexStart; index < indexEnd; index++) {

        var indexFirstOperand = index
        var indexNextOperand = index + 1
        var indexNextOperator = index

        if (operators[indexNextOperator] == null) {
            for (var indexNext = indexNextOperator + 1; indexNext < operators.length; indexNext++) {
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
            for (var indexNext = indexNextOperand + 1; indexNext < operands.length; indexNext++) {
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
    for (var index = indexStart; index < indexEnd; index++) {

        var indexFirstOperand = index
        var indexNextOperand = index + 1
        var indexNextOperator = index

        if (operators[indexNextOperator] == null) {
            for (var indexNext = indexNextOperator + 1; indexNext < operators.length; indexNext++) {
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
            for (var indexNext = indexNextOperand + 1; indexNext < operands.length; indexNext++) {
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
            finalResult = result
            result = 0

            console.log(operands)
            console.log(operators)
        }
    }

    // Returning FINAL RESULT
    return finalResult
}