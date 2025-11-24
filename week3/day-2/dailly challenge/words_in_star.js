// Prompt user for words
const input = prompt('Enter several words separated by commas:');

// Split input into array and trim whitespace
const words = input.split(',').map(word => word.trim());

// Find the length of the longest word
let maxLength = 0;
for (const word of words) {
    if (word.length > maxLength) {
        maxLength = word.length;
    }
}

// Create top border
const border = '*'.repeat(maxLength + 4);
console.log(border);

// Print each word in the frame
for (const word of words) {
    const padding = ' '.repeat(maxLength - word.length);
    console.log(`* ${word}${padding} *`);
}

// Create bottom border
console.log(border);