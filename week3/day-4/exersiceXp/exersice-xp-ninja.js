// =====================================================
// EXERCISE : Merge Words (Currying)
// =====================================================

// GOAL:
// mergeWords("There")("is")("no")("spoon.")() 
// → "There is no spoon."

// 🔮 HOW IT WORKS (Prediction & Explanation)
// --------------------------------------------
// mergeWords("There")
//   returns a function waiting for the next word.
// mergeWords("There")("is")
//   returns a function waiting again.
// mergeWords("There")("is")("no")
//   still returns a function.
// mergeWords("There")("is")("no")("spoon.")
//   still returns a function.
// mergeWords("There")("is")("no")("spoon.")()
//   empty call → return full merged string.
//
// Each call adds a new word to the growing sentence.
//
// When the function is called with NO ARGUMENT → stop and return sentence.


// =====================================================
// FINAL CURRIED SOLUTION (Arrow Function Version)
// =====================================================

const mergeWords = (word) => (next) =>
    next === undefined
        ? word
        : mergeWords(word + " " + next);


// =====================================================
// EXAMPLES
// =====================================================

console.log(mergeWords("Hello")());  
// Output → "Hello"

console.log(mergeWords("There")("is")("no")("spoon.")());
// Output → "There is no spoon."
