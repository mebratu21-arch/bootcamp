function nextHoliday() {
    const now = new Date();

    // Hardcoded holiday example
    const holidayName = "Christmas";
    let holidayDate = new Date(`${now.getFullYear()}-12-25T00:00:00`);

    if (holidayDate - now < 0) { // if passed this year
        holidayDate.setFullYear(holidayDate.getFullYear() + 1);
    }

    const diff = holidayDate - now;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return `The next holiday (${holidayName}) is in ${days} days and ${hours}:${minutes}:${seconds} hours`;
}

module.exports = { nextHoliday };
