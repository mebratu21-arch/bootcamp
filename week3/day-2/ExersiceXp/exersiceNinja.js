/************************************************************
 *  Exercise 1: Random Number & Even Numbers
 ************************************************************/

/**
 * Generates a random integer between 1 and 100
 * Logs all even numbers from 0 up to the random number
 */
function runExercise1() {
    const rand = Math.floor(Math.random() * 100) + 1;
    console.log(`Random number: ${rand}`);
    console.log(`Even numbers from 0 to ${rand}:`);

    for (let i = 0; i <= rand; i += 2) {
        console.log(i);
    }
}

// runExercise1(); // uncomment to test



/************************************************************
 *  Exercise 2: Capitalized letters at even/odd indexes
 ************************************************************/

/**
 * Capitalizes letters in even and odd indexes separately
 * @param {string} str - lowercase string with no spaces
 * @returns {string[]} [evenCapitalized, oddCapitalized]
 */
function capitalizeIndexes(str) {
    let even = "";
    let odd = "";

    [...str].forEach((char, i) => {
        even += i % 2 === 0 ? char.toUpperCase() : char;
        odd  += i % 2 === 1 ? char.toUpperCase() : char;
    });

    return [even, odd];
}

// console.log(capitalizeIndexes("abcdef")); // ["AbCdEf","aBcDeF"]



/************************************************************
 *  Exercise 3: Palindrome check
 ************************************************************/

/**
 * Checks if a string is a palindrome
 * @param {string} str
 * @returns {boolean}
 */
function isPalindrome(str) {
    const cleaned = str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    return cleaned === [...cleaned].reverse().join('');
}

// console.log(isPalindrome("madam")); // true
// console.log(isPalindrome("hello")); // false



/************************************************************
 *  Exercise 4: Biggest number in array
 ************************************************************/

/**
 * Returns the biggest number in an array
 * Non-number elements are ignored
 * @param {Array} arr 
 * @returns {number}
 */
function biggestNumberInArray(arr) {
    const numbers = arr.filter(x => typeof x === 'number');
    return numbers.length > 0 ? Math.max(...numbers) : 0;
}

// console.log(biggestNumberInArray([-1,0,3,100, 99, 2, 99])); // 100
// console.log(biggestNumberInArray(['a',3,4,2])); // 4
// console.log(biggestNumberInArray([])); // 0



/************************************************************
 *  Exercise 5: Unique elements
 ************************************************************/

/**
 * Returns a new array containing only unique elements
 * @param {Array} arr 
 * @returns {Array}
 */
function uniqueElements(arr) {
    return [...new Set(arr)];
}

// console.log(uniqueElements([1,2,3,3,3,3,4,5])); // [1,2,3,4,5]



/************************************************************
 *  Exercise 6: Calendar generator (DOM)
 ************************************************************/

/**
 * Creates a calendar table for given year and month
 * @param {number} year 
 * @param {number} month - 1=Jan, 12=Dec
 */
function createCalendar(year, month) {
    // Remove previous table if any
    let container = document.getElementById('calendar-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'calendar-container';
        document.body.appendChild(container);
    }
    container.innerHTML = '';

    const table = document.createElement('table');
    table.style.borderCollapse = "collapse";

    // Weekdays header
    const weekdays = ['MO','TU','WE','TH','FR','SA','SU'];
    const header = document.createElement('tr');
    weekdays.forEach(day => {
        const th = document.createElement('th');
        th.textContent = day;
        th.style.border = "1px solid black";
        th.style.padding = "3px 5px";
        header.appendChild(th);
    });
    table.appendChild(header);

    // Days calculation
    const firstDay = new Date(year, month-1, 1);
    const lastDay = new Date(year, month, 0);
    const daysInMonth = lastDay.getDate();

    // Adjust start day: Monday=0, Sunday=6
    let startDay = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;

    let date = 1;
    for (let i = 0; i < 6; i++) {
        const row = document.createElement('tr');

        for (let j = 0; j < 7; j++) {
            const cell = document.createElement('td');
            cell.style.border = "1px solid black";
            cell.style.padding = "3px 5px";
            if ((i===0 && j < startDay) || date > daysInMonth) {
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
}

// Example: createCalendar(2012, 9);
// createCalendar(2012, 9); // Uncomment to test
