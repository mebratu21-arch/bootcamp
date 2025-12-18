const { performDateOperations } = require('./date-operations.js');

console.log('======================================');
console.log('    DATE MANIPULATION WITH DATE-FNS');
console.log('======================================\n');

// Perform date operations
const results = performDateOperations();

console.log('\n' + '='.repeat(50));
console.log('SUMMARY OF DATE OPERATIONS');
console.log('='.repeat(50));

const { format } = require('date-fns');

console.log(`Current Date: ${format(results.now, 'yyyy-MM-dd HH:mm:ss')}`);
console.log(`In 5 Days:    ${format(results.fiveDaysLater, 'yyyy-MM-dd')}`);
console.log(`In 3 Months:  ${format(results.threeMonthsLater, 'yyyy-MM-dd')}`);
console.log(`In 1 Year:    ${format(results.oneYearLater, 'yyyy-MM-dd')}`);

console.log('\n' + '='.repeat(50));
console.log(' Date operations completed successfully!');

// Additional: Working with different date formats
console.log('\n' + '='.repeat(50));
console.log('ADDITIONAL DATE FORMATS');
console.log('='.repeat(50));

console.log(`ISO Format: ${format(results.now, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx")}`);
console.log(`US Format: ${format(results.now, 'MM/dd/yyyy')}`);
console.log(`EU Format: ${format(results.now, 'dd/MM/yyyy')}`);
console.log(`Full Date: ${format(results.now, 'PPPPpppp')}`);
console.log(`Time Only: ${format(results.now, 'hh:mm:ss a')}`);
console.log(`12-hour: ${format(results.now, 'hh:mm a')}`);
console.log(`24-hour: ${format(results.now, 'HH:mm')}`);