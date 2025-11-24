/**
 * Frame an array of words in a border of asterisks
 * @param {string[]} words - Array of words to frame
 * @returns {string[]} - Array of framed lines
 */
function frameWords(words) {
    if (!words || words.length === 0) return ["No words to display."];

    const maxLength = Math.max(...words.map(w => w.length));
    const border = '*'.repeat(maxLength + 4);

    const framed = [border];
    words.forEach(word => {
        const padding = ' '.repeat(maxLength - word.length);
        framed.push(`* ${word}${padding} *`);
    });
    framed.push(border);

    return framed;
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

    const words = input.split(',')
                       .map(word => word.trim())
                       .filter(word => word.length > 0);

    if (words.length === 0) {
        console.log("No valid words entered.");
        return;
    }

    // Get framed lines
    const framedLines = frameWords(words);

    // Print each line
    framedLines.forEach(line => console.log(line));
}

// Run the program
runWordsInStar();
