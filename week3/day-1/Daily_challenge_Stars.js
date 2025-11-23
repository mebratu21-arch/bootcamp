// ============================================
// SOLUTION 1: Using ONE loop
// ============================================
console.log("Solution 1: Using one loop\n");

let pattern = "";
for (let i = 1; i <= 6; i++) {
  pattern += "* ";
  console.log(pattern);
}

console.log("\n" + "=".repeat(40) + "\n");

// ============================================
// SOLUTION 2: Using TWO NESTED loops
// ============================================
console.log("Solution 2: Using nested loops\n");

for (let i = 1; i <= 6; i++) {
  let line = "";
  for (let j = 1; j <= i; j++) {
    line += "* ";
  }
  console.log(line);
}

// ============================================
// EXPLANATION
// ============================================
console.log("\n" + "=".repeat(40));
console.log("EXPLANATION:");
console.log("=".repeat(40));
console.log(`
Solution 1 (One loop):
- We build up a 'pattern' string by adding "* " in each iteration
- The pattern accumulates: "*" → "* *" → "* * *", etc.

Solution 2 (Nested loops):
- Outer loop (i): Controls how many rows (1 to 6)
- Inner loop (j): Prints stars for each row (1 to i stars)
- Each row starts fresh with an empty string
`);