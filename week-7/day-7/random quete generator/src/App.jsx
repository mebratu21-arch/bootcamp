import { useState, useEffect } from 'react';
import './App.css';
import { quotes } from './quotes';

const colors = [
  '#16a085',
  '#27ae60',
  '#2c3e50',
  '#f39c12',
  '#e74c3c',
  '#9b59b6',
  '#FB6964',
  '#342224',
  '#472E32',
  '#BDBB99',
  '#77B1A9',
  '#73A857'
];

function App() {
  const [quote, setQuote] = useState({ quote: '', author: '' });
  const [color, setColor] = useState('#16a085');

  const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

  const getNewQuote = () => {
    let newQuote = getRandomItem(quotes);
    // Ensure we don't show the same quote twice in a row
    while (newQuote.quote === quote.quote) {
      newQuote = getRandomItem(quotes);
    }
    setQuote(newQuote);
    
    let newColor = getRandomItem(colors);
    // Ensure text is readable/different or just random
    setColor(newColor);
  };

  useEffect(() => {
    getNewQuote();
  }, []);

  return (
    <div className="App" style={{ backgroundColor: color, color: color }}>
      <div id="quote-box">
        <div className="quote-text">
          <i className="fa fa-quote-left"></i>
          <span id="text">"{quote.quote}"</span>
        </div>
        <div className="quote-author">
          - <span id="author">{quote.author}</span>
        </div>
        <div className="buttons">
          <button
            id="new-quote"
            className="button"
            style={{ backgroundColor: color }}
            onClick={getNewQuote}
          >
            New quote
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
