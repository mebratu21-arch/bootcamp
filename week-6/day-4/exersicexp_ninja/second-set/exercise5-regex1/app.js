function returnNumbers(str) {
  const numbers = str.replace(/\D/g, '');
  console.log(`Input: "${str}" => Output: "${numbers}"`);
  return numbers;
}

returnNumbers('k5k3q2g5z6x9bn');
returnNumbers('a1b2c3');