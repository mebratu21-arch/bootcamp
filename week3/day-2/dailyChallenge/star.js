/**
 * Frame an array of words inside a box made of asterisks
 * @param {string[]} words - list of words
 * @returns {string[]} array of framed lines (each line is a string)
 */
function frameWords(words) {
    // If no words are provided
    if (!words || words.length === 0) 
        return ["No words to display."];

    // Find the length of the longest word
    const maxLength = Math.max(...words.map(w => w.length));

    // Create the top & bottom border
    const border = '*'.repeat(maxLength + 4); // 4 = "* " + " *"

    const framed = [border]; // first line is border

    // Create a frame line for each word
    words.forEach(word => {
        const padding = ' '.repeat(maxLength - word.length); 
        framed.push(`* ${word}${padding} *`);
    });

    // Add bottom border
    framed.push(border);

    return framed;
}


/**
 * Ask the user for words and show them framed
 */
function runWordsInStar() {
    const input = prompt('Enter several words separated by commas:');

    // If user did not enter anything
    if (!input) {
        console.log("No input provided.");
        return;
    }

    // Split words by comma, remove spaces, ignore empty entries
    const words = input
        .split(',')
        .map(word => word.trim())
        .filter(word => word.length > 0);

    if (words.length === 0) {
        console.log("No valid words entered.");
        return;
    }

    // Create framed version
    const framedLines = frameWords(words);

    // Print framed result line by line
    framedLines.forEach(line => console.log(line));
}

// Run the program
runWordsInStar();
