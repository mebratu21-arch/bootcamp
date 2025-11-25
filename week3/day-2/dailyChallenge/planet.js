// Get container
const planetsSection = document.querySelector('.listPlanets');

// Planet & Moon Classes
class Moon {
  constructor(name, size) {
    this.name = name;
    this.size = size;
  }

  render(parent, index, totalMoons) {
    const moonDiv = document.createElement('div');
    moonDiv.classList.add('moon');
    moonDiv.textContent = this.name;
    moonDiv.style.width = `${this.size}px`;
    moonDiv.style.height = `${this.size}px`;

    // Position in circular orbit
    const angle = (index / totalMoons) * 2 * Math.PI;
    const distance = 60 + index * 20; // Spread moons
    const left = 50 + distance * Math.cos(angle) - this.size / 2;
    const top = 50 + distance * Math.sin(angle) - this.size / 2;

    moonDiv.style.position = 'absolute';
    moonDiv.style.left = `${left}px`;
    moonDiv.style.top = `${top}px`;

    parent.appendChild(moonDiv);
  }
}

class Planet {
  constructor(name, color, moons = []) {
    this.name = name;
    this.color = color;
    this.moons = moons.map(m => new Moon(m.name, m.size));
  }

  render() {
    const planetDiv = document.createElement('div');
    planetDiv.classList.add('planet');
    planetDiv.style.backgroundColor = this.color;
    planetDiv.style.width = '100px';
    planetDiv.style.height = '100px';
    planetDiv.style.borderRadius = '50%';
    planetDiv.style.position = 'relative';
    planetDiv.style.margin = '20px';

    const nameSpan = document.createElement('span');
    nameSpan.classList.add('planet-name');
    nameSpan.textContent = this.name;

    planetDiv.appendChild(nameSpan);
    planetsSection.appendChild(planetDiv);

    // Render moons
    this.moons.forEach((moon, index) => moon.render(planetDiv, index, this.moons.length));
  }
}

// Planets data
const planetsData = [
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

// Render all planets
planetsData.forEach(data => new Planet(data.name, data.color, data.moons).render());
