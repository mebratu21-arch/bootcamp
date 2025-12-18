const math = {
  add: (numbers) => numbers.reduce((sum, num) => sum + num, 0),
  multiply: (numbers) => numbers.reduce((product, num) => product * num, 1)
};

module.exports = math;