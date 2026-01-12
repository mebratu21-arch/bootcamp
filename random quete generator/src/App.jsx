import { useState, useEffect } from 'react';
import { quotes } from './quotes';
import './App.css';

function App() {
  // State for current quote and previous index to prevent duplicates
  const [currentQuote, setCurrentQuote] = useState(quotes[0]);
  const [previousIndex, setPreviousIndex] = useState(0);
  const [colors, setColors] = useState({
    background: 'hsl(195, 53%, 39%)',
    text: 'hsl(220, 25%, 30%)',
    button: 'hsl(220, 25%, 30%)'
  });

  // Generate random color with good contrast
  const generateRandomColor = () => {
    const hue = Math.floor(Math.random() * 360);
    const saturation = Math.floor(Math.random() * 30) + 40; // 40-70%
    const lightness = Math.floor(Math.random() * 20) + 35; // 35-55%
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  };

  // Generate a new random quote (avoiding consecutive duplicates)
  const getNewQuote = () => {
    let randomIndex;
    
    // If there's only one quote, just use it
    if (quotes.length === 1) {
      randomIndex = 0;
    } else {
      // Keep generating until we get a different index
      do {
        randomIndex = Math.floor(Math.random() * quotes.length);
      } while (randomIndex === previousIndex);
    }

    setCurrentQuote(quotes[randomIndex]);
    setPreviousIndex(randomIndex);

    // Generate new colors
    const newBackgroundColor = generateRandomColor();
    const newTextColor = generateRandomColor();
    const newButtonColor = generateRandomColor();

    setColors({
      background: newBackgroundColor,
      text: newTextColor,
      button: newButtonColor
    });
  };

  // Set initial random colors on mount
  useEffect(() => {
    getNewQuote();
  }, []); // Empty dependency array means this runs once on mount

  return (
    <div 
      style={{ 
        backgroundColor: colors.background,
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'background-color 0.6s ease'
      }}
    >
      <div className="quote-container">
        <h1 
          className="quote-text"
          style={{ color: colors.text }}
        >
          {currentQuote.quote}
        </h1>
        <p className="quote-author">-{currentQuote.author}-</p>
        <div className="button-container">
          <button 
            className="new-quote-btn"
            onClick={getNewQuote}
            style={{ backgroundColor: colors.button }}
          >
            New quote
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
