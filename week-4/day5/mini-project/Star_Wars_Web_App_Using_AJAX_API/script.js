// -----------------------------
// 1. GET DOM ELEMENTS
// -----------------------------
const btn = document.getElementById("btn");
const resultDiv = document.getElementById("result");

// -----------------------------
// 2. GENERATE RANDOM CHARACTER ID
// (API has characters 1–83)
// -----------------------------
function getRandomId() {
  return Math.floor(Math.random() * 83) + 1;
}

// -----------------------------
// 3. FETCH CHARACTER DATA
// -----------------------------
async function getCharacter() {
  const id = getRandomId();

  // Show loading spinner
  resultDiv.innerHTML = `
    <i class="fa-solid fa-spinner fa-spin" style="font-size:40px;"></i>
    <p>Loading character...</p>
  `;

  try {
    // Fetch main character data
    const response = await fetch(`https://www.swapi.tech/api/people/${id}`);

    if (!response.ok) throw new Error("Failed to fetch character");

    const data = await response.json();

    const character = data.result.properties;

    // Fetch homeworld URL
    const homeworldURL = character.homeworld;

    const worldRes = await fetch(homeworldURL);
    if (!worldRes.ok) throw new Error("Failed to fetch homeworld");

    const worldData = await worldRes.json();
    const homeworldName = worldData.result.properties.name;

    // Display the character
    displayCharacter(character, homeworldName);

  } catch (error) {
    // Display error message
    resultDiv.innerHTML = `
      <p class="error">❌ Error: Could not load data</p>
    `;
  }
}

// -----------------------------
// 4. DISPLAY CHARACTER IN DOM
// -----------------------------
function displayCharacter(char, homeworld) {
  resultDiv.innerHTML = `
    <h2>${char.name}</h2>
    <p><strong>Height:</strong> ${char.height} cm</p>
    <p><strong>Gender:</strong> ${char.gender}</p>
    <p><strong>Birth Year:</strong> ${char.birth_year}</p>
    <p><strong>Home World:</strong> ${homeworld}</p>
  `;
}

// -----------------------------
// 5. BUTTON EVENT LISTENER
// -----------------------------
btn.addEventListener("click", getCharacter);
