// Custom math module with CommonJS syntax
const math = {
  add: function(numbers) {
    return numbers.reduce((sum, num) => sum + num, 0);
  },
  
  multiply: function(numbers) {
    return numbers.reduce((product, num) => product * num, 1);
  },
  
  average: function(numbers) {
    if (numbers.length === 0) return 0;
    const sum = this.add(numbers);
    return sum / numbers.length;
  },
  
  findMax: function(numbers) {
    return Math.max(...numbers);
  },
  
  findMin: function(numbers) {
    return Math.min(...numbers);
  }
};

module.exports = math;