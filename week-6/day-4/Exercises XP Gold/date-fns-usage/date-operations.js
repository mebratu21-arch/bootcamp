// Import date-fns functions
const { 
  format, 
  addDays, 
  addMonths, 
  addYears, 
  differenceInDays,
  differenceInYears,
  isLeapYear,
  parseISO,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  formatDistance,
  formatRelative,
  getDay,
  getDaysInMonth
} = require('date-fns');

function performDateOperations() {
  console.log('=== DATE OPERATIONS WITH DATE-FNS ===\n');
  
  // Get current date
  const now = new Date();
  console.log(`1. Current date and time: ${now}`);
  console.log(`   Formatted: ${format(now, 'yyyy-MM-dd HH:mm:ss')}`);
  
  // Add 5 days to current date
  const fiveDaysLater = addDays(now, 5);
  console.log(`\n2. Date 5 days from now:`);
  console.log(`   ${format(fiveDaysLater, 'EEEE, MMMM do, yyyy')}`);
  
  // Add 3 months
  const threeMonthsLater = addMonths(now, 3);
  console.log(`\n3. Date 3 months from now:`);
  console.log(`   ${format(threeMonthsLater, 'PPP')}`);
  
  // Add 1 year
  const oneYearLater = addYears(now, 1);
  console.log(`\n4. Date 1 year from now:`);
  console.log(`   ${format(oneYearLater, 'PP')}`);
  
  // Calculate differences
  console.log(`\n5. Time Differences:`);
  console.log(`   Days between now and 5 days later: ${differenceInDays(fiveDaysLater, now)} days`);
  console.log(`   Years between now and 1 year later: ${differenceInYears(oneYearLater, now)} years`);
  
  // Check if current year is leap year
  console.log(`\n6. Leap Year Check:`);
  console.log(`   Current year (${format(now, 'yyyy')}) is leap year: ${isLeapYear(now) ? 'Yes' : 'No'}`);
  
  // Week information
  console.log(`\n7. Week Information:`);
  const weekStart = startOfWeek(now, { weekStartsOn: 1 }); // Monday
  const weekEnd = endOfWeek(now, { weekStartsOn: 1 });
  console.log(`   Week starts: ${format(weekStart, 'EEEE, MMMM do')}`);
  console.log(`   Week ends: ${format(weekEnd, 'EEEE, MMMM do')}`);
  console.log(`   Today is: ${format(now, 'EEEE')}`);
  
  // Month information
  console.log(`\n8. Month Information:`);
  const monthStart = startOfMonth(now);
  const monthEnd = endOfMonth(now);
  const daysInMonth = getDaysInMonth(now);
  console.log(`   Month starts: ${format(monthStart, 'MMM do')}`);
  console.log(`   Month ends: ${format(monthEnd, 'MMM do')}`);
  console.log(`   Days in month: ${daysInMonth}`);
  
  // Human readable formats
  console.log(`\n9. Human Readable Formats:`);
  console.log(`   Time ago: ${formatDistance(now, new Date('2024-01-01'), { addSuffix: true })}`);
  console.log(`   Relative: ${formatRelative(now, new Date())}`);
  
  // Create date range for this week
  console.log(`\n10. This Week's Dates:`);
  const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd });
  weekDays.forEach(day => {
    const isToday = format(day, 'yyyy-MM-dd') === format(now, 'yyyy-MM-dd');
    console.log(`   ${format(day, 'EEE MMM do')}${isToday ? ' (Today)' : ''}`);
  });
  
  return {
    now,
    fiveDaysLater,
    threeMonthsLater,
    oneYearLater
  };
}

module.exports = { performDateOperations };