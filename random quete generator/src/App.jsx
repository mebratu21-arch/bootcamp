import { useState, useEffect } from 'react';
import { quotes } from './quotes';
import './App.css';

function App() {
  const [currentQuote, setCurrentQuote] = useState(quotes[0]);
  const [previousIndex, setPreviousIndex] = useState(0);
  const [colors, setColors] = useState({
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    button: '#ffffff',
    text: '#ffffff'
  });

  const generateRandomGradient = () => {
    const h1 = Math.floor(Math.random() * 360);
    const h2 = (h1 + 60) % 360;
    const s = '70%';
    const l = '45%';
    return `linear-gradient(135deg, hsl(${h1}, ${s}, ${l}) 0%, hsl(${h2}, ${s}, ${l}) 100%)`;
  };

  const getNewQuote = () => {
    let randomIndex;
    if (quotes.length > 1) {
      do {
        randomIndex = Math.floor(Math.random() * quotes.length);
      } while (randomIndex === previousIndex);
    } else {
      randomIndex = 0;
    }

    setCurrentQuote(quotes[randomIndex]);
    setPreviousIndex(randomIndex);

    setColors({
      gradient: generateRandomGradient(),
      button: '#ffffff',
      text: '#ffffff'
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`"${currentQuote.quote}" - ${currentQuote.author}`);
    alert("Copied directly to clipboard! ✨");
  };

  const shareOnX = () => {
    const text = encodeURIComponent(`"${currentQuote.quote}" - ${currentQuote.author} #Quotes #Inspiration`);
    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
  };

  useEffect(() => {
    getNewQuote();
  }, []);

  return (
    <div 
      style={{ 
        background: colors.gradient,
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'background 1.5s ease'
      }}
    >
      <div className="quote-container">
        <h1 className="quote-text" style={{ color: colors.text }}>
          {currentQuote.quote}
        </h1>
        <p className="quote-author" style={{ color: colors.text }}>
          — {currentQuote.author} —
        </p>
        <div className="button-container">
          <div className="social-buttons">
            <button className="action-btn" onClick={shareOnX} title="Share on X">
              𝕏
            </button>
            <button className="action-btn" onClick={copyToClipboard} title="Copy to Clipboard">
              📋
            </button>
          </div>
          <button 
            className="new-quote-btn"
            onClick={getNewQuote}
            style={{ color: '#333' }}
          >
            New Quote
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
