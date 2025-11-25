/************************************************************
 *  Exercise 1 : is_Blank
 ************************************************************/

/**
 * Checks if a string is blank (empty or only spaces)
 * @param {string} str 
 * @returns {boolean}
 */
function isBlank(str) {
    return !str || str.trim().length === 0;
}

console.log(isBlank(''));        // true
console.log(isBlank('abc'));     // false



/************************************************************
 *  Exercise 2 : Abbrev_name
 ************************************************************/

/**
 * Converts full name into abbreviated format
 * @param {string} str - full name
 * @returns {string}
 */
function abbrevName(str) {
    const parts = str.split(" ");
    if (parts.length < 2) return str;

    return `${parts[0]} ${parts[1][0].toUpperCase()}.`;
}

console.log(abbrevName("Robin Singh"));  // "Robin S."



/************************************************************
 *  Exercise 3 : SwapCase
 ************************************************************/

/**
 * Swaps the case of every character in a string
 * @param {string} str 
 * @returns {string}
 */
function swapCase(str) {
    let result = "";

    for (let ch of str) {
        if (ch === ch.toUpperCase()) {
            result += ch.toLowerCase();
        } else {
            result += ch.toUpperCase();
        }
    }

    return result;
}

console.log(swapCase("The Quick Brown Fox"));
// Output → "tHE qUICK bROWN fOX"



/************************************************************
 *  Exercise 4 : Omnipresent value
 ************************************************************/

/**
 * Checks if value exists in all subarrays
 * @param {Array[]} arr 
 * @param {*} value 
 * @returns {boolean}
 */
function isOmnipresent(arr, value) {
    return arr.every(subArr => subArr.includes(value));
}

console.log(isOmnipresent([[1, 1], [1, 3], [5, 1], [6, 1]], 1)); // true
console.log(isOmnipresent([[1, 1], [1, 3], [5, 1], [6, 1]], 6)); // false



/************************************************************
 *  Exercise 5 : Red table diagonal
 ************************************************************/

/**
 * Colors diagonal cells of a table red
 * (Assumes table is first element inside body)
 */
function colorTableDiagonal() {
    const table = document.body.querySelector("table");

    for (let rowIndex = 0; rowIndex < table.rows.length; rowIndex++) {
        let row = table.rows[rowIndex];
        let cell = row.cells[rowIndex];  // diagonal cell
        if (cell) {
            cell.style.backgroundColor = "red";
        }
    }
}

// Automatically run when page loads
window.onload = colorTableDiagonal;
