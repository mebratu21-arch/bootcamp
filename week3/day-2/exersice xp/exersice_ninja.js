/************************************************************
 *  UTILITIES
 ************************************************************/

// Generate a random integer between min and max (inclusive)
const getRandomInt = (min = 1, max = 100) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

// Capitalize even and odd indexes of a string
const capitalizeIndexes = str => {
    let even = "", odd = "";
    [...str].forEach((ch, i) => {
        even += i % 2 === 0 ? ch.toUpperCase() : ch;
        odd += i % 2 === 1 ? ch.toUpperCase() : ch;
    });
    return [even, odd];
};

// Check if a string is palindrome
const isPalindrome = str => {
    const clean = str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    return clean === [...clean].reverse().join('');
};

// Find biggest number in array
const biggestNumber = arr =>
    arr.filter(x => typeof x === 'number').reduce((max, n) => n > max ? n : max, -Infinity);

// Get unique elements from array
const uniqueElements = arr => [...new Set(arr)];


/************************************************************
 *  EXERCISES
 ************************************************************/

// Exercise 1 — Random Number & Even Numbers
function runExercise1() {
    const resultDiv = document.getElementById('result1');
    const rand = getRandomInt();
    console.log(`Random number: ${rand}`);
    console.log(`Even numbers from 0 to ${rand}:`);
    for (let i = 0; i <= rand; i += 2) console.log(i);

    resultDiv.innerHTML = `
        <p>Generated random number: ${rand}</p>
        <p>Check console for all even numbers.</p>
    `;
}

// Exercise 2 — Capitalized letters at even/odd positions
function runExercise2() {
    const resultDiv = document.getElementById('result2');
    const input = "abcdef";
    const [evenCaps, oddCaps] = capitalizeIndexes(input);

    resultDiv.innerHTML = `
        <p>Input: "${input}"</p>
        <p>Even indexes capitalized: "${evenCaps}"</p>
        <p>Odd indexes capitalized: "${oddCaps}"</p>
    `;
}

// Exercise 3 — Palindrome check
function runExercise3() {
    const resultDiv = document.getElementById('result3');
    const tests = ["madam", "hello"];

    resultDiv.innerHTML = tests.map(s =>
        `<p>"${s}" is palindrome: ${isPalindrome(s)}</p>`
    ).join('');
}

// Exercise 4 — Biggest number in array
function runExercise4() {
    const resultDiv = document.getElementById('result4');
    const arrays = [
        [-1, 0, 3, 100, 99, 2, 99],
        ['a', 3, 4, 2],
        []
    ];

    resultDiv.innerHTML = arrays.map(a =>
        `<p>Array: [${a.join(', ')}] → Biggest number: ${biggestNumber(a)}</p>`
    ).join('');
}

// Exercise 5 — Unique elements
function runExercise5() {
    const resultDiv = document.getElementById('result5');
    const list = [1, 2, 3, 3, 3, 4, 5];
    const uniqueList = uniqueElements(list);

    resultDiv.innerHTML = `
        <p>Original array: [${list.join(', ')}]</p>
        <p>Unique elements: [${uniqueList.join(', ')}]</p>
    `;
}

// Exercise 6 — Calendar generator
function runExercise6(year = 2012, month = 9) {
    const container = document.getElementById('calendar-container');
    container.innerHTML = '';
    const table = document.createElement('table');

    const weekdays = ['MO','TU','WE','TH','FR','SA','SU'];
    const header = document.createElement('tr');
    weekdays.forEach(day => {
        const th = document.createElement('th');
        th.textContent = day;
        header.appendChild(th);
    });
    table.appendChild(header);

    const firstDay = new Date(year, month-1, 1);
    const lastDay = new Date(year, month, 0);
    const daysInMonth = lastDay.getDate();
    let startDay = firstDay.getDay();
    startDay = startDay === 0 ? 6 : startDay - 1; // Monday=0

    let date = 1;
    for (let i = 0; i < 6; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < 7; j++) {
            const cell = document.createElement('td');
            if (i===0 && j<startDay || date>daysInMonth) cell.textContent = '';
            else { cell.textContent = date; date++; }
            row.appendChild(cell);
        }
        table.appendChild(row);
        if (date > daysInMonth) break;
    }

    container.appendChild(table);
}
