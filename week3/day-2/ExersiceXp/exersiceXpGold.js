/************************************************************
 *  EXERCISES XP GOLD
 ************************************************************/

/* Exercise 1: is_Blank */
function isBlank(str) {
    // Returns true if string is empty or contains only whitespace
    return str.trim().length === 0;
}

// Test
console.log(isBlank(''));     // true
console.log(isBlank('abc'));  // false


/* Exercise 2: Abbrev_name */
function abbrevName(name) {
    const parts = name.split(' ');
    if (parts.length < 2) return name;
    return `${parts[0]} ${parts[1][0]}.`;
}

// Test
console.log(abbrevName("Robin Singh")); // "Robin S."


/* Exercise 3: SwapCase */
function swapCase(str) {
    return [...str].map(ch => {
        if (ch === ch.toUpperCase()) return ch.toLowerCase();
        else return ch.toUpperCase();
    }).join('');
}

// Test
console.log(swapCase('The Quick Brown Fox')); // 'tHE qUICK bROWN fOX'


/* Exercise 4: Omnipresent value */
function isOmnipresent(arr, val) {
    // Every subarray must include val
    return arr.every(subArr => subArr.includes(val));
}

// Test
console.log(isOmnipresent([[1, 1], [1, 3], [5, 1], [6, 1]], 1)); // true
console.log(isOmnipresent([[1, 1], [1, 3], [5, 1], [6, 1]], 6)); // false


/* Exercise 5: Red table diagonal */
function colorDiagonal() {
    const table = document.querySelector('table');
    const rows = table.rows;

    for (let i = 0; i < rows.length; i++) {
        if (rows[i].cells[i]) {
            rows[i].cells[i].style.backgroundColor = 'red';
        }
    }
}

// Call after DOM loads
window.onload = colorDiagonal;
