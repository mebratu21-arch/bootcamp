// === GLOBAL VARIABLE TO TRACK CURRENT POKEMON ID ===
let currentPokemonId = null;

// === SELECTING HTML ELEMENTS ===
const img = document.getElementById("pokemon-img");
const nameTag = document.getElementById("pokemon-name");
const idTag = document.getElementById("pokemon-id");
const heightTag = document.getElementById("pokemon-height");
const weightTag = document.getElementById("pokemon-weight");
const typeTag = document.getElementById("pokemon-type");
const errorTag = document.getElementById("error");
const loadingTag = document.getElementById("loading");

// === BUTTONS ===
const btnRandom = document.getElementById("random");
const btnPrev = document.getElementById("prev");
const btnNext = document.getElementById("next");

// === FETCH POKEMON FUNCTION (ASYNC AWAIT) ===
async function fetchPokemon(id) {
    try {
        // Show loading text
        loadingTag.textContent = "Loading...";
        errorTag.textContent = "";

        // Fetch API
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

        // If API fails or no Pokémon found
        if (!response.ok) {
            throw new Error("Pokemon not found");
        }

        const data = await response.json();

        // Update global ID
        currentPokemonId = data.id;

        // Display Pokémon data
        img.src = data.sprites.front_default;
        nameTag.textContent = `Name: ${data.name}`;
        idTag.textContent = `ID: ${data.id}`;
        heightTag.textContent = `Height: ${data.height}`;
        weightTag.textContent = `Weight: ${data.weight}`;
        typeTag.textContent = `Type: ${data.types[0].type.name}`;
        loadingTag.textContent = ""; // Clear loading text

    } catch (error) {
        // When error happens → show message
        errorTag.textContent = "Oh no! That Pokemon isn’t available…";
        loadingTag.textContent = "";
    }
}

// === RANDOM BUTTON ===
btnRandom.addEventListener("click", () => {
    const randomId = Math.floor(Math.random() * 898) + 1; // Pokémon count
    fetchPokemon(randomId);
});

// === PREVIOUS BUTTON ===
btnPrev.addEventListener("click", () => {
    if (currentPokemonId > 1) {
        fetchPokemon(currentPokemonId - 1);
    }
});

// === NEXT BUTTON ===
btnNext.addEventListener("click", () => {
    fetchPokemon(currentPokemonId + 1);
});
