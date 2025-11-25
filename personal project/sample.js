<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>20 JavaScript Projects for Beginners</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f5f5f5;
        }
        h1 {
            color: #333;
            text-align: center;
            margin-bottom: 30px;
        }
        .project {
            background-color: white;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 30px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        .project h2 {
            color: #2c3e50;
            border-bottom: 2px solid #eee;
            padding-bottom: 10px;
        }
        .code-block {
            background-color: #f8f8f8;
            border-left: 4px solid #3498db;
            padding: 15px;
            margin: 15px 0;
            overflow-x: auto;
            font-family: 'Courier New', monospace;
        }
        .result {
            background-color: #e8f4fd;
            padding: 15px;
            border-radius: 5px;
            margin-top: 15px;
        }
        button {
            background-color: #3498db;
            color: white;
            border: none;
            padding: 8px 15px;
            border-radius: 4px;
            cursor: pointer;
            margin: 5px;
        }
        button:hover {
            background-color: #2980b9;
        }
        input, select {
            padding: 8px;
            margin: 5px;
            border: 1px solid #ddd;
            border-radius: 4px;
        }
        .todo-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px;
            border-bottom: 1px solid #eee;
        }
        .completed {
            text-decoration: line-through;
            color: #888;
        }
        .game-board {
            display: grid;
            grid-template-columns: repeat(3, 100px);
            grid-gap: 5px;
            margin: 20px 0;
        }
        .cell {
            width: 100px;
            height: 100px;
            background-color: #f0f0f0;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2em;
            cursor: pointer;
            border: 1px solid #ccc;
        }
        .quiz-option {
            padding: 10px;
            margin: 5px;
            background-color: #f0f0f0;
            cursor: pointer;
            border-radius: 4px;
        }
        .quiz-option:hover {
            background-color: #e0e0e0;
        }
    </style>
