// Array of planets with moons
const planets = [
  { name: "Mercury", color: "gray", moons: [] },
  { name: "Venus", color: "orange", moons: [] },
  { name: "Earth", color: "blue", moons: [{ name: "Moon", size: 20 }] },
  { name: "Mars", color: "red", moons: [{ name: "Phobos", size: 15 }, { name: "Deimos", size: 12 }] },
  { name: "Jupiter", color: "brown", moons: [
      { name: "Io", size: 18 }, { name: "Europa", size: 16 }, { name: "Ganymede", size: 20 }, { name: "Callisto", size: 18 }
  ] },
  { name: "Saturn", color: "gold", moons: [
      { name: "Titan", size: 20 }, { name: "Rhea", size: 15 }, { name: "Iapetus", size: 12 }, { name: "Dione", size: 10 }
  ] },
  { name: "Uranus", color: "lightblue", moons: [
      { name: "Titania", size: 16 }, { name: "Oberon", size: 15 }, { name: "Umbriel", size: 13 }, { name: "Ariel", size: 14 }
  ] },
  { name: "Neptune", color: "darkblue", moons: [
      { name: "Triton", size: 18 }, { name: "Proteus", size: 14 }, { name: "Nereid", size: 12 }
  ] }
];

const planetsSection = document.querySelector('.listPlanets');

// Create planet and its moons
function createPlanet(planet) {
  const planetDiv = document.createElement('div');
  planetDiv.classList.add('planet');
  planetDiv.style.backgroundColor = planet.color;

  const nameSpan = document.createElement('span');
  nameSpan.textContent = planet.name;
  nameSpan.style.color = 'white';
  nameSpan.style.fontWeight = 'bold';
  nameSpan.style.textShadow = '1px 1px 2px black';
  planetDiv.appendChild(nameSpan);

  planetsSection.appendChild(planetDiv);

  // Create moons
  planet.moons.forEach((moon, index) => createMoon(planetDiv, moon, index, planet.moons.length));
}

// Create a moon and position it in a circular orbit
function createMoon(planetDiv, moon, index, totalMoons) {
  const moonDiv = document.createElement('div');
  moonDiv.classList.add('moon');
  moonDiv.textContent = moon.name;
  moonDiv.style.width = `${moon.size}px`;
  moonDiv.style.height = `${moon.size}px`;

  const angle = (index / totalMoons) * 2 * Math.PI;
  const distance = 80; // distance from planet center
  const left = 50 + distance * Math.cos(angle) - moon.size / 2;
  const top = 50 + distance * Math.sin(angle) - moon.size / 2;

  moonDiv.style.position = 'absolute';
  moonDiv.style.left = `${left}%`;
  moonDiv.style.top = `${top}%`;

  planetDiv.appendChild(moonDiv);
}

// Render all planets
planets.forEach(createPlanet);
