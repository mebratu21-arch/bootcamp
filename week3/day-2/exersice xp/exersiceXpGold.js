/**
 * Utility Functions
 * Clean, safe, modern JavaScript implementations
 */

// ----- 1. Check if a string is blank -----
function isBlank(str) {
    return !str || String(str).trim().length === 0;
}

function isBlank2(str) {
    return String(str).trim() === "";
}

// ----- 2. Abbreviate a full name -----
function abbrevName(fullName) {
    if (!fullName || typeof fullName !== "string") return "";

    const names = fullName.trim().split(/\s+/);
    if (names.length < 2) return fullName.trim();

    return `${names[0]} ${names.at(-1)[0]}.`;
}

function abbrevName2(fullName) {
    if (!fullName) return "";
    const parts = fullName.trim().split(/\s+/);
    return parts.length < 2
        ? fullName.trim()
        : `${parts[0]} ${parts[1][0]}.`;
}

// ----- 3. Swap character cases -----
function swapCase(str) {
    return [...str]
        .map(char =>
            char === char.toUpperCase()
                ? char.toLowerCase()
                : char.toUpperCase()
        )
        .join('');
}

function swapCase2(str) {
    let result = "";
    for (let char of str) {
        result += (char === char.toUpperCase())
            ? char.toLowerCase()
            : char.toUpperCase();
    }
    return result;
}

// ----- 4. Check if value appears in all subarrays -----
function isOmnipresent(arr, value) {
    return Array.isArray(arr) &&
        arr.every(sub => Array.isArray(sub) && sub.includes(value));
}

function isOmnipresent2(arr, value) {
    if (!Array.isArray(arr)) return false;
    for (let sub of arr) {
        if (!Array.isArray(sub) || !sub.includes(value)) return false;
    }
    return true;
}

// ----- 5. Color diagonal cells in a table -----
function colorDiagonalCells() {
    const table = document.querySelector("table");
    if (!table) {
        console.warn("No <table> element found in the document.");
        return;
    }

    [...table.rows].forEach((row, i) => {
        const cell = row.cells[i];
        if (cell) {
            cell.style.background = "red";
            cell.style.color = "white";
            cell.style.fontWeight = "bold";
        }
    });
}


/**
 * Export for tests (Node.js environment).
 */
if (typeof module !== "undefined") {
    module.exports = {
        isBlank,
        isBlank2,
        abbrevName,
        abbrevName2,
        swapCase,
        swapCase2,
        isOmnipresent,
        isOmnipresent2,
        colorDiagonalCells
    };
}
