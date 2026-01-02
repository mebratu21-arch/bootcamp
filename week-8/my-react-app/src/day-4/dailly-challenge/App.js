import React, { Component } from 'react';
import './App.css';
import { Button, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { v4 as uuidv4 } from 'uuid';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            filteredTasks: [],
            selectedTask: null,
            editMode: false,
        };
    }

    handleAddTask = () => {
        const newTask = {
            id: uuidv4(),
            name: '',
            description: '',
            status: 'pending',
        };
        this.setState((prevState) => ({
            tasks: [newTask, ...prevState.tasks],
            filteredTasks: [newTask, ...prevState.filteredTasks],
        }));
    }

    handleEditTask = (task) => {
        this.setState({
            selectedTask: task,
            editMode: true,
        });
    }

    handleSaveTask = () => {        
        const updatedTasks = this.state.tasks.map((task) => {
            if (task.id === this.state.selectedTask.id) {
                return this.state.selectedTask;
            }
            return task;
        });
        this.setState({
            tasks: updatedTasks,
            filteredTasks: updatedTasks,
            selectedTask: null,
            editMode: false,
        });
    }

    handleDeleteTask = (taskId) => {
        const updatedTasks = this.state.tasks.filter((task) => task.id !== taskId);
        this.setState({
            tasks: updatedTasks,
            filteredTasks: updatedTasks,
        });
    }

    handleFilterTasks = (status) => {   


        if (status === 'all') {
            this.setState({ filteredTasks: this.state.tasks });
        }   
        else {
            const filteredTasks = this.state.tasks.filter((task) => task.status === status);
            this.setState({ filteredTasks });
        }
    }

    handleTaskChange = (event) => {
        const { name, value } = event.target;
        this.setState((prevState) => ({
            selectedTask: { ...prevState.selectedTask, [name]: value },
        }));
    }

    render() {
        return (
            <div>
                <Container>
                    <Row>
                        <Col>
                            <h1>Task Manager</h1>
                            <Button onClick={this.handleAddTask}>Add Task</Button>
                            <Button onClick={() => this.handleFilterTasks('all')}>All</Button>
                            <Button onClick={() => this.handleFilterTasks('pending')}>Pending</Button>
                            <Button onClick={() => this.handleFilterTasks('completed')}>Completed</Button>
                            <div>
                                {this.state.filteredTasks.map((task) => (
                                    <div key={task.id}>
                                        <h2>{task.name}</h2>
                                        <p>{task.description}</p>
                                        <p>{task.status}</p>
                                        <Button onClick={() => this.handleEditTask(task)}>Edit</Button>
                                        <Button onClick={() => this.handleDeleteTask(task.id)}>Delete</Button>
                                    </div>
                                ))}
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default App;