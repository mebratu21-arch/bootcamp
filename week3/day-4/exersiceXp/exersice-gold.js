// =====================================================
// EXERCISE 1 : Nested Functions
// =====================================================

//  Prediction:
// flat(4) → "____"
// mountain(4) → "/''''\\"
// flat(4) → "____"
// Final result: "____/''''\\____"
// Because each function modifies the same "result" string.

let landscape = () => {

    let result = "";

    let flat = (x) => {
        for (let i = 0; i < x; i++) {
            result += "_";
        }
    }

    let mountain = (x) => {
        result += "/";
        for (let i = 0; i < x; i++) {
            result += "'";
        }
        result += "\\";
    }

    flat(4);
    mountain(4);
    flat(4);

    return result;
};

console.log("Exercise 1 →", landscape());
// Output: ____/''''\____



// =====================================================
// EXERCISE 2 : Closure
// =====================================================

// Code:
// const addTo = x => y => x + y;
// const addToTen = addTo(10);
// addToTen(3);

// 🔮 Prediction:
// addTo(10) returns a function: y => 10 + y
// addToTen(3) → 10 + 3 = 13

const addTo = x => y => x + y;
const addToTen = addTo(10);

console.log("Exercise 2 →", addToTen(3));
// Output: 13



// =====================================================
// EXERCISE 3 : Currying
// =====================================================

const curriedSum1 = (a) => (b) => a + b;

// Prediction:
// curriedSum1(30)(1) → 30 + 1 = 31

console.log("Exercise 3 →", curriedSum1(30)(1));
// Output: 31



// =====================================================
// EXERCISE 4 : Currying with stored function
// =====================================================

const curriedSum2 = (a) => (b) => a + b;

const add5 = curriedSum2(5);

//  Prediction:
// add5(12) → 5 + 12 = 17

console.log("Exercise 4 →", add5(12));
// Output: 17



// =====================================================
// EXERCISE 5 : Composing
// =====================================================

const compose = (f, g) => (a) => f(g(a));
const add1 = (num) => num + 1;
const add5b = (num) => num + 5;

//  Prediction:
// compose(add1, add5b)(10)
// Step 1 → add5b(10) = 15
// Step 2 → add1(15) = 16

console.log("Exercise 5 →", compose(add1, add5b)(10));
// Output: 16
