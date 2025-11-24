// Prompt user for words
const input = prompt('Enter several words separated by commas:');

// Check if input is valid
if (!input) {
    console.log("No input provided.");
} else {
    // Split input into array and trim whitespace
    const words = input.split(',').map(word => word.trim()).filter(word => word.length > 0);

    if (words.length === 0) {
        console.log("No valid words entered.");
    } else {
        // Find the length of the longest word
        const maxLength = Math.max(...words.map(word => word.length));

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
}
