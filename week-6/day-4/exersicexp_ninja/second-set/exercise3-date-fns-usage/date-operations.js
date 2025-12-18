const { format, addDays } = require('date-fns');

function performDateOperations() {
  const now = new Date();
  console.log('Current date:', format(now, 'yyyy-MM-dd HH:mm:ss'));
  
  const fiveDaysLater = addDays(now, 5);
  console.log('Five days later:', format(fiveDaysLater, 'yyyy-MM-dd'));
}

module.exports = { performDateOperations };