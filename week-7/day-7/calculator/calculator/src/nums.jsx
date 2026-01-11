import { useState } from 'react';

    const nums = () => {    
    const [num1,setNum1] = useState('');
    const [num2,setNum2] = useState('');
    const [operator,setOperator] = useState('');
    const [result, setResult] = useState('');
     
    const handleNum1 = (e) => {
        setNum1(e.target.value);
    }
    const handleNum2 = (e) => {
        setNum2(e.target.value);
    }
    const handleOperator = (e) => {
        setOperator(e.target.value);
    }
    const handleResult = () => {
        setResult(eval(num1 + operator + num2));
        setResult(eval(num1 - operator - num2));
        setResult(eval(num1 * operator * num2));
        
        if(num2 === '0') {
            setResult('Cannot divide by zero');
        } else {
            setResult(eval(num1 / operator / num2));
        }

   const handleReset = () => {
            setNum1('');
            setNum2('');
            setOperator('');
            setResult('');
        }
    
    }
  return (
    <>
     <h1>calculator</h1>
      <input type = "number" value = {num1} onChange = {handleNum1} />
      <input type = "number" value = {num2} onChange = {handleNum2} />
      <select value = {operator} onChange = {handleOperator}>
        <option value = "+">+</option>
        <option value = "-">-</option>
        <option value = "*">*</option>
        <option value = "/">/</option>
      </select>
      <button onClick = {handleResult}>=</button>
      <button onClick = {handleReset}>Reset</button>                
      <p>Result: {result}</p>

    </>
  )
};

export default nums;