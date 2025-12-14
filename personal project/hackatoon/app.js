// DOM elements
const searchInput = document.getElementById("search");
const filterRegion = document.getElementById("filterRegion");
const sortOption = document.getElementById("sortOption");
const countriesContainer = document.getElementById("countriesContainer");
const modal = document.getElementById("modal");
const modalBody = document.getElementById("modalBody");
const closeModal = document.getElementById("closeModal");
const toggleTheme = document.getElementById("toggleTheme");

// Global data
let countries = [];

// Load preferences from LocalStorage
let preferences = JSON.parse(localStorage.getItem("prefs")) || {
  search: "",
  region: "",
  sort: "",
  theme: "light"
};

// Apply saved preferences
searchInput.value = preferences.search;
filterRegion.value = preferences.region;
sortOption.value = preferences.sort;
if(preferences.theme === "dark") document.body.classList.add("dark");

// Toggle dark/light mode
toggleTheme.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  preferences.theme = document.body.classList.contains("dark") ? "dark" : "light";
  localStorage.setItem("prefs", JSON.stringify(preferences));
});

// Fetch countries from REST API
async function fetchCountries() {
  try {
    const res = await fetch("https://restcountries.com/v3.1/all?fields=name,region,population,capital,subregion,flags,languages.");
    const data = await res.json();
    countries = data.map(c => ({
      name: c.name.common,
      region: c.region,
      population: c.population,
      capital: c.capital ? c.capital[0] : "N/A",
      subregion: c.subregion || "N/A",
      flag: c.flags.png,
      languages: c.languages ? Object.values(c.languages).join(", ") : "N/A"
    }));
    applyFilters();
  } catch(err) {
    countriesContainer.innerHTML = "<p>Failed to fetch countries.</p>";
    console.error(err);
  }
}

// Render countries
function renderCountries(list) {
  countriesContainer.innerHTML = "";
  if(list.length === 0){
    countriesContainer.innerHTML = "<p>No countries found.</p>";
    return;
  }
  list.forEach(c => {
    const div = document.createElement("div");
    div.classList.add("country-card");
    div.innerHTML = `
      <h3>${c.name}</h3>
      <p>Region: ${c.region}</p>
      <p>Population: ${c.population.toLocaleString()}</p>
    `;
    div.addEventListener("click", () => showDetails(c));
    countriesContainer.appendChild(div);
  });
}

// Show modal with country details
function showDetails(country){
  modalBody.innerHTML = `
    <h2>${country.name}</h2>
    <img src="${country.flag}" alt="${country.name} Flag">
    <p><strong>Region:</strong> ${country.region}</p>
    <p><strong>Subregion:</strong> ${country.subregion}</p>
    <p><strong>Capital:</strong> ${country.capital}</p>
    <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
    <p><strong>Languages:</strong> ${country.languages}</p>
  `;
  modal.style.display = "block";
}

// Close modal
closeModal.addEventListener("click", () => modal.style.display = "none");
window.addEventListener("click", (e) => {
  if(e.target == modal) modal.style.display = "none";
});

// Filter, search, sort
function applyFilters(){
  let filtered = [...countries];
  
  if(preferences.search) filtered = filtered.filter(c => c.name.toLowerCase().includes(preferences.search.toLowerCase()));
  if(preferences.region) filtered = filtered.filter(c => c.region === preferences.region);

  switch(preferences.sort){
    case "nameAsc": filtered.sort((a,b)=> a.name.localeCompare(b.name)); break;
    case "nameDesc": filtered.sort((a,b)=> b.name.localeCompare(a.name)); break;
    case "popAsc": filtered.sort((a,b)=> a.population - b.population); break;
    case "popDesc": filtered.sort((a,b)=> b.population - a.population); break;
  }

  renderCountries(filtered);
}

// Save preferences
function savePreferences(){
  localStorage.setItem("prefs", JSON.stringify(preferences));
}

// Event listeners
searchInput.addEventListener("input", e=>{
  preferences.search = e.target.value;
  savePreferences();
  applyFilters();
});
filterRegion.addEventListener("change", e=>{
  preferences.region = e.target.value;
  savePreferences();
  applyFilters();
});
sortOption.addEventListener("change", e=>{
  preferences.sort = e.target.value;
  savePreferences();
  applyFilters();
});

// Initial fetch
fetchCountries();
