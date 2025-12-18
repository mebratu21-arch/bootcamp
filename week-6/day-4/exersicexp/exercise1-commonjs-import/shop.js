// Import products from products.js
const products = require('./products.js');

// Function to search for a product by name
function findProduct(productName) {
  const product = products.find(p => p.name === productName);
  return product;
}

// Test the function with different product names
console.log("=== Product Search Results ===");
const product1 = findProduct("Laptop");
console.log(product1 ? `Found: ${product1.name} - $${product1.price} (${product1.category})` : "Product not found");

const product2 = findProduct("Coffee Mug");
console.log(product2 ? `Found: ${product2.name} - $${product2.price} (${product2.category})` : "Product not found");

const product3 = findProduct("Book");
console.log(product3 ? `Found: ${product3.name} - $${product3.price} (${product3.category})` : "Product not found");

const product4 = findProduct("Smartphone");
console.log(product4 ? `Found: ${product4.name} - $${product4.price} (${product4.category})` : "Product not found");