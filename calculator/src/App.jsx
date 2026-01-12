import { useState } from 'react';
import './App.css';

function App() {
  const [display, setDisplay] = useState('0');
  const [operation, setOperation] = useState('');
  const [previousValue, setPreviousValue] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [isScientific, setIsScientific] = useState(false);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

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

  const addToHistory = (op, res) => {
    setHistory(prev => [{ op, res }, ...prev].slice(0, 10));
  };

  const performOperation = (nextOperation) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      let newValue = currentValue;

      switch (operation) {
        case '+': newValue = currentValue + inputValue; break;
        case '-': newValue = currentValue - inputValue; break;
        case '×': newValue = currentValue * inputValue; break;
        case '÷': newValue = inputValue !== 0 ? currentValue / inputValue : 0; break;
        case '%': newValue = currentValue % inputValue; break;
        default: break;
      }

      const opString = `${currentValue} ${operation} ${inputValue} =`;
      addToHistory(opString, newValue);
      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const performSciFunc = (func) => {
    const value = parseFloat(display);
    let result = 0;
    let opStr = ``;

    switch (func) {
      case 'sin': result = Math.sin(value); opStr = `sin(${value})`; break;
      case 'cos': result = Math.cos(value); opStr = `cos(${value})`; break;
      case 'tan': result = Math.tan(value); opStr = `tan(${value})`; break;
      case 'log': result = Math.log10(value); opStr = `log(${value})`; break;
      case 'ln': result = Math.log(value); opStr = `ln(${value})`; break;
      case '√': result = Math.sqrt(value); opStr = `√(${value})`; break;
      case 'x²': result = Math.pow(value, 2); opStr = `${value}²`; break;
      case 'π': result = Math.PI; opStr = `π`; break;
      default: return;
    }

    addToHistory(opStr, result);
    setDisplay(String(Number(result.toFixed(8))));
    setWaitingForOperand(true);
  };

  const handleEquals = () => {
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
    <div className={`calculator ${isScientific ? 'scientific' : ''}`}>
      <button className="history-toggle" onClick={() => setShowHistory(!showHistory)}>
        {showHistory ? '✕' : '🕒'}
      </button>

      <div className={`history-panel ${showHistory ? 'open' : ''}`}>
        <h3>Recent Calculations</h3>
        {history.map((item, idx) => (
          <div key={idx} className="history-item">
            <div className="history-op">{item.op}</div>
            <div className="history-res" onClick={() => { setDisplay(String(item.res)); setShowHistory(false); }}>{item.res}</div>
          </div>
        ))}
      </div>

      <div className="calculator-header">
        <h1 className="calculator-title" onClick={() => setIsScientific(!isScientific)} style={{cursor: 'pointer'}}>
          Calculator {isScientific ? 'Pro' : ''}
        </h1>
        <p className="calculator-subtitle">Advanced {isScientific ? 'Scientific' : 'Computing'}</p>
      </div>

      <div className="display">
        <div className="display-operation">{getOperationDisplay()}</div>
        <div className="display-result">{display}</div>
      </div>

      <div className="button-grid">
        {isScientific && (
          <>
            <button className="calc-button sci-btn" onClick={() => performSciFunc('sin')}><span>sin</span></button>
            <button className="calc-button sci-btn" onClick={() => performSciFunc('cos')}><span>cos</span></button>
            <button className="calc-button sci-btn" onClick={() => performSciFunc('tan')}><span>tan</span></button>
            <button className="calc-button sci-btn" onClick={() => performSciFunc('log')}><span>log</span></button>
            <button className="calc-button sci-btn" onClick={() => performSciFunc('ln')}><span>ln</span></button>
            <button className="calc-button sci-btn" onClick={() => performSciFunc('√')}><span>√</span></button>
            <button className="calc-button sci-btn" onClick={() => performSciFunc('π')}><span>π</span></button>
            <button className="calc-button sci-btn" onClick={() => performSciFunc('x²')}><span>x²</span></button>
          </>
        )}
        <button className="calc-button clear" onClick={clear}><span>AC</span></button>
        <button className="calc-button" onClick={toggleSign}><span>±</span></button>
        <button className="calc-button" onClick={() => performOperation('%')}><span>%</span></button>
        <button className="calc-button operator" onClick={() => performOperation('÷')}><span>÷</span></button>

        <button className="calc-button" onClick={() => inputDigit(7)}><span>7</span></button>
        <button className="calc-button" onClick={() => inputDigit(8)}><span>8</span></button>
        <button className="calc-button" onClick={() => inputDigit(9)}><span>9</span></button>
        <button className="calc-button operator" onClick={() => performOperation('×')}><span>×</span></button>

        <button className="calc-button" onClick={() => inputDigit(4)}><span>4</span></button>
        <button className="calc-button" onClick={() => inputDigit(5)}><span>5</span></button>
        <button className="calc-button" onClick={() => inputDigit(6)}><span>6</span></button>
        <button className="calc-button operator" onClick={() => performOperation('-')}><span>−</span></button>

        <button className="calc-button" onClick={() => inputDigit(1)}><span>1</span></button>
        <button className="calc-button" onClick={() => inputDigit(2)}><span>2</span></button>
        <button className="calc-button" onClick={() => inputDigit(3)}><span>3</span></button>
        <button className="calc-button operator" onClick={() => performOperation('+')}><span>+</span></button>

        <button className="calc-button zero" onClick={() => inputDigit(0)}><span>0</span></button>
        <button className="calc-button" onClick={inputDecimal}><span>.</span></button>
        <button className="calc-button equals" onClick={handleEquals}><span>=</span></button>
      </div>
    </div>
  );
}

export default App;
