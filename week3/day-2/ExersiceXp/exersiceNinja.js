/************************************************************
 * NINJA LEVEL — WEEK 3 DAY 2 (Correct Version)
 ************************************************************/


// ----------------------------------------------------------
// Exercise 1 – Sum all numbers divisible by 3 or 5
// ----------------------------------------------------------
function sumDivisible(numbers) {
    let sum = 0;

    for (let num of numbers) {
        if (num % 3 === 0 || num % 5 === 0) {
            sum += num;
        }
    }
    return sum;
}



// ----------------------------------------------------------
// Exercise 2 – Remove vowels from a string
// ----------------------------------------------------------
function removeVowels(text) {
    return text.replace(/[aeiou]/gi, "");
}



// ----------------------------------------------------------
// Exercise 3 – Find second largest number in an array
// ----------------------------------------------------------
function secondLargest(arr) {
    const nums = arr.filter(n => typeof n === "number");

    if (nums.length < 2) return null;

    let max = -Infinity;
    let second = -Infinity;

    for (let num of nums) {
        if (num > max) {
            second = max;
            max = num;
        } else if (num > second && num !== max) {
            second = num;
        }
    }

    return second === -Infinity ? null : second;
}



// ----------------------------------------------------------
// Exercise 4 – Reverse each word in a sentence
// ----------------------------------------------------------
function reverseWords(sentence) {
    return sentence
        .split(" ")
        .map(word => [...word].reverse().join(""))
        .join(" ");
}



// ----------------------------------------------------------
// Exercise 5 – Count how many arrays contain a specific item
// ----------------------------------------------------------
function countArraysContaining(arrays, value) {
    let count = 0;
    for (let sub of arrays) {
        if (Array.isArray(sub) && sub.includes(value)) {
            count++;
        }
    }
    return count;
}



// ----------------------------------------------------------
// Exercise 6 – Flatten a nested array (Ninja)
// ----------------------------------------------------------
function flattenArray(arr) {
    const result = [];

    for (let item of arr) {
        if (Array.isArray(item)) {
            result.push(...flattenArray(item)); // recursion
        } else {
            result.push(item);
        }
    }

    return result;
}



// ----------------------------------------------------------
// EXPORTS (for testing / Node.js)
// ----------------------------------------------------------
if (typeof module !== "undefined") {
    module.exports = {
        sumDivisible,
        removeVowels,
        secondLargest,
        reverseWords,
        countArraysContaining,
        flattenArray
    };
}
