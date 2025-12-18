function minutesLived(birthdateStr) {
  const birthdate = new Date(birthdateStr); // e.g. "1990-05-15"
  const now = new Date();

  const diffMs = now - birthdate;
  const minutes = Math.floor(diffMs / (1000 * 60));

  return `You have lived approximately ${minutes} minutes so far.`;
}

// Hardcoded example
module.exports = () => minutesLived("1990-05-15");
