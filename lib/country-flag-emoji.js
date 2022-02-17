// Liften from: https://dev.to/jorik/country-code-to-flag-emoji-a21
module.exports = function getFlagEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char =>  127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}
