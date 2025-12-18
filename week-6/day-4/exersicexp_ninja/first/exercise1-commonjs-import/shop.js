const products = require('./products.js');

function findProduct(productName) {
  return products.find(p => p.name === productName);
}

console.log("=== Product Search Results ===");
console.log(findProduct("Laptop") || "Product not found");
console.log(findProduct("Coffee Mug") || "Product not found");
console.log(findProduct("Book") || "Product not found");
console.log(findProduct("Smartphone") || "Product not found");