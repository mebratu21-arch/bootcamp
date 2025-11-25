// -----------------------------
// XP GOLD – Exercise 1
// -----------------------------
// Convert an array to a sentence (without the last comma)

function arrayToSentence(arr) {
  if (!Array.isArray(arr)) return "";
  const last = arr.pop();
  return `${arr.join(", ")} and ${last}`;
}

console.log(arrayToSentence(["apple", "banana", "mango"]));
// Output: apple, banana and mango



// -----------------------------
// XP GOLD – Exercise 2
// -----------------------------
// Remove duplicate values from an array

function removeDuplicates(arr) {
  return [...new Set(arr)];
}

console.log(removeDuplicates([1, 2, 2, 3, 4, 4, 5]));
// Output: [1, 2, 3, 4, 5]



// -----------------------------
// XP GOLD – Exercise 3
// -----------------------------
// Find the longest word in a sentence

function longestWord(sentence) {
  const words = sentence.split(" ");
  let longest = "";

  for (let word of words) {
    if (word.length > longest.length) longest = word;
  }
  return longest;
}

console.log(longestWord("I love JavaScript so much"));
// Output: JavaScript



// -----------------------------
// XP GOLD – Exercise 4
// -----------------------------
// DOM – Change background color on click

function changeColor() {
  const box = document.getElementById("box");
  if (!box) return;

  box.addEventListener("click", () => {
    box.classList.toggle("active");
  });
}



// -----------------------------
// XP GOLD – Exercise 5
// -----------------------------
// DOM – Add li items dynamically

function addListItem(text) {
  const ul = document.getElementById("list");
  if (!ul) return;

  const li = document.createElement("li");
  li.textContent = text;
  ul.appendChild(li);
}



// -----------------------------
// EXPORT (ignore if not using Node.js)
// -----------------------------
if (typeof module !== "undefined") {
  module.exports = {
    arrayToSentence,
    removeDuplicates,
    longestWord,
    changeColor,
    addListItem
  };
}
