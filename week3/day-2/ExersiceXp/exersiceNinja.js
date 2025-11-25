/************************************************************
 *  EXERCISES XP NINJA – FULL CORRECT SOLUTION
 ************************************************************/

/***********************
 * Exercise 1: Random Number
 ************************/

// Get a random number between 1–100
const randomNum = Math.floor(Math.random() * 100) + 1;
console.log("Random number:", randomNum);

// Console.log all even numbers from 0 → randomNum
for (let i = 0; i <= randomNum; i++) {
  if (i % 2 === 0) console.log(i);
}


/***********************
 * Exercise 2: Capitalized Letters
 ************************/
/*
Create a function that takes a lowercase string with no spaces.
Return:
  - Version with even indexes capitalized
  - Version with odd indexes capitalized
Example: "abcdef" → ["AbCdEf", "aBcDeF"]
*/

function capitalize(str) {
  let evenCap = "";
  let oddCap = "";

  for (let i = 0; i < str.length; i++) {
    if (i % 2 === 0) {
      evenCap += str[i].toUpperCase();
      oddCap += str[i].toLowerCase();
    } else {
      evenCap += str[i].toLowerCase();
      oddCap += str[i].toUpperCase();
    }
  }

  return [evenCap, oddCap];
}

console.log(capitalize("abcdef")); // ["AbCdEf", "aBcDeF"]


/***********************
 * Exercise 3: Is Palindrome?
 ************************/

function isPalindrome(str) {
  const reversed = str.split("").reverse().join("");
  return str === reversed;
}

console.log(isPalindrome("madam")); // true
console.log(isPalindrome("hello")); // false


/***********************
 * Exercise 4: Biggest Number
 ************************/

function biggestNumberInArray(arrayNumber) {
  if (arrayNumber.length === 0) return 0;

  let biggest = -Infinity;

  for (let item of arrayNumber) {
    if (typeof item === "number" && item > biggest) {
      biggest = item;
    }
  }

  return biggest === -Infinity ? 0 : biggest;
}

// Tests
console.log(biggestNumberInArray([-1, 0, 3, 100, 99, 2, 99]));  // 100
console.log(biggestNumberInArray(["a", 3, 4, 2]));              // 4
console.log(biggestNumberInArray([]));                          // 0


/***********************
 * Exercise 5: Unique Elements
 ************************/

function uniqueElements(arr) {
  return [...new Set(arr)];
}

// Tests
console.log(uniqueElements([1,2,3,3,3,3,4,5])); // [1,2,3,4,5]


/***********************
 * Exercise 6: Calendar
 ************************/

function createCalendar(year, month) {
  // Month is 1-indexed (1 = January), but JS Date uses 0-indexed
  month = month - 1;

  const container = document.createElement("table");
  container.style.borderCollapse = "collapse";
  container.style.textAlign = "center";

  // Weekday header (Monday first)
  const weekdays = ["MO","TU","WE","TH","FR","SA","SU"];
  
  let headerRow = document.createElement("tr");
  weekdays.forEach(day => {
    const th = document.createElement("th");
    th.textContent = day;
    th.style.border = "1px solid black";
    th.style.padding = "5px";
    headerRow.appendChild(th);
  });
  container.appendChild(headerRow);

  // Get first day of month (JS: 0=Sunday, 1=Monday...)
  let date = new Date(year, month, 1);
  
  let startDay = date.getDay(); 
  // Convert JS Sunday=0 → our Monday=0
  startDay = (startDay + 6) % 7;

  let row = document.createElement("tr");

  // Empty cells before day 1
  for (let i = 0; i < startDay; i++) {
    const td = document.createElement("td");
    td.textContent = ".";
    td.style.border = "1px solid black";
    td.style.padding = "5px";
    row.appendChild(td);
  }

  // Fill in days
  while (date.getMonth() === month) {
    const td = document.createElement("td");
    td.textContent = date.getDate();
    td.style.border = "1px solid black";
    td.style.padding = "5px";
    row.appendChild(td);

    // If Sunday → start new row
    if ((date.getDay() + 6) % 7 === 6) {
      container.appendChild(row);
      row = document.createElement("tr");
    }

    date.setDate(date.getDate() + 1);
  }

  // Append last row if not complete
  if (row.children.length > 0) {
    container.appendChild(row);
  }

  // Append calendar to the document body
  document.body.appendChild(container);
}

// Example (run in HTML environment):
// createCalendar(2012, 9);
