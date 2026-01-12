import { useState } from 'react';

const Calculator = () => {
    const [num1, setNum1] = useState('');
    const [num2, setNum2] = useState('');
    const [operator, setOperator] = useState('+');
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');

    const handleNum1 = (e) => setNum1(e.target.value);
    const handleNum2 = (e) => setNum2(e.target.value);
    const handleOperator = (e) => setOperator(e.target.value);

    const calculate = () => {
        setError('');
        setResult(null);

        const n1 = parseFloat(num1);
        const n2 = parseFloat(num2);

        if (isNaN(n1) || isNaN(n2)) {
            setError('Please enter valid numbers');
            return;
        }

        let res = 0;
        switch (operator) {
            case '+':
                res = n1 + n2;
                break;
            case '-':
                res = n1 - n2;
                break;
            case '*':
                res = n1 * n2;
                break;
            case '/':
                if (n2 === 0) {
                    setError('Cannot divide by zero');
                    return;
                }
                res = n1 / n2;
                break;
            default:
                setError('Invalid operation');
                return;
        }
        setResult(res);
    };

    const reset = () => {
        setNum1('');
        setNum2('');
        setOperator('+');
        setResult(null);
        setError('');
    };

    return (
        <div className="calculator-container">
            <h2>Adding Two Numbers</h2>
            <div className="input-group">
                <input 
                    type="number" 
                    value={num1} 
                    onChange={handleNum1} 
                    placeholder="0"
                />
                <input 
                    type="number" 
                    value={num2} 
                    onChange={handleNum2} 
                    placeholder="0"
                />
            </div>
            
            <div className="controls">
                <select value={operator} onChange={handleOperator}>
                    <option value="+">Addition (+)</option>
                    <option value="-">Subtraction (-)</option>
                    <option value="*">Multiplication (*)</option>
                    <option value="/">Division (/)</option>
                </select>
                
                <button className="primary-btn" onClick={calculate}>Add Them!</button>
                <button className="secondary-btn" onClick={reset}>Reset</button>
            </div>

            <div className="result-display">
                {error && <p className="error">{error}</p>}
                {result !== null && <h1>{result}</h1>}
            </div>
        </div>
    );
};

export default Calculator;
