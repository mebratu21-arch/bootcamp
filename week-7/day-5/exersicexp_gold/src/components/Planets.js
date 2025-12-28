import React from 'react';

// Functional component for Planets List
function Planets(props) {
  const { planets } = props;
  
  return (
    <div className="planets-container">
      <h3 className="text-warning mb-4">Solar System Planets</h3>
      <ul className="list-group" style={{ maxWidth: '400px', margin: '0 auto' }}>
        {planets.map((planet, index) => (
          <li 
            key={index} 
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <span className="planet-name">{planet}</span>
            <span className="badge badge-primary badge-pill">
              {index + 1}
            </span>
          </li>
        ))}
      </ul>
      
      {/* Additional Bootstrap styling examples */}
      <div className="mt-4">
        <h4 className="text-info">Planet Details</h4>
        <div className="accordion" id="planetsAccordion" style={{ maxWidth: '500px', margin: '0 auto' }}>
          {planets.slice(0, 3).map((planet, index) => (
            <div className="card" key={index}>
              <div className="card-header" id={`heading${index}`}>
                <h5 className="mb-0">
                  <button 
                    className="btn btn-link" 
                    type="button" 
                    data-toggle="collapse" 
                    data-target={`#collapse${index}`}
                    aria-expanded="true" 
                    aria-controls={`collapse${index}`}
                  >
                    {planet}
                  </button>
                </h5>
              </div>
              <div 
                id={`collapse${index}`} 
                className={`collapse ${index === 0 ? 'show' : ''}`}
                aria-labelledby={`heading${index}`}
                data-parent="#planetsAccordion"
              >
                <div className="card-body">
                  {planet} is the {index + 1} planet in our solar system. 
                  {planet === 'Earth' && ' It is our home planet!'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Planets;