// Exercise 1: is_Blank
function isBlank(str) {
    return str.trim() === '';
}

// Test Exercise 1
console.log("=== Exercise 1: is_Blank ===");
console.log(isBlank('')); // true
console.log(isBlank('   ')); // true
console.log(isBlank('abc')); // false
console.log(isBlank('  abc  ')); // false

// Exercise 2: Abbrev_name
function abbrevName(fullName) {
    const names = fullName.trim().split(' ');
    if (names.length < 2) return fullName;
    
    const firstName = names[0];
    const lastNameInitial = names[names.length - 1].charAt(0) + '.';
    
    return `${firstName} ${lastNameInitial}`;
}

// Test Exercise 2
console.log("\n=== Exercise 2: Abbrev_name ===");
console.log(abbrevName("Robin Singh")); // "Robin S."
console.log(abbrevName("John Michael Doe")); // "John D."
console.log(abbrevName("Alice")); // "Alice"
console.log(abbrevName("  Bob   Smith  ")); // "Bob S."

// Exercise 3: SwapCase
function swapCase(str) {
    return str.split('').map(char => {
        if (char === char.toUpperCase()) {
            return char.toLowerCase();
        } else {
            return char.toUpperCase();
        }
    }).join('');
}

// Test Exercise 3
console.log("\n=== Exercise 3: SwapCase ===");
console.log(swapCase('The Quick Brown Fox')); // 'tHE qUICK bROWN fOX'
console.log(swapCase('Hello World')); // 'hELLO wORLD'
console.log(swapCase('JavaScript')); // 'jAVAsCRIPT'

// Exercise 4: Omnipresent value
function isOmnipresent(arr, value) {
    return arr.every(subArray => subArray.includes(value));
}

// Test Exercise 4
console.log("\n=== Exercise 4: Omnipresent value ===");
console.log(isOmnipresent([[1, 1], [1, 3], [5, 1], [6, 1]], 1)); // true
console.log(isOmnipresent([[1, 1], [1, 3], [5, 1], [6, 1]], 6)); // false
console.log(isOmnipresent([[3, 4], [8, 3, 2], [3], [9, 3], [5, 3], [4, 3]], 3)); // true
console.log(isOmnipresent([[1, 2, 3], [4, 5, 6], [7, 8, 9]], 1)); // false

// Exercise 5: Red table (DOM Manipulation)
function colorDiagonalCells() {
    const table = document.querySelector('table');
    const rows = table.getElementsByTagName('tr');
    
    for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        // Color the diagonal cell (same row and column index)
        if (cells[i]) {
            cells[i].style.backgroundColor = 'red';
            cells[i].style.color = 'white';
        }
    }
}

// The HTML structure for Exercise 5
const htmlStructure = `
<!DOCTYPE HTML>
<html>
<head>
  <style>
    table {
      border-collapse: collapse;
    }
    td {
      border: 1px solid black;
      padding: 3px 5px;
    }
  </style>
</head>

<body>
  <table>
    <tr>
      <td>1:1</td>
      <td>2:1</td>
      <td>3:1</td>
      <td>4:1</td>
      <td>5:1</td>
    </tr>
    <tr>
      <td>1:2</td>
      <td>2:2</td>
      <td>3:2</td>
      <td>4:2</td>
      <td>5:2</td>
    </tr>
    <tr>
      <td>1:3</td>
      <td>2:3</td>
      <td>3:3</td>
      <td>4:3</td>
      <td>5:3</td>
    </tr>
    <tr>
      <td>1:4</td>
      <td>2:4</td>
      <td>3:4</td>
      <td>4:4</td>
      <td>5:4</td>
    </tr>
    <tr>
      <td>1:5</td>
      <td>2:5</td>
      <td>3:5</td>
      <td>4:5</td>
      <td>5:5</td>
    </tr>
  </table>
  <script>
    // The colorDiagonalCells function would be called here
    colorDiagonalCells();
  </script>
</body>
</html>
`;

console.log("\n=== Exercise 5: Red table ===");
console.log("This exercise requires DOM manipulation.");
console.log("The HTML structure needed:");
console.log(htmlStructure);

// Additional test cases and alternative implementations

// Alternative implementation for Exercise 1
function isBlank2(str) {
    return !str || str.trim().length === 0;
}

// Alternative implementation for Exercise 2
function abbrevName2(fullName) {
    const names = fullName.trim().split(/\s+/);
    return names.length > 1 
        ? `${names[0]} ${names[names.length - 1][0]}.`
        : fullName;
}

// Alternative implementation for Exercise 3
function swapCase2(str) {
    let result = '';
    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        result += char === char.toUpperCase() 
            ? char.toLowerCase() 
            : char.toUpperCase();
    }
    return result;
}

// Alternative implementation for Exercise 4
function isOmnipresent2(arr, value) {
    for (let i = 0; i < arr.length; i++) {
        if (!arr[i].includes(value)) {
            return false;
        }
    }
    return true;
}

// Test alternative implementations
console.log("\n=== Alternative Implementations ===");
console.log("isBlank2(''):", isBlank2(''));
console.log("abbrevName2('Robin Singh'):", abbrevName2('Robin Singh'));
console.log("swapCase2('The Quick Brown Fox'):", swapCase2('The Quick Brown Fox'));
console.log("isOmnipresent2([[1, 1], [1, 3], [5, 1], [6, 1]], 1):", isOmnipresent2([[1, 1], [1, 3], [5, 1], [6, 1]], 1));

// Export functions for use in other modules (if needed)
if (typeof module !== 'undefined' && module.exports) {
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