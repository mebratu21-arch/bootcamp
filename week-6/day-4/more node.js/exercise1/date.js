function timeUntilNewYear() {
    const now = new Date();
    const nextYear = new Date(`January 1, ${now.getFullYear() + 1} 00:00:00`);
    const diff = nextYear - now;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return `The 1st January is in ${days} days and ${hours}:${minutes}:${seconds} hours`;
}

module.exports = { timeUntilNewYear };
