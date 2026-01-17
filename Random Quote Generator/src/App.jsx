import { useState, useEffect } from 'react';
import './index.css';
import quotesData from './quotes.json';

const COLORS = [
  '#2c3e50', '#34495e', '#e67e22', '#d35400', '#27ae60', 
  '#16a085', '#2980b9', '#8e44ad', '#c0392b', '#1abc9c',
  '#f39c12', '#d35400', '#bdc3c7', '#7f8c8d', '#2c3e50'
];

function App() {
  const [quote, setQuote] = useState({ quote: '', author: '' });
  const [theme, setTheme] = useState({
    background: COLORS[0],
    text: COLORS[1],
    button: COLORS[2]
  });

  const getRandomItem = (arr, current) => {
    let newItem;
    do {
      newItem = arr[Math.floor(Math.random() * arr.length)];
    } while (newItem === current);
    return newItem;
  };

  const updateQuote = () => {
    const nextQuote = getRandomItem(quotesData, quote);
    
    // Choose distinct colors for variety and readability
    const bgColor = getRandomItem(COLORS, theme.background);
    let textColor = getRandomItem(COLORS, theme.text);
    let btnColor = getRandomItem(COLORS, theme.button);

    // Simplistic check to avoid same color for text and background
    while (textColor === bgColor) {
      textColor = COLORS[Math.floor(Math.random() * COLORS.length)];
    }
    while (btnColor === bgColor) {
      btnColor = COLORS[Math.floor(Math.random() * COLORS.length)];
    }
    
    setQuote(nextQuote);
    setTheme({
      background: bgColor,
      text: textColor,
      button: btnColor
    });
    
    document.body.style.backgroundColor = bgColor;
  };

  // Initialize first quote
  useEffect(() => {
    updateQuote();
  }, []);

  return (
    <div className="container">
      <h1 className="quote-header" style={{ color: theme.text }}>
        "{quote.quote}"
      </h1>
      <p className="author" style={{ color: theme.text }}>
        - {quote.author} -
      </p>
      <div className="button-container">
        <button 
          className="btn" 
          onClick={updateQuote}
          style={{ backgroundColor: theme.button }}
        >
          New quote
        </button>
      </div>
    </div>
  );
}

export default App;