</head>
<body>
    <h1>20 JavaScript Projects for Beginners</h1>

    <!-- Project 1: Calculator -->
    <div class="project">
        <h2>1. Simple Calculator</h2>
        <p>A basic calculator that performs arithmetic operations.</p>
        <div class="code-block">
            function add(a, b) { return a + b; }<br>
            function subtract(a, b) { return a - b; }<br>
            function multiply(a, b) { return a * b; }<br>
            function divide(a, b) { return b !== 0 ? a / b : 'Error'; }<br>
            function calculate(operation, a, b) {<br>
            &nbsp;&nbsp;return operation(a, b);<br>
            }
        </div>
        <input type="number" id="num1" placeholder="First number" value="10">
        <input type="number" id="num2" placeholder="Second number" value="5">
        <button onclick="runCalculator('add')">Add</button>
        <button onclick="runCalculator('subtract')">Subtract</button>
        <button onclick="runCalculator('multiply')">Multiply</button>
        <button onclick="runCalculator('divide')">Divide</button>
        <div id="result1" class="result"></div>
    </div>

    <!-- Project 2: To-Do List -->
    <div class="project">
        <h2>2. To-Do List</h2>
        <p>Add, remove, and mark tasks as completed.</p>
        <div class="code-block">
            let todos = [];<br>
            function addTodo(task) {<br>
            &nbsp;&nbsp;todos.push({ task, completed: false });<br>
            &nbsp;&nbsp;renderTodos();<br>
            }<br>
            function removeTodo(index) {<br>
            &nbsp;&nbsp;todos.splice(index, 1);<br>
            &nbsp;&nbsp;renderTodos();<br>
            }<br>
            function toggleTodo(index) {<br>
            &nbsp;&nbsp;todos[index].completed = !todos[index].completed;<br>
            &nbsp;&nbsp;renderTodos();<br>
            }
        </div>
        <input type="text" id="todoInput" placeholder="Enter a task">
        <button onclick="addTodoFromInput()">Add Task</button>
        <div id="todoList" class="result"></div>
    </div>

    <!-- Project 3: Countdown Timer -->
    <div class="project">
        <h2>3. Countdown Timer</h2>
        <p>A timer that counts down from a specified time.</p>
        <div class="code-block">
            let countdownInterval;<br>
            function startCountdown(seconds) {<br>
            &nbsp;&nbsp;clearInterval(countdownInterval);<br>
            &nbsp;&nbsp;let remaining = seconds;<br>
            &nbsp;&nbsp;countdownInterval = setInterval(() => {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;if (remaining <= 0) clearInterval(countdownInterval);<br>
            &nbsp;&nbsp;&nbsp;&nbsp;else remaining--;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;updateDisplay(remaining);<br>
            &nbsp;&nbsp;}, 1000);<br>
            }
        </div>
        <input type="number" id="countdownTime" placeholder="Seconds" value="10">
        <button onclick="startCountdownFromInput()">Start Countdown</button>
        <button onclick="stopCountdown()">Stop</button>
        <div id="countdownDisplay" class="result">00:00</div>
    </div>

    <!-- Project 4: Random Quote Generator -->
    <div class="project">
        <h2>4. Random Quote Generator</h2>
        <p>Display a random quote each time you click the button.</p>
        <div class="code-block">
            const quotes = [<br>
            &nbsp;&nbsp;"The only way to do great work is to love what you do. - Steve Jobs",<br>
            &nbsp;&nbsp;"Innovation distinguishes between a leader and a follower. - Steve Jobs",<br>
            &nbsp;&nbsp;"Your time is limited, don't waste it living someone else's life. - Steve Jobs"<br>
            ];<br>
            function getRandomQuote() {<br>
            &nbsp;&nbsp;const randomIndex = Math.floor(Math.random() * quotes.length);<br>
            &nbsp;&nbsp;return quotes[randomIndex];<br>
            }
        </div>
        <button onclick="displayRandomQuote()">Get Random Quote</button>
        <div id="quoteDisplay" class="result"></div>
    </div>

    <!-- Project 5: Password Generator -->
    <div class="project">
        <h2>5. Password Generator</h2>
        <p>Generate a random password with specified length.</p>
        <div class="code-block">
            function generatePassword(length) {<br>
            &nbsp;&nbsp;const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";<br>
            &nbsp;&nbsp;let password = "";<br>
            &nbsp;&nbsp;for (let i = 0; i < length; i++) {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;password += chars.charAt(Math.floor(Math.random() * chars.length));<br>
            &nbsp;&nbsp;}<br>
            &nbsp;&nbsp;return password;<br>
            }
        </div>
        <input type="number" id="passwordLength" placeholder="Password length" value="12" min="6" max="20">
        <button onclick="generatePasswordFromInput()">Generate Password</button>
        <div id="passwordDisplay" class="result"></div>
    </div>

    <!-- Project 6: BMI Calculator -->
    <div class="project">
        <h2>6. BMI Calculator</h2>
        <p>Calculate Body Mass Index based on weight and height.</p>
        <div class="code-block">
            function calculateBMI(weight, height) {<br>
            &nbsp;&nbsp;const bmi = weight / (height * height);<br>
            &nbsp;&nbsp;let category = "";<br>
            &nbsp;&nbsp;if (bmi < 18.5) category = "Underweight";<br>
            &nbsp;&nbsp;else if (bmi < 25) category = "Normal weight";<br>
            &nbsp;&nbsp;else if (bmi < 30) category = "Overweight";<br>
            &nbsp;&nbsp;else category = "Obese";<br>
            &nbsp;&nbsp;return { bmi: bmi.toFixed(2), category };<br>
            }
        </div>
        <input type="number" id="weight" placeholder="Weight (kg)" value="70">
        <input type="number" id="height" placeholder="Height (m)" value="1.75" step="0.01">
        <button onclick="calculateBMIFromInput()">Calculate BMI</button>
        <div id="bmiResult" class="result"></div>
    </div>

    <!-- Project 7: Currency Converter -->
    <div class="project">
        <h2>7. Currency Converter</h2>
        <p>Convert between different currencies (using mock exchange rates).</p>
        <div class="code-block">
            const exchangeRates = {<br>
            &nbsp;&nbsp;USD: { EUR: 0.85, GBP: 0.73, JPY: 110.15 },<br>
            &nbsp;&nbsp;EUR: { USD: 1.18, GBP: 0.86, JPY: 129.55 },<br>
            &nbsp;&nbsp;GBP: { USD: 1.37, EUR: 1.16, JPY: 150.89 },<br>
            &nbsp;&nbsp;JPY: { USD: 0.0091, EUR: 0.0077, GBP: 0.0066 }<br>
            };<br>
            function convertCurrency(amount, from, to) {<br>
            &nbsp;&nbsp;if (from === to) return amount;<br>
            &nbsp;&nbsp;return (amount * exchangeRates[from][to]).toFixed(2);<br>
            }
        </div>
        <input type="number" id="amount" placeholder="Amount" value="100">
        <select id="fromCurrency">
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="JPY">JPY</option>
        </select>
        <select id="toCurrency">
            <option value="EUR">EUR</option>
            <option value="USD">USD</option>
            <option value="GBP">GBP</option>
            <option value="JPY">JPY</option>
        </select>
        <button onclick="convertCurrencyFromInput()">Convert</button>
        <div id="conversionResult" class="result"></div>
    </div>

    <!-- Project 8: Dice Roller -->
    <div class="project">
        <h2>8. Dice Roller</h2>
        <p>Roll one or multiple dice and display the results.</p>
        <div class="code-block">
            function rollDice(sides = 6) {<br>
            &nbsp;&nbsp;return Math.floor(Math.random() * sides) + 1;<br>
            }<br>
            function rollMultipleDice(count, sides = 6) {<br>
            &nbsp;&nbsp;const results = [];<br>
            &nbsp;&nbsp;for (let i = 0; i < count; i++) {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;results.push(rollDice(sides));<br>
            &nbsp;&nbsp;}<br>
            &nbsp;&nbsp;return results;<br>
            }
        </div>
        <input type="number" id="diceCount" placeholder="Number of dice" value="2" min="1" max="10">
        <select id="diceSides">
            <option value="4">4-sided</option>
            <option value="6" selected>6-sided</option>
            <option value="8">8-sided</option>
            <option value="10">10-sided</option>
            <option value="12">12-sided</option>
            <option value="20">20-sided</option>
        </select>
        <button onclick="rollDiceFromInput()">Roll Dice</button>
        <div id="diceResult" class="result"></div>
    </div>

    <!-- Project 9: Number Guessing Game -->
    <div class="project">
        <h2>9. Number Guessing Game</h2>
        <p>Try to guess a random number between 1 and 100.</p>
        <div class="code-block">
            let targetNumber;<br>
            let attempts;<br>
            function startGame() {<br>
            &nbsp;&nbsp;targetNumber = Math.floor(Math.random() * 100) + 1;<br>
            &nbsp;&nbsp;attempts = 0;<br>
            &nbsp;&nbsp;return "Game started! Guess a number between 1 and 100.";<br>
            }<br>
            function checkGuess(guess) {<br>
            &nbsp;&nbsp;attempts++;<br>
            &nbsp;&nbsp;if (guess === targetNumber) {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;return `Correct! You guessed it in ${attempts} attempts.`;<br>
            &nbsp;&nbsp;} else if (guess < targetNumber) {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;return "Too low! Try again.";<br>
            &nbsp;&nbsp;} else {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;return "Too high! Try again.";<br>
            &nbsp;&nbsp;}<br>
            }
        </div>
        <button onclick="startGuessingGame()">Start New Game</button>
        <input type="number" id="guessInput" placeholder="Enter your guess" min="1" max="100">
        <button onclick="checkGuessFromInput()">Check Guess</button>
        <div id="gameResult" class="result"></div>
    </div>

    <!-- Project 10: Palindrome Checker -->
    <div class="project">
        <h2>10. Palindrome Checker</h2>
        <p>Check if a word or phrase is a palindrome (reads the same forward and backward).</p>
        <div class="code-block">
            function isPalindrome(str) {<br>
            &nbsp;&nbsp;const cleanStr = str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();<br>
            &nbsp;&nbsp;const reversedStr = cleanStr.split('').reverse().join('');<br>
            &nbsp;&nbsp;return cleanStr === reversedStr;<br>
            }
        </div>
        <input type="text" id="palindromeInput" placeholder="Enter text to check">
        <button onclick="checkPalindrome()">Check</button>
        <div id="palindromeResult" class="result"></div>
    </div>

    <!-- Project 11: Tip Calculator -->
    <div class="project">
        <h2>11. Tip Calculator</h2>
        <p>Calculate the tip amount and total bill based on service quality.</p>
        <div class="code-block">
            function calculateTip(billAmount, serviceQuality) {<br>
            &nbsp;&nbsp;const tipPercentages = {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;excellent: 0.20,<br>
            &nbsp;&nbsp;&nbsp;&nbsp;good: 0.15,<br>
            &nbsp;&nbsp;&nbsp;&nbsp;average: 0.10,<br>
            &nbsp;&nbsp;&nbsp;&nbsp;poor: 0.05<br>
            &nbsp;&nbsp;};<br>
            &nbsp;&nbsp;const tip = billAmount * tipPercentages[serviceQuality];<br>
            &nbsp;&nbsp;return {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;tip: tip.toFixed(2),<br>
            &nbsp;&nbsp;&nbsp;&nbsp;total: (billAmount + tip).toFixed(2)<br>
            &nbsp;&nbsp;};<br>
            }
        </div>
        <input type="number" id="billAmount" placeholder="Bill amount" value="50">
        <select id="serviceQuality">
            <option value="excellent">Excellent (20%)</option>
            <option value="good">Good (15%)</option>
            <option value="average" selected>Average (10%)</option>
            <option value="poor">Poor (5%)</option>
        </select>
        <button onclick="calculateTipFromInput()">Calculate Tip</button>
        <div id="tipResult" class="result"></div>
    </div>

    <!-- Project 12: Random Color Generator -->
    <div class="project">
        <h2>12. Random Color Generator</h2>
        <p>Generate random colors in HEX format.</p>
        <div class="code-block">
            function generateRandomColor() {<br>
            &nbsp;&nbsp;const hexChars = "0123456789ABCDEF";<br>
            &nbsp;&nbsp;let color = "#";<br>
            &nbsp;&nbsp;for (let i = 0; i < 6; i++) {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;color += hexChars[Math.floor(Math.random() * 16)];<br>
            &nbsp;&nbsp;}<br>
            &nbsp;&nbsp;return color;<br>
            }
        </div>
        <button onclick="generateRandomColorAndDisplay()">Generate Random Color</button>
        <div id="colorDisplay" class="result" style="height: 100px; display: flex; align-items: center; justify-content: center;"></div>
    </div>

    <!-- Project 13: Word Counter -->
    <div class="project">
        <h2>13. Word Counter</h2>
        <p>Count the number of words and characters in a text.</p>
        <div class="code-block">
            function countWords(text) {<br>
            &nbsp;&nbsp;const words = text.trim().split(/\s+/).filter(word => word.length > 0);<br>
            &nbsp;&nbsp;return words.length;<br>
            }<br>
            function countCharacters(text) {<br>
            &nbsp;&nbsp;return text.length;<br>
            }
        </div>
        <textarea id="textInput" placeholder="Enter your text here" rows="4" style="width: 100%;"></textarea>
        <button onclick="countTextStats()">Count Words & Characters</button>
        <div id="textStats" class="result"></div>
    </div>

    <!-- Project 14: Temperature Converter -->
    <div class="project">
        <h2>14. Temperature Converter</h2>
        <p>Convert between Celsius, Fahrenheit, and Kelvin.</p>
        <div class="code-block">
            function celsiusToFahrenheit(celsius) {<br>
            &nbsp;&nbsp;return (celsius * 9/5) + 32;<br>
            }<br>
            function fahrenheitToCelsius(fahrenheit) {<br>
            &nbsp;&nbsp;return (fahrenheit - 32) * 5/9;<br>
            }<br>
            function celsiusToKelvin(celsius) {<br>
            &nbsp;&nbsp;return celsius + 273.15;<br>
            }<br>
            function kelvinToCelsius(kelvin) {<br>
            &nbsp;&nbsp;return kelvin - 273.15;<br>
            }
        </div>
        <input type="number" id="tempInput" placeholder="Temperature" value="0">
        <select id="tempFrom">
            <option value="celsius">Celsius</option>
            <option value="fahrenheit">Fahrenheit</option>
            <option value="kelvin">Kelvin</option>
        </select>
        <select id="tempTo">
            <option value="fahrenheit">Fahrenheit</option>
            <option value="celsius">Celsius</option>
            <option value="kelvin">Kelvin</option>
        </select>
        <button onclick="convertTemperature()">Convert</button>
        <div id="tempResult" class="result"></div>
    </div>

    <!-- Project 15: Simple Quiz -->
    <div class="project">
        <h2>15. Simple Quiz</h2>
        <p>A multiple-choice quiz with score tracking.</p>
        <div class="code-block">
            const quizQuestions = [<br>
            &nbsp;&nbsp;{<br>
            &nbsp;&nbsp;&nbsp;&nbsp;question: "What is the capital of France?",<br>
            &nbsp;&nbsp;&nbsp;&nbsp;options: ["London", "Berlin", "Paris", "Madrid"],<br>
            &nbsp;&nbsp;&nbsp;&nbsp;answer: 2<br>
            &nbsp;&nbsp;},<br>
            &nbsp;&nbsp;{<br>
            &nbsp;&nbsp;&nbsp;&nbsp;question: "Which language runs in web browsers?",<br>
            &nbsp;&nbsp;&nbsp;&nbsp;options: ["Java", "C", "Python", "JavaScript"],<br>
            &nbsp;&nbsp;&nbsp;&nbsp;answer: 3<br>
            &nbsp;&nbsp;}<br>
            ];<br>
            let currentQuestion = 0;<br>
            let score = 0;<br>
            function loadQuestion() {<br>
            &nbsp;&nbsp;// Implementation to display question and options<br>
            }<br>
            function checkAnswer(selectedIndex) {<br>
            &nbsp;&nbsp;// Implementation to check if answer is correct<br>
            }
        </div>
        <button onclick="startQuiz()">Start Quiz</button>
        <div id="quizContainer" class="result"></div>
    </div>

    <!-- Project 16: Digital Clock -->
    <div class="project">
        <h2>16. Digital Clock</h2>
        <p>A clock that displays the current time and updates every second.</p>
        <div class="code-block">
            function updateClock() {<br>
            &nbsp;&nbsp;const now = new Date();<br>
            &nbsp;&nbsp;const hours = String(now.getHours()).padStart(2, '0');<br>
            &nbsp;&nbsp;const minutes = String(now.getMinutes()).padStart(2, '0');<br>
            &nbsp;&nbsp;const seconds = String(now.getSeconds()).padStart(2, '0');<br>
            &nbsp;&nbsp;return `${hours}:${minutes}:${seconds}`;<br>
            }<br>
            function startClock() {<br>
            &nbsp;&nbsp;setInterval(() => {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;document.getElementById('clockDisplay').textContent = updateClock();<br>
            &nbsp;&nbsp;}, 1000);<br>
            }
        </div>
        <button onclick="startClock()">Start Clock</button>
        <div id="clockDisplay" class="result" style="font-size: 2em; text-align: center;"></div>
    </div>

    <!-- Project 17: Simple Drawing App -->
    <div class="project">
        <h2>17. Simple Drawing App</h2>
        <p>A basic canvas where you can draw with your mouse.</p>
        <div class="code-block">
            let isDrawing = false;<br>
            function startDrawing(e) {<br>
            &nbsp;&nbsp;isDrawing = true;<br>
            &nbsp;&nbsp;draw(e);<br>
            }<br>
            function stopDrawing() {<br>
            &nbsp;&nbsp;isDrawing = false;<br>
            &nbsp;&nbsp;ctx.beginPath();<br>
            }<br>
            function draw(e) {<br>
            &nbsp;&nbsp;if (!isDrawing) return;<br>
            &nbsp;&nbsp;// Implementation to draw on canvas<br>
            }
        </div>
        <canvas id="drawingCanvas" width="400" height="300" style="border: 1px solid #ccc; display: block;"></canvas>
        <button onclick="clearCanvas()">Clear Canvas</button>
    </div>

    <!-- Project 18: Age Calculator -->
    <div class="project">
        <h2>18. Age Calculator</h2>
        <p>Calculate age based on birth date.</p>
        <div class="code-block">
            function calculateAge(birthDate) {<br>
            &nbsp;&nbsp;const today = new Date();<br>
            &nbsp;&nbsp;const birth = new Date(birthDate);<br>
            &nbsp;&nbsp;let age = today.getFullYear() - birth.getFullYear();<br>
            &nbsp;&nbsp;const monthDiff = today.getMonth() - birth.getMonth();<br>
            &nbsp;&nbsp;if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;age--;<br>
            &nbsp;&nbsp;}<br>
            &nbsp;&nbsp;return age;<br>
            }
        </div>
        <input type="date" id="birthDate">
        <button onclick="calculateAgeFromInput()">Calculate Age</button>
        <div id="ageResult" class="result"></div>
    </div>

    <!-- Project 19: Simple Timer -->
    <div class="project">
        <h2>19. Simple Timer</h2>
        <p>A timer that counts up from zero.</p>
        <div class="code-block">
            let timerInterval;<br>
            let seconds = 0;<br>
            function startTimer() {<br>
            &nbsp;&nbsp;clearInterval(timerInterval);<br>
            &nbsp;&nbsp;seconds = 0;<br>
            &nbsp;&nbsp;timerInterval = setInterval(() => {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;seconds++;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;updateTimerDisplay();<br>
            &nbsp;&nbsp;}, 1000);<br>
            }<br>
            function stopTimer() {<br>
            &nbsp;&nbsp;clearInterval(timerInterval);<br>
            }<br>
            function resetTimer() {<br>
            &nbsp;&nbsp;seconds = 0;<br>
            &nbsp;&nbsp;updateTimerDisplay();<br>
            }
        </div>
        <button onclick="startTimer()">Start</button>
        <button onclick="stopTimer()">Stop</button>
        <button onclick="resetTimer()">Reset</button>
        <div id="timerDisplay" class="result" style="font-size: 2em; text-align: center;">00:00:00</div>
    </div>

    <!-- Project 20: Tic-Tac-Toe Game -->
    <div class="project">
        <h2>20. Tic-Tac-Toe Game</h2>
        <p>A simple two-player Tic-Tac-Toe game.</p>
        <div class="code-block">
            let currentPlayer = 'X';<br>
            let board = ['', '', '', '', '', '', '', '', ''];<br>
            function makeMove(index) {<br>
            &nbsp;&nbsp;if (board[index] === '' && !checkWinner()) {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;board[index] = currentPlayer;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;currentPlayer = currentPlayer === 'X' ? 'O' : 'X';<br>
            &nbsp;&nbsp;&nbsp;&nbsp;renderBoard();<br>
            &nbsp;&nbsp;&nbsp;&nbsp;checkWinner();<br>
            &nbsp;&nbsp;}<br>
            }<br>
            function checkWinner() {<br>
            &nbsp;&nbsp;// Implementation to check for a winner<br>
            }<br>
            function resetGame() {<br>
            &nbsp;&nbsp;board = ['', '', '', '', '', '', '', '', ''];<br>
            &nbsp;&nbsp;currentPlayer = 'X';<br>
            &nbsp;&nbsp;renderBoard();<br>
            }
        </div>
        <div class="game-board" id="gameBoard"></div>
        <button onclick="resetTicTacToe()">Reset Game</button>
        <div id="gameStatus" class="result"></div>
    </div>

    <script>
        // Project 1: Calculator
        function add(a, b) { return a + b; }
        function subtract(a, b) { return a - b; }
        function multiply(a, b) { return a * b; }
        function divide(a, b) { return b !== 0 ? a / b : 'Error: Division by zero'; }
        
        function calculate(operation, a, b) {
            return operation(a, b);
        }
        
        function runCalculator(operation) {
            const num1 = parseFloat(document.getElementById('num1').value);
            const num2 = parseFloat(document.getElementById('num2').value);
            let result;
            
            switch(operation) {
                case 'add': result = calculate(add, num1, num2); break;
                case 'subtract': result = calculate(subtract, num1, num2); break;
                case 'multiply': result = calculate(multiply, num1, num2); break;
                case 'divide': result = calculate(divide, num1, num2); break;
            }
            
            document.getElementById('result1').textContent = `Result: ${result}`;
        }

        // Project 2: To-Do List
        let todos = [];
        
        function addTodo(task) {
            if (task.trim() !== '') {
                todos.push({ task: task, completed: false });
                renderTodos();
            }
        }
        
        function removeTodo(index) {
            todos.splice(index, 1);
            renderTodos();
        }
        
        function toggleTodo(index) {
            todos[index].completed = !todos[index].completed;
            renderTodos();
        }
        
        function renderTodos() {
            const todoList = document.getElementById('todoList');
            todoList.innerHTML = '';
            
            if (todos.length === 0) {
                todoList.innerHTML = '<p>No tasks yet. Add a task above!</p>';
                return;
            }
            
            todos.forEach((todo, index) => {
                const todoItem = document.createElement('div');
                todoItem.className = `todo-item ${todo.completed ? 'completed' : ''}`;
                todoItem.innerHTML = `
                    <span>${todo.task}</span>
                    <div>
                        <button onclick="toggleTodo(${index})">${todo.completed ? 'Undo' : 'Complete'}</button>
                        <button onclick="removeTodo(${index})">Delete</button>
                    </div>
                `;
                todoList.appendChild(todoItem);
            });
        }
        
        function addTodoFromInput() {
            const input = document.getElementById('todoInput');
            addTodo(input.value);
            input.value = '';
        }

        // Project 3: Countdown Timer
        let countdownInterval;
        
        function startCountdown(seconds) {
            clearInterval(countdownInterval);
            let remaining = seconds;
            
            updateDisplay(remaining);
            
            countdownInterval = setInterval(() => {
                remaining--;
                updateDisplay(remaining);
                
                if (remaining <= 0) {
                    clearInterval(countdownInterval);
                    document.getElementById('countdownDisplay').textContent = "Time's up!";
                }
            }, 1000);
        }
        
        function updateDisplay(seconds) {
            const minutes = Math.floor(seconds / 60);
            const secs = seconds % 60;
            document.getElementById('countdownDisplay').textContent = 
                `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
        }
        
        function stopCountdown() {
            clearInterval(countdownInterval);
        }
        
        function startCountdownFromInput() {
            const seconds = parseInt(document.getElementById('countdownTime').value);
            startCountdown(seconds);
        }

        // Project 4: Random Quote Generator
        const quotes = [
            "The only way to do great work is to love what you do. - Steve Jobs",
            "Innovation distinguishes between a leader and a follower. - Steve Jobs",
            "Your time is limited, don't waste it living someone else's life. - Steve Jobs",
            "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
            "It does not matter how slowly you go as long as you do not stop. - Confucius",
            "Everything you've ever wanted is on the other side of fear. - George Addair",
            "Success is not final, failure is not fatal: it is the courage to continue that counts. - Winston Churchill"
        ];
        
        function getRandomQuote() {
            const randomIndex = Math.floor(Math.random() * quotes.length);
            return quotes[randomIndex];
        }
        
        function displayRandomQuote() {
            document.getElementById('quoteDisplay').textContent = getRandomQuote();
        }

        // Project 5: Password Generator
        function generatePassword(length) {
            const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
            let password = "";
            for (let i = 0; i < length; i++) {
                password += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            return password;
        }
        
        function generatePasswordFromInput() {
            const length = parseInt(document.getElementById('passwordLength').value);
            document.getElementById('passwordDisplay').textContent = generatePassword(length);
        }

        // Project 6: BMI Calculator
        function calculateBMI(weight, height) {
            const bmi = weight / (height * height);
            let category = "";
            if (bmi < 18.5) category = "Underweight";
            else if (bmi < 25) category = "Normal weight";
            else if (bmi < 30) category = "Overweight";
            else category = "Obese";
            return { bmi: bmi.toFixed(2), category };
        }
        
        function calculateBMIFromInput() {
            const weight = parseFloat(document.getElementById('weight').value);
            const height = parseFloat(document.getElementById('height').value);
            const result = calculateBMI(weight, height);
            document.getElementById('bmiResult').innerHTML = 
                `BMI: ${result.bmi}<br>Category: ${result.category}`;
        }

        // Project 7: Currency Converter
        const exchangeRates = {
            USD: { EUR: 0.85, GBP: 0.73, JPY: 110.15 },
            EUR: { USD: 1.18, GBP: 0.86, JPY: 129.55 },
            GBP: { USD: 1.37, EUR: 1.16, JPY: 150.89 },
            JPY: { USD: 0.0091, EUR: 0.0077, GBP: 0.0066 }
        };
        
        function convertCurrency(amount, from, to) {
            if (from === to) return amount;
            return (amount * exchangeRates[from][to]).toFixed(2);
        }
        
        function convertCurrencyFromInput() {
            const amount = parseFloat(document.getElementById('amount').value);
            const from = document.getElementById('fromCurrency').value;
            const to = document.getElementById('toCurrency').value;
            const result = convertCurrency(amount, from, to);
            document.getElementById('conversionResult').textContent = 
                `${amount} ${from} = ${result} ${to}`;
        }

        // Project 8: Dice Roller
        function rollDice(sides = 6) {
            return Math.floor(Math.random() * sides) + 1;
        }
        
        function rollMultipleDice(count, sides = 6) {
            const results = [];
            for (let i = 0; i < count; i++) {
                results.push(rollDice(sides));
            }
            return results;
        }
        
        function rollDiceFromInput() {
            const count = parseInt(document.getElementById('diceCount').value);
            const sides = parseInt(document.getElementById('diceSides').value);
            const results = rollMultipleDice(count, sides);
            const sum = results.reduce((a, b) => a + b, 0);
            document.getElementById('diceResult').innerHTML = 
                `Results: ${results.join(', ')}<br>Total: ${sum}`;
        }

        // Project 9: Number Guessing Game
        let targetNumber;
        let attempts;
        
        function startGuessingGame() {
            targetNumber = Math.floor(Math.random() * 100) + 1;
            attempts = 0;
            document.getElementById('gameResult').textContent = 
                "Game started! Guess a number between 1 and 100.";
            document.getElementById('guessInput').value = '';
        }
        
        function checkGuess(guess) {
            attempts++;
            if (guess === targetNumber) {
                return `Correct! You guessed it in ${attempts} attempts.`;
            } else if (guess < targetNumber) {
                return "Too low! Try again.";
            } else {
                return "Too high! Try again.";
            }
        }
        
        function checkGuessFromInput() {
            const guess = parseInt(document.getElementById('guessInput').value);
            if (isNaN(guess) || guess < 1 || guess > 100) {
                document.getElementById('gameResult').textContent = 
                    "Please enter a valid number between 1 and 100.";
                return;
            }
            
            const result = checkGuess(guess);
            document.getElementById('gameResult').textContent = result;
            
            if (result.includes("Correct")) {
                document.getElementById('guessInput').value = '';
            }
        }

        // Project 10: Palindrome Checker
        function isPalindrome(str) {
            const cleanStr = str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
            const reversedStr = cleanStr.split('').reverse().join('');
            return cleanStr === reversedStr;
        }
        
        function checkPalindrome() {
            const input = document.getElementById('palindromeInput').value;
            const result = isPalindrome(input);
            document.getElementById('palindromeResult').textContent = 
                `"${input}" is ${result ? '' : 'not '}a palindrome.`;
        }

        // Project 11: Tip Calculator
        function calculateTip(billAmount, serviceQuality) {
            const tipPercentages = {
                excellent: 0.20,
                good: 0.15,
                average: 0.10,
                poor: 0.05
            };
            const tip = billAmount * tipPercentages[serviceQuality];
            return {
                tip: tip.toFixed(2),
                total: (billAmount + tip).toFixed(2)
            };
        }
        
        function calculateTipFromInput() {
            const billAmount = parseFloat(document.getElementById('billAmount').value);
            const serviceQuality = document.getElementById('serviceQuality').value;
            const result = calculateTip(billAmount, serviceQuality);
            document.getElementById('tipResult').innerHTML = 
                `Tip: $${result.tip}<br>Total: $${result.total}`;
        }

        // Project 12: Random Color Generator
        function generateRandomColor() {
            const hexChars = "0123456789ABCDEF";
            let color = "#";
            for (let i = 0; i < 6; i++) {
                color += hexChars[Math.floor(Math.random() * 16)];
            }
            return color;
        }
        
        function generateRandomColorAndDisplay() {
            const color = generateRandomColor();
            const display = document.getElementById('colorDisplay');
            display.textContent = color;
            display.style.backgroundColor = color;
            display.style.color = getContrastColor(color);
        }
        
        function getContrastColor(hexColor) {
            // Convert hex to RGB
            const r = parseInt(hexColor.substr(1, 2), 16);
            const g = parseInt(hexColor.substr(3, 2), 16);
            const b = parseInt(hexColor.substr(5, 2), 16);
            
            // Calculate luminance
            const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
            
            // Return black or white based on luminance
            return luminance > 0.5 ? '#000000' : '#FFFFFF';
        }

        // Project 13: Word Counter
        function countWords(text) {
            const words = text.trim().split(/\s+/).filter(word => word.length > 0);
            return words.length;
        }
        
        function countCharacters(text) {
            return text