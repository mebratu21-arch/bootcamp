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

