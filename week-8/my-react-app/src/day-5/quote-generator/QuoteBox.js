// src/QuoteBox.js
import React, { Component } from 'react';
import './QuoteBox.css';
import quotes from './quotes.json';

class QuoteBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentQuoteIndex: 0,
      usedIndices: [0], // Keep track of used quotes to avoid repeats
      bgColor: this.getRandomColor(),
      textColor: this.getRandomColor(),
      buttonColor: this.getRandomColor()
    };
  }

  // Function to generate a random color
  getRandomColor = () => {
    const colors = [
      '#1abc9c', '#2ecc71', '#3498db', '#9b59b6', '#34495e',
      '#16a085', '#27ae60', '#2980b9', '#8e44ad', '#2c3e50',
      '#f1c40f', '#e67e22', '#e74c3c', '#ecf0f1', '#95a5a6',
      '#f39c12', '#d35400', '#c0392b', '#bdc3c7', '#7f8c8d'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // Function to get a new quote
  getNewQuote = () => {
    let newIndex;
    let attempts = 0;
    const maxAttempts = quotes.length * 2; // Prevent infinite loop
    
    do {
      newIndex = Math.floor(Math.random() * quotes.length);
      attempts++;
      
      // If we've used all quotes, reset the used indices
      if (this.state.usedIndices.length >= quotes.length) {
        this.setState({ usedIndices: [] });
        break;
      }
      
      // If we tried too many times, break
      if (attempts > maxAttempts) {
        break;
      }
    } while (this.state.usedIndices.includes(newIndex));
    
    // Update state with new quote and colors
    this.setState(prevState => ({
      currentQuoteIndex: newIndex,
      usedIndices: [...prevState.usedIndices, newIndex],
      bgColor: this.getRandomColor(),
      textColor: this.getRandomColor(),
      buttonColor: this.getRandomColor()
    }));
  };

  // Twitter sharing function
  shareOnTwitter = () => {
    const currentQuote = quotes[this.state.currentQuoteIndex];
    const tweetText = `"${currentQuote.quote}" - ${currentQuote.author}`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
    window.open(twitterUrl, '_blank');
  };

  componentDidMount() {
    // Initialize with a random quote
    const randomIndex = Math.floor(Math.random() * quotes.length);
    this.setState({
      currentQuoteIndex: randomIndex,
      usedIndices: [randomIndex]
    });
  }

  render() {
    const { currentQuoteIndex, bgColor, textColor, buttonColor } = this.state;
    const currentQuote = quotes[currentQuoteIndex];
    
    return (
      <div className="app-container" style={{ backgroundColor: bgColor }}>
        <div id="quote-box" className="quote-box">
          {/* Quote Text */}
          <div className="quote-text" style={{ color: textColor }}>
            <i className="fas fa-quote-left"></i>
            <span id="text">{currentQuote.quote}</span>
          </div>
          
          {/* Quote Author */}
          <div className="quote-author" style={{ color: textColor }}>
            - <span id="author">{currentQuote.author}</span>
          </div>
          
          {/* Buttons */}
          <div className="buttons">
            {/* Twitter Button */}
            <button 
              id="tweet-quote" 
              className="twitter-button"
              style={{ backgroundColor: buttonColor }}
              onClick={this.shareOnTwitter}
              title="Tweet this quote!"
            >
              <i className="fab fa-twitter"></i>
            </button>
            
            {/* New Quote Button */}
            <button 
              id="new-quote" 
              className="new-quote-button"
              style={{ backgroundColor: buttonColor }}
              onClick={this.getNewQuote}
            >
              New Quote
            </button>
          </div>
          
          {/* Footer */}
          <div className="footer">
            <p>Click "New Quote" for inspiration!</p>
          </div>
        </div>
      </div>
    );
  }
}

export default QuoteBox;