//---------------------------------------------
//  Exercise 1 : Giphy API (Hilarious GIFs)
//---------------------------------------------

// API URL for hilarious gifs
const url1 = "https://api.giphy.com/v1/gifs/search?q=hilarious&rating=g&api_key=hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My";

// Fetch hilarious gifs
fetch(url1)
  .then(response => {
    if (!response.ok) throw new Error("Network problem in Exercise 1");
    return response.json();
  })
  .then(data => {
    console.log(" Exercise 1 Result:");
    console.log(data); // Full object from GIPHY
  })
  .catch(err => console.log("Exercise 1 Error:", err));


//---------------------------------------------
//  Exercise 2 : Giphy API (Sun GIFs)
// Retrieve 10 GIFs, start from offset 2
//---------------------------------------------

const url2 = "https://api.giphy.com/v1/gifs/search?q=sun&limit=10&offset=2&rating=g&api_key=hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My";

// Fetch sun gifs
fetch(url2)
  .then(response => {
    if (!response.ok) throw new Error("Network problem in Exercise 2");
    return response.json();
  })
  .then(data => {
    console.log(" Exercise 2 Result:");
    console.log(data);
  })
  .catch(err => console.log("Exercise 2 Error:", err));


//---------------------------------------------
//  Exercise 3 : Convert to Async/Await
//---------------------------------------------

async function getStarship() {
  try {
    const response = await fetch("https://www.swapi.tech/api/starships/9/");

    if (!response.ok) throw new Error("Problem fetching starship");

    const data = await response.json();

    console.log(" Exercise 3 Result:");
    console.log(data.result);
  } catch (error) {
    console.log("Exercise 3 Error:", error);
  }
}

getStarship();


//---------------------------------------------
//  Exercise 4 : Analyze the async code
//---------------------------------------------

// This function returns a promise that resolves after 2 seconds
function resolveAfter2Seconds() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('resolved');
    }, 2000);
  });
}

// Async function using await
async function asyncCall() {
  console.log('calling');      // First output
  let result = await resolveAfter2Seconds(); // Wait 2 seconds
  console.log(result);         // Output after 2 seconds
}

console.log(" Exercise 4 Output:");
asyncCall();

/*
Expected Output:

 Exercise 4 Output:
calling
(resolves 2 seconds later…)
resolved

Explanation:
1. "calling" prints immediately.
2. JS waits 2 seconds inside await.
3. After 2 sec -> prints "resolved".
*/
