const numbers = [5,0,9,1,7,4,2,6,3,8];

// Part 1: Convert array to string using .toString()
console.log("=== Using .toString() ===");
const stringWithCommas = numbers.toString();
console.log(stringWithCommas); // Output: 5,0,9,1,7,4,2,6,3,8

// Part 2: Convert array to string using .join() with different separators
console.log("\n=== Using .join() ===");
console.log("Join with +: " + numbers.join("+")); // Output: 5+0+9+1+7+4+2+6+3+8
console.log("Join with space: " + numbers.join(" ")); // Output: 5 0 9 1 7 4 2 6 3 8
console.log("Join with empty string: " + numbers.join("")); // Output: 5091742638
console.log("Join with comma and space: " + numbers.join(", ")); // Output: 5, 0, 9, 1, 7, 4, 2, 6, 3, 8

// Part 3: Sort in descending order using Bubble Sort with nested loops
console.log("\n=== Bubble Sort (Descending) ===");
console.log("Original array:", numbers);

// Create a copy to avoid modifying the original
const sortedNumbers = [...numbers];

// Bubble Sort algorithm
for (let i = 0; i < sortedNumbers.length - 1; i++) {
    console.log(`\n--- Pass ${i + 1} ---`);
    
    for (let j = 0; j < sortedNumbers.length - 1 - i; j++) {
        console.log(`Comparing ${sortedNumbers[j]} and ${sortedNumbers[j + 1]}`);
        
        // For descending order, swap if left element is smaller than right
        if (sortedNumbers[j] < sortedNumbers[j + 1]) {
            console.log(`Swapping ${sortedNumbers[j]} and ${sortedNumbers[j + 1]}`);
            
            // Swap using temporary variable
            let temp = sortedNumbers[j];
            sortedNumbers[j] = sortedNumbers[j + 1];
            sortedNumbers[j + 1] = temp;
            
            console.log("Array after swap:", sortedNumbers);
        }
    }
    console.log(`Array after pass ${i + 1}:`, sortedNumbers);
}

console.log("\n=== Final Result ===");
console.log("Sorted in descending order:", sortedNumbers);
// Output should be: [9,8,7,6,5,4,3,2,1,0]