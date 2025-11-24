// words_in_star.js

/**
 * Function to frame words in asterisks
 * @param {string[]} words - Array of words to frame
 */
function frameWords(words) {
    if (!words || words.length === 0) {
        console.log("No words to display.");
        return;
    }

    // Find the length of the longest word
    const maxLength = Math.max(...words.map(w => w.length));

    // Create top border
    const border = '*'.repeat(maxLength + 4);
    console.log(border);

    // Print each word in the frame
    words.forEach(word => {
        const padding = ' '.repeat(maxLength - word.length);
        console.log(`* ${word}${padding} *`);
    });

    // Create bottom border
    console.log(border);
}

/**
 * Prompt user for input and display framed words
 */
function runWordsInStar() {
    const input = prompt('Enter several words separated by commas:');

    if (!input) {
        console.log("No input provided.");
        return;
    }

    // Split input into array, trim whitespace, and remove empty entries
    const words = input.split(',')
                       .map(word => word.trim())
                       .filter(word => word.length > 0);

    if (words.length === 0) {
        console.log("No valid words entered.");
        return;
    }

    // Call the framing function
    frameWords(words);
}

// Run the program
runWordsInStar();
