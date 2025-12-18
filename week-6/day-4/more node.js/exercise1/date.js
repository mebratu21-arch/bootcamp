function timeUntilNewYear() {
  const now = new Date();
  const nextYear = now.getFullYear() + 1;
  const newYear = new Date(`${nextYear}-01-01T00:00:00`);

  const diffMs = newYear - now;

  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diffMs / (1000 * 60)) % 60);
  const seconds = Math.floor((diffMs / 1000) % 60);

  return `The 1st January is in ${days} days and ${hours}:${minutes}:${seconds} hours`;
}

module.exports = timeUntilNewYear;
