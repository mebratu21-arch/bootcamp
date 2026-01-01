import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      serverMessage: '',
      postResponse: '',
      inputValue: ''
    };
  }

  // Part I: Fetch message from server on component mount
  async componentDidMount() {
    try {
      const response = await fetch('http://localhost:3001/api/hello');
      const data = await response.json();
      this.setState({ serverMessage: data.message });
    } catch (error) {
      console.error('Error fetching data:', error);
      this.setState({ serverMessage: 'Failed to load message from server' });
    }
  }

  // Handle input change
  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value });
  }

  // Part II: Handle form submission
  handleSubmit = async (e) => {
    e.preventDefault();
    const { inputValue } = this.state;
    
    if (!inputValue.trim()) {
      alert('Please enter something');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/api/world', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input: inputValue })
      });

      const data = await response.json();
      this.setState({ 
        postResponse: data.message,
        inputValue: '' // Clear input after submission
      });
    } catch (error) {
      console.error('Error posting data:', error);
      this.setState({ postResponse: 'Failed to send data to server' });
    }
  }

  render() {
    const { serverMessage, postResponse, inputValue } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          {/* Part I: Display message from GET request */}
          <h1>{serverMessage}</h1>
          
          {/* Part II: Form for POST request */}
          <div className="form-container">
            <h2>Send Data to Server</h2>
            <form onSubmit={this.handleSubmit}>
              <input
                type="text"
                value={inputValue}
                onChange={this.handleInputChange}
                placeholder="Type something..."
                className="form-input"
              />
              <button type="submit" className="submit-btn">
                Submit
              </button>
            </form>
            
            {/* Display response from POST request */}
            {postResponse && (
              <div className="response-message">
                <h3>Server Response:</h3>
                <p>{postResponse}</p>
              </div>
            )}
          </div>
        </header>
      </div>
    );
  }
}

export default App;