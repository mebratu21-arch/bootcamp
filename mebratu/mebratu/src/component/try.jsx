import React ,{Component} from 'react';


class Try extends Component{
    constructor()   
    {
        
        super();
        this.state ={
        name: "mebratu",
        age: 25,
        address: "kathmandu"
        }
    }
    handleChange = () =>
    {
        this.setState({name: "  baba"});
    }  

    render() {
        return (
            <div>
                <h1>{this.state.name}</h1>
                <h1>{this.state.age}</h1>
                <h1>{this.state.address}</h1>
                <button onClick={this.handleChange}>hey mebre click it</button>
            </div>
        );
    }
}


export default Try;