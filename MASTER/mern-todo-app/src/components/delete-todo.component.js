import React, { Component } from 'react';
import axios from 'axios';

export default class DeleteTodo extends Component {

    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            todo_description: '',
            todo_responsible: '',
            todo_priority: '',
            todo_completed: false
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4000/todos/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    todo_description: response.data.todo_description,
                    todo_responsible: response.data.todo_responsible,
                    todo_priority: response.data.todo_priority,
                    todo_completed: response.data.todo_completed
                })   
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    onSubmit(e) {
        e.preventDefault();
        axios.get('http://localhost:4000/todos/delete/'+this.props.match.params.id)
            .then(res => console.log(res.data));
        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <h3 align="center">Delete this Todo?</h3>
                <form onSubmit={this.onSubmit}>
                <div className="form-group"> 
                        <label>Description: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.todo_description}
                                readonly="readonly"
                                />
                    </div>
                    <div className="form-group">
                        <label>Responsible: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={this.state.todo_responsible}
                                readonly="readonly"
                                />
                    <div className="form-group">
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input" 
                                    type="radio" 
                                    name="priorityOptions" 
                                    id="priorityLow" 
                                    value="Low"
                                    checked={this.state.todo_priority==='Low'} 
                                    readonly="readonly"
                                    />
                            <label className="form-check-label">Low</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input" 
                                    type="radio" 
                                    name="priorityOptions" 
                                    id="priorityMedium" 
                                    value="Medium" 
                                    checked={this.state.todo_priority==='Medium'} 
                                    readonly="readonly"
                                />
                                <label className="form-check-label">Medium</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input  className="form-check-input" 
                                                type="radio" 
                                                name="priorityOptions" 
                                                id="priorityHigh" 
                                                value="High" 
                                                checked={this.state.todo_priority==='High'} 
                                                readonly="readonly"
                                                />
                                        <label className="form-check-label">High</label>
                                    </div>
                                </div>
                                <div className="form-check">
                                    <input  className="form-check-input"
                                            id="completedCheckbox"
                                            type="checkbox"
                                            name="completedCheckbox"
                                            readonly="readonly"
                                            checked={this.state.todo_completed}
                                            value={this.state.todo_completed}
                                            />
                                    <label className="form-check-label" htmlFor="completedCheckbox">
                                        Completed
                                    </label>                        
                                </div>
            
                                <br />                  
                    </div>

                    <br />

                    <div className="form-group">
                        <input type="submit" value="Delete" className="btn btn-danger" />
                    </div>
                </form>
            </div>
        )
    }
}