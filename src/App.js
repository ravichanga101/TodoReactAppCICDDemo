import React, { useState } from "react";

const Calculator = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const handleButtonClick = (value) => {
    setInput((prevInput) => prevInput + value);
  };

  const calculate = (expression) => {
    expression = expression.replace(/\s+/g, "");
    const numberRegex = /\d+(\.\d+)?/g;
    const operatorRegex = /[+\-*/]/g;

    const numbers = expression.match(numberRegex).map(Number);
    const operators = expression.match(operatorRegex);

    const priorityOperators = ["*", "/"];
    let result = numbers[0];

    for (let i = 0; i < operators.length; i++) {
      const operator = operators[i];

      if (priorityOperators.includes(operator)) {
        if (operator === "*") {
          result *= numbers[i + 1];
        } else if (operator === "/") {
          result /= numbers[i + 1];
        }
        numbers[i + 1] = null;
      } else {
        result = numbers[i + 1] !== null ? result : numbers[i];
      }
    }

    for (let i = 0; i < operators.length; i++) {
      const operator = operators[i];
      if (operator === "+") {
        result += numbers[i + 1];
      } else if (operator === "-") {
        result -= numbers[i + 1];
      }
    }

    return result;
  };

  const handleCalculate = () => {
    try {
      setResult(calculate(input));
    } catch (error) {
      setResult("Error");
    }
  };

  const handleClear = () => {
    setInput("");
    setResult("");
  };

  return (
    <div className="calculator">
      <h1>Calculator</h1>
      <div className="display">
        <input type="text" value={input} readOnly />
        <div className="showResult">
          <div className="result">{result}</div>
        </div>
      </div>
      <div className="buttons">
        {/* Add buttons for numbers and operators */}
        <button onClick={() => handleButtonClick("1")}>1</button>
        <button onClick={() => handleButtonClick("2")}>2</button>
        <button onClick={() => handleButtonClick("3")}>3</button>
        <button onClick={() => handleButtonClick("+")}>+</button>
        <button onClick={() => handleButtonClick("4")}>4</button>
        <button onClick={() => handleButtonClick("5")}>5</button>
        <button onClick={() => handleButtonClick("6")}>6</button>
        <button onClick={() => handleButtonClick("-")}>-</button>
        <button onClick={() => handleButtonClick("7")}>7</button>
        <button onClick={() => handleButtonClick("8")}>8</button>
        <button onClick={() => handleButtonClick("9")}>9</button>
        <button onClick={() => handleButtonClick("*")}>*</button>
        <button onClick={() => handleButtonClick("0")}>0</button>
        <button onClick={handleClear}>C</button>
        <button onClick={handleCalculate}>=</button>
        <button onClick={() => handleButtonClick("/")}>/</button>
      </div>
    </div>
  );
};

export default Calculator;
