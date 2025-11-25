// =======================================
// EXERCISE 1: RANDOM NUMBER & EVEN NUMBERS
// =======================================

function printEvenNumbers() {
    const randomNum = Math.floor(Math.random() * 100) + 1;
    console.log("Random Number:", randomNum);

    for (let i = 0; i <= randomNum; i++) {
        if (i % 2 === 0) {
            console.log(i);
        }
    }
}

printEvenNumbers();


// =======================================
// EXERCISE 2: CAPITALIZED LETTERS
// =======================================

function capitalize(str) {
    let evenCaps = "";
    let oddCaps = "";

    for (let i = 0; i < str.length; i++) {
        if (i % 2 === 0) {
            evenCaps += str[i].toUpperCase();
            oddCaps += str[i];
        } else {
            evenCaps += str[i];
            oddCaps += str[i].toUpperCase();
        }
    }

    return [evenCaps, oddCaps];
}

console.log(capitalize("abcdef")); // ['AbCdEf', 'aBcDeF']


// =======================================
// EXERCISE 3: PALINDROME CHECK
// =======================================

function isPalindrome(str) {
    let reversed = str.split("").reverse().join("");
    return str === reversed;
}

console.log(isPalindrome("madam")); // true
console.log(isPalindrome("hello")); // false


// =======================================
// EXERCISE 4: BIGGEST NUMBER IN ARRAY
// =======================================

function biggestNumberInArray(arrayNumber) {
    if (arrayNumber.length === 0) return 0;

    let max = 0;

    for (let item of arrayNumber) {
        if (typeof item === "number" && item > max) {
            max = item;
        }
    }

    return max;
}

console.log(biggestNumberInArray([-1, 0, 3, 100, 99, 2, 99])); // 100
console.log(biggestNumberInArray(["a", 3, 4, 2])); // 4
console.log(biggestNumberInArray([])); // 0


// =======================================
// EXERCISE 5: UNIQUE ELEMENTS
// =======================================

function uniqueElements(arr) {
    return [...new Set(arr)];
}

console.log(uniqueElements([1, 2, 3, 3, 3, 3, 4, 5])); // [1,2,3,4,5]


// =======================================
// EXERCISE 6: CREATE CALENDAR (DOM)
// =======================================
// REQUIREMENT: Add <div id="calendar"></div> in your HTML
// Then call createCalendar(2012, 9);

function createCalendar(year, month) {
    month = month - 1; // convert to JS 0-based month

    const calendarDiv = document.getElementById("calendar");
    const table = document.createElement("table");

    const days = ["MO", "TU", "WE", "TH", "FR", "SA", "SU"];

    // --- Create header row ---
    const headerRow = document.createElement("tr");
    days.forEach(day => {
        const th = document.createElement("th");
        th.textContent = day;
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    // Determine first day of month
    let date = new Date(year, month, 1);
    let firstDay = (date.getDay() + 6) % 7; // Convert Sunday=0 → 6

    // Create first row
    let row = document.createElement("tr");

    // Add empty cells before first day
    for (let i = 0; i < firstDay; i++) {
        row.appendChild(document.createElement("td"));
    }

    // Fill the days
    while (date.getMonth() === month) {
        const td = document.createElement("td");
        td.textContent = date.getDate();
        row.appendChild(td);

        if ((date.getDay() + 6) % 7 === 6) {
            table.appendChild(row);
            row = document.createElement("tr");
        }

        date.setDate(date.getDate() + 1);
    }

    table.appendChild(row);
    calendarDiv.appendChild(table);
}

// Example usage (uncomment to test in browser):
// createCalendar(2012, 9);
