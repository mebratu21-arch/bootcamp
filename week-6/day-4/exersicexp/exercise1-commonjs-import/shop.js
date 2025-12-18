// shop.js
const products = require("./products");

function findProductByName(productName) {
  return products.find(p => p.name.toLowerCase() === productName.toLowerCase());
}

// Test with different product names
console.log(findProductByName("Laptop"));
console.log(findProductByName("Shoes"));
console.log(findProductByName("Book"));
