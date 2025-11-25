/************************************************************
 *  EXERCISES XP NINJA
 ************************************************************/

/* Exercise 1: Random Number & Even Numbers */
function randomEvenNumbers() {
    const rand = Math.floor(Math.random() * 100) + 1; // 1 to 100
    console.log(`Random number: ${rand}`);
    console.log(`Even numbers from 0 to ${rand}:`);
    for (let i = 0; i <= rand; i += 2) {
        console.log(i);
    }
}
// Test
randomEvenNumbers();


/* Exercise 2: Capitalized letters */
function capitalize(str) {
    let evenCaps = '', oddCaps = '';
    [...str].forEach((ch, i) => {
        evenCaps += i % 2 === 0 ? ch.toUpperCase() : ch;
        oddCaps += i % 2 === 1 ? ch.toUpperCase() : ch;
    });
    return [evenCaps, oddCaps];
}

// Test
console.log(capitalize("abcdef")); // ['AbCdEf', 'aBcDeF']


/* Exercise 3: Is palindrome? */
function isPalindrome(str) {
    const clean = str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    return clean === [...clean].reverse().join('');
}

// Test
console.log(isPalindrome("madam")); // true
console.log(isPalindrome("hello")); // false


/* Exercise 4: Biggest Number in Array */
function biggestNumberInArray(arr) {
    const numbers = arr.filter(x => typeof x === 'number');
    if (numbers.length === 0) return 0;
    return Math.max(...numbers);
}

// Test
console.log(biggestNumberInArray([-1,0,3,100,99,2,99])); // 100
console.log(biggestNumberInArray(['a', 3, 4, 2]));       // 4
console.log(biggestNumberInArray([]));                    // 0


/* Exercise 5: Unique Elements */
function uniqueElements(arr) {
    return [...new Set(arr)];
}

// Test
console.log(uniqueElements([1,2,3,3,3,3,4,5])); // [1,2,3,4,5]


/* Exercise 6: Calendar Generator */
function createCalendar(year, month) {
    const container = document.createElement('div'); // container for table
    const table = document.createElement('table');
    table.style.borderCollapse = 'collapse';
    const weekdays = ['MO','TU','WE','TH','FR','SA','SU'];

    // Header
    const headerRow = document.createElement('tr');
    weekdays.forEach(day => {
        const th = document.createElement('th');
        th.textContent = day;
        th.style.border = '1px solid black';
        th.style.padding = '3px 5px';
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    // Calculate first day and number of days
    const firstDay = new Date(year, month-1, 1);
    const lastDay = new Date(year, month, 0);
    const daysInMonth = lastDay.getDate();
    let startDay = firstDay.getDay(); // Sunday = 0
    startDay = startDay === 0 ? 6 : startDay - 1; // Adjust: Monday = 0
    let date = 1;

    // Fill table rows
    for (let i = 0; i < 6; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < 7; j++) {
            const cell = document.createElement('td');
            cell.style.border = '1px solid black';
            cell.style.padding = '3px 5px';
            if (i===0 && j<startDay || date>daysInMonth) {
                cell.textContent = '';
            } else {
                cell.textContent = date;
                date++;
            }
            row.appendChild(cell);
        }
        table.appendChild(row);
        if (date > daysInMonth) break;
    }

    container.appendChild(table);
    document.body.appendChild(container);
}

// Test (example: September 2012)
createCalendar(2012, 9);
