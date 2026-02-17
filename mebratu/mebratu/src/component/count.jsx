import React, { Component} from 'react';

class Count extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        }   
    }
    handleIncrement = () => {
        this.setState({
            count: prev => prev + 1,
            });
    }
    handleDecrement = () => {
        this.setState({
            count: prev => prev - 1,
            });
    }

    render() {
        return (
            <div>
                <h1>{this.state.count}</h1>
                <button onClick={this.handleIncrement}>+</button>
                <button onClick={this.handleDecrement}>-</button>
            </div>
        );
    }
};

export default Count;