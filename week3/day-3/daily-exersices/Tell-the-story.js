// Get elements
const form = document.getElementById("libform");
const storySpace = document.getElementById("story");

// BONUS: Create a shuffle button dynamically
const shuffleBtn = document.createElement("button");
shuffleBtn.textContent = "Shuffle Story";
shuffleBtn.style.marginLeft = "10px";
form.appendChild(shuffleBtn);

// Will store the last entered inputs
let lastValues = {};


// MAIN EVENT: GENERATE STORY
form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Get input values
    let noun = document.getElementById("noun").value.trim();
    let adj = document.getElementById("adjective").value.trim();
    let person = document.getElementById("person").value.trim();
    let verb = document.getElementById("verb").value.trim();
    let place = document.getElementById("place").value.trim();

    // Validation
    if (!noun || !adj || !person || !verb || !place) {
        alert("Please fill in ALL fields!");
        return;
    }

    // Save for shuffle button
    lastValues = { noun, adj, person, verb, place };

    // Create first story
    storySpace.textContent = generateStory(noun, adj, person, verb, place);
});


// STORY TEMPLATES (for shuffle)
function generateStory(noun, adj, person, verb, place) {
    const stories = [
        `${person} grabbed a ${adj} ${noun} and decided to ${verb} all the way to ${place}.`,
        `In ${place}, ${person} found a ${noun} that was extremely ${adj}. They tried to ${verb} it, but chaos followed.`,
        `The ${adj} ${noun} was missing! So ${person} had to ${verb} across ${place} to find it.`
    ];

    // Pick random story
    return stories[Math.floor(Math.random() * stories.length)];
}


// BONUS: SHUFFLE BUTTON LOGIC
shuffleBtn.addEventListener("click", function (event) {
    event.preventDefault();

    if (!lastValues.noun) {
        alert("Generate a story FIRST!");
        return;
    }

    // Use stored values
    storySpace.textContent = generateStory(
        lastValues.noun,
        lastValues.adj,
        lastValues.person,
        lastValues.verb,
        lastValues.place
    );
});
