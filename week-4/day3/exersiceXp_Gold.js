// ===============================
// Exercise 1: Promise.all()
// ===============================

// Three values / promises
const promise1 = Promise.resolve(3); // Already resolved promise
const promise2 = 42;                 // Not a promise, treated as resolved
const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 3000, 'foo');  // Resolves with 'foo' after 3 seconds
});

// Using Promise.all
Promise.all([promise1, promise2, promise3])
  .then(values => {
    console.log("Exercise 1 output:", values); 
    // Expected output after 3 seconds: [3, 42, "foo"]
  })
  .catch(error => {
    console.error("One of the promises failed:", error);
  });

/*
Explanation Exercise 1:
- Promise.all takes an array of promises (or values) and returns a new promise.
- It waits until all promises are resolved, then resolves with an array of all resolved values.
- If any promise rejects, it immediately rejects with that error.
- Here:
  promise1 resolves immediately to 3
  promise2 is a normal value, treated as resolved
  promise3 resolves after 3 seconds with "foo"
- Result: [3, 42, "foo"]
*/

// ===============================
// Exercise 2: Analyze Promise.all()
// ===============================

function timesTwoAsync(x) {
  return new Promise(resolve => resolve(x * 2)); // Wrap x*2 in a promise
}

const arr = [1, 2, 3];
const promiseArr = arr.map(timesTwoAsync); // Convert each element to a promise

Promise.all(promiseArr)
  .then(result => {
    console.log("Exercise 2 output:", result);
    // Output: [2, 4, 6]
  });

/*
Explanation Exercise 2:
- arr.map(timesTwoAsync) produces an array of promises: [Promise(2), Promise(4), Promise(6)]
- Promise.all waits for all promises to resolve.
- Once all resolved, it returns an array of resolved values: [2, 4, 6].
- Since all promises resolve immediately, the output is [2, 4, 6].
*/

// ✅ Summary:
// - Promise.all aggregates multiple promises into one.
// - Resolves with an array of resolved values if all succeed.
// - Rejects immediately if any promise fails.
// - Normal values in the array are treated as resolved promises.
