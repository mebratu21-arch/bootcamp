import { useState } from 'react';
import './App.css';

function App() {
  const [display, setDisplay] = useState('0');
  const [operation, setOperation] = useState('');
  const [previousValue, setPreviousValue] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputDigit = (digit) => {
    if (waitingForOperand) {
      setDisplay(String(digit));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? String(digit) : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setOperation('');
    setPreviousValue(null);
    setWaitingForOperand(false);
  };

  const performOperation = (nextOperation) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      let newValue = currentValue;

      switch (operation) {
        case '+':
          newValue = currentValue + inputValue;
          break;
        case '-':
          newValue = currentValue - inputValue;
          break;
        case '×':
          newValue = currentValue * inputValue;
          break;
        case '÷':
          newValue = inputValue !== 0 ? currentValue / inputValue : 0;
          break;
        case '%':
          newValue = currentValue % inputValue;
          break;
        default:
          break;
      }

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const handleEquals = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      performOperation(null);
      setOperation('');
    }
  };

  const toggleSign = () => {
    const value = parseFloat(display);
    setDisplay(String(value * -1));
  };

  const getOperationDisplay = () => {
    if (previousValue !== null && operation) {
      return `${previousValue} ${operation}`;
    }
    return '';
  };

  return (
    <div className="calculator">
      <div className="calculator-header">
        <h1 className="calculator-title">Calculator</h1>
        <p className="calculator-subtitle">Advanced Computing</p>
      </div>

      <div className="display">
        <div className="display-operation">{getOperationDisplay()}</div>
        <div className="display-result">{display}</div>
      </div>

      <div className="button-grid">
        <button className="calc-button clear" onClick={clear}>
          <span>AC</span>
        </button>
        <button className="calc-button" onClick={toggleSign}>
          <span>±</span>
        </button>
        <button className="calc-button" onClick={() => performOperation('%')}>
          <span>%</span>
        </button>
        <button className="calc-button operator" onClick={() => performOperation('÷')}>
          <span>÷</span>
        </button>

        <button className="calc-button" onClick={() => inputDigit(7)}>
          <span>7</span>
        </button>
        <button className="calc-button" onClick={() => inputDigit(8)}>
          <span>8</span>
        </button>
        <button className="calc-button" onClick={() => inputDigit(9)}>
          <span>9</span>
        </button>
        <button className="calc-button operator" onClick={() => performOperation('×')}>
          <span>×</span>
        </button>

        <button className="calc-button" onClick={() => inputDigit(4)}>
          <span>4</span>
        </button>
        <button className="calc-button" onClick={() => inputDigit(5)}>
          <span>5</span>
        </button>
        <button className="calc-button" onClick={() => inputDigit(6)}>
          <span>6</span>
        </button>
        <button className="calc-button operator" onClick={() => performOperation('-')}>
          <span>−</span>
        </button>

        <button className="calc-button" onClick={() => inputDigit(1)}>
          <span>1</span>
        </button>
        <button className="calc-button" onClick={() => inputDigit(2)}>
          <span>2</span>
        </button>
        <button className="calc-button" onClick={() => inputDigit(3)}>
          <span>3</span>
        </button>
        <button className="calc-button operator" onClick={() => performOperation('+')}>
          <span>+</span>
        </button>

        <button className="calc-button zero" onClick={() => inputDigit(0)}>
          <span>0</span>
        </button>
        <button className="calc-button" onClick={inputDecimal}>
          <span>.</span>
        </button>
        <button className="calc-button equals" onClick={handleEquals}>
          <span>=</span>
        </button>
      </div>
    </div>
  );
}

export default App;
