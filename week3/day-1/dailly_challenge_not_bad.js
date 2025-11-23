// Complete solution for the "not...bad" to "good" replacement exercise

function replaceNotBad(sentence) {
    // Find the first appearance of "not" and "bad"
    const wordNot = sentence.indexOf("not");
    const wordBad = sentence.indexOf("bad");
    
    console.log(`Original sentence: "${sentence}"`);
    console.log(`Position of "not": ${wordNot}`);
    console.log(`Position of "bad": ${wordBad}`);
    
    // Check if both words exist and "bad" comes after "not"
    if (wordNot !== -1 && wordBad !== -1 && wordBad > wordNot) {
        // Replace everything from "not" to the end of "bad" with "good"
        const beforeNot = sentence.substring(0, wordNot);
        const afterBad = sentence.substring(wordBad + 3); // +3 to include the word "bad"
        const result = beforeNot + "good" + afterBad;
        
        console.log(`Replaced "not...bad" with "good"`);
        console.log(`Result: "${result}"`);
        return result;
    } else {
        console.log(`No replacement needed - returning original sentence`);
        console.log(`Result: "${sentence}"`);
        return sentence;
    }
}

// Test all the example cases
console.log("=== Testing 'Not Bad' to 'Good' Replacement ===\n");

// Test case 1
console.log("Test 1:");
replaceNotBad("The movie is not that bad, I like it");
console.log("Expected: The movie is good, I like it\n");

// Test case 2
console.log("Test 2:");
replaceNotBad("This dinner is not that bad ! You cook well");
console.log("Expected: This dinner is good ! You cook well\n");

// Test case 3
console.log("Test 3:");
replaceNotBad("This movie is not so bad !");
console.log("Expected: This movie is good !\n");

// Test case 4
console.log("Test 4:");
replaceNotBad("This dinner is bad !");
console.log("Expected: This dinner is bad !\n");

// Additional test cases
console.log("=== Additional Test Cases ===\n");

// Test case 5
console.log("Test 5:");
replaceNotBad("The weather is not bad today");
console.log("Expected: The weather is good today\n");

// Test case 6
console.log("Test 6:");
replaceNotBad("This is not exactly what I wanted, but it's not bad");
console.log("Expected: This is good\n");

// Test case 7
console.log("Test 7:");
replaceNotBad("The food is good");
console.log("Expected: The food is good\n");

// Test case 8
console.log("Test 8:");
replaceNotBad("Nothing bad happened");
console.log("Expected: Nothing bad happened\n");

// Test case 9
console.log("Test 9:");
replaceNotBad("This is bad, not good");
console.log("Expected: This is bad, not good\n");

// Test case 10
console.log("Test 10:");
replaceNotBad("not bad");
console.log("Expected: good\n");

// Function to test multiple sentences at once
function testMultipleSentences(sentences) {
    console.log("=== Batch Testing ===\n");
    
    sentences.forEach((sentence, index) => {
        console.log(`Test ${index + 1}:`);
        const result = replaceNotBad(sentence);
        console.log("---");
    });
}

// Batch test
const testSentences = [
    "The movie is not that bad, I like it",
    "This dinner is not that bad ! You cook well",
    "This movie is not so bad !",
    "This dinner is bad !",
    "The weather is not bad today",
    "This is not exactly what I wanted, but it's not bad",
    "The food is good",
    "Nothing bad happened",
    "This is bad, not good",
    "not bad"
];

testMultipleSentences(testSentences);

// Alternative implementation using regular expression
function replaceNotBadRegex(sentence) {
    console.log(`Using regex on: "${sentence}"`);
    const result = sentence.replace(/not.*?bad/, 'good');
    console.log(`Regex result: "${result}"`);
    return result;
}

// Test regex version
console.log("=== Regex Version Tests ===");
replaceNotBadRegex("This dinner is not that bad ! You cook well");
replaceNotBadRegex("This movie is not so bad !");
replaceNotBadRegex("This dinner is bad !");

// Interactive version for browser (commented out for Node.js)
/*
function interactiveVersion() {
    const userSentence = prompt("Enter a sentence containing 'not' and 'bad':");
    if (userSentence) {
        const result = replaceNotBad(userSentence);
        alert(`Original: ${userSentence}\nResult: ${result}`);
    }
}

*/

console.log("\n=== Exercise Complete ===");