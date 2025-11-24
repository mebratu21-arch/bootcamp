// Array of planets with their properties including moons
const planets = [
    {
        name: "Mercury",
        color: "gray",
        moons: 0
    },
    {
        name: "Venus",
        color: "orange",
        moons: 0
    },
    {
        name: "Earth",
        color: "blue",
        moons: [
            { name: "Moon", size: 30 }
        ]
    },
    {
        name: "Mars",
        color: "red",
        moons: [
            { name: "Phobos", size: 20 },
            { name: "Deimos", size: 15 }
        ]
    },
    {
        name: "Jupiter",
        color: "brown",
        moons: [
            { name: "Io", size: 25 },
            { name: "Europa", size: 22 },
            { name: "Ganymede", size: 28 },
            { name: "Callisto", size: 26 }
        ]
    },
    {
        name: "Saturn",
        color: "gold",
        moons: [
            { name: "Titan", size: 27 },
            { name: "Rhea", size: 20 },
            { name: "Iapetus", size: 18 },
            { name: "Dione", size: 17 }
        ]
    },
    {
        name: "Uranus",
        color: "lightblue",
        moons: [
            { name: "Titania", size: 24 },
            { name: "Oberon", size: 22 },
            { name: "Umbriel", size: 19 },
            { name: "Ariel", size: 20 }
        ]
    },
    {
        name: "Neptune",
        color: "darkblue",
        moons: [
            { name: "Triton", size: 26 },
            { name: "Proteus", size: 20 },
            { name: "Nereid", size: 17 }
        ]
    }
];

// Get the section where we'll add the planets
const planetsSection = document.querySelector('.listPlanets');

// Function to create a planet with its moons
function createPlanet(planetData) {
    // Create planet div
    const planetDiv = document.createElement('div');
    planetDiv.classList.add('planet');
    planetDiv.style.backgroundColor = planetData.color;
    
    // Create planet name element
    const planetName = document.createElement('span');
    planetName.textContent = planetData.name;
    planetName.style.color = 'white';
    planetName.style.fontWeight = 'bold';
    planetName.style.textShadow = '1px 1px 2px black';
    planetDiv.appendChild(planetName);
    
    // Add the planet to the section
    planetsSection.appendChild(planetDiv);
    
    // Create moons for this planet
    if (planetData.moons && planetData.moons.length > 0) {
        planetData.moons.forEach((moon, index) => {
            createMoon(planetDiv, moon, index, planetData.moons.length);
        });
    }
}

// Function to create a moon and position it around its planet
function createMoon(planetDiv, moonData, moonIndex, totalMoons) {
    const moonDiv = document.createElement('div');
    moonDiv.classList.add('moon');
    moonDiv.textContent = moonData.name;
    moonDiv.style.width = `${moonData.size}px`;
    moonDiv.style.height = `${moonData.size}px`;
    
    // Calculate position in a circular orbit
    const angle = (moonIndex / totalMoons) * 2 * Math.PI;
    const distance = 80; // Distance from planet center
    const left = 50 + distance * Math.cos(angle) - moonData.size / 2;
    const top = 50 + distance * Math.sin(angle) - moonData.size / 2;
    
    moonDiv.style.left = `${left}%`;
    moonDiv.style.top = `${top}%`;
    
    // Add the moon to the planet
    planetDiv.appendChild(moonDiv);
}

// Create all planets
planets.forEach(planet => {
    createPlanet(planet);
});