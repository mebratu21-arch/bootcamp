import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import BootstrapCard from './components/BootstrapCard';
import Planets from './components/Planets';
import './App.css';

// Celebrities array for Exercise 1
const celebrities = [
  {
    title: 'Bob Dylan',
    imageUrl: 'https://miro.medium.com/max/4800/1*_EDEWvWLREzlAvaQRfC_SQ.jpeg',
    buttonLabel: 'Go to Wikipedia',
    buttonUrl: 'https://en.wikipedia.org/wiki/Bob_Dylan',
    description: 'Bob Dylan (born Robert Allen Zimmerman, May 24, 1941) is an American singer/songwriter, author, and artist who has been an influential figure in popular music and culture for more than five decades.',
  },
  {
    title: 'McCartney',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Paul_McCartney_in_October_2018.jpg/240px-Paul_McCartney_in_October_2018.jpg',
    buttonLabel: 'Go to Wikipedia',
    buttonUrl: 'https://en.wikipedia.org/wiki/Paul_McCartney',
    description: 'Sir James Paul McCartney CH MBE (born 18 June 1942) is an English singer, songwriter, musician, composer, and record and film producer who gained worldwide fame as co-lead vocalist and bassist for the Beatles.',
  }
];

// Planets array for Exercise 2
const planets = ['Mars', 'Venus', 'Jupiter', 'Earth', 'Saturn', 'Neptune'];

function App() {
  return (
    <div className="App">
      <header className="App-header container py-5">
        <h1 className="text-center mb-5">React XP Gold Exercises</h1>
        
        {/* Exercise 1: Bootstrap Cards */}
        <section className="exercise-section mb-5">
          <div className="row">
            <div className="col-12">
              <h2 className="text-primary mb-4">Exercise 1: Bootstrap Cards</h2>
              <div className="row justify-content-center">
                {/* Bob Dylan Card */}
                <div className="col-md-6 col-lg-5 mb-4">
                  <BootstrapCard
                    title={celebrities[0].title}
                    imageUrl={celebrities[0].imageUrl}
                    buttonLabel={celebrities[0].buttonLabel}
                    buttonUrl={celebrities[0].buttonUrl}
                    description={celebrities[0].description}
                  />
                </div>
                
                {/* Paul McCartney Card */}
                <div className="col-md-6 col-lg-5 mb-4">
                  <BootstrapCard
                    title={celebrities[1].title}
                    imageUrl={celebrities[1].imageUrl}
                    buttonLabel={celebrities[1].buttonLabel}
                    buttonUrl={celebrities[1].buttonUrl}
                    description={celebrities[1].description}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Exercise 2: Planets List */}
        <section className="exercise-section">
          <div className="row">
            <div className="col-12">
              <h2 className="text-success mb-4">Exercise 2: Planets List</h2>
              <Planets planets={planets} />
            </div>
          </div>
        </section>
      </header>
    </div>
  );
}

export default App;