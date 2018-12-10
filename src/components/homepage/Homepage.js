import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import LoginService from '../../services/LoginService';
import TaskService from '../../services/TaskService';

import './Homepage.scss';

export default class Homepage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoggedIn: false,
        };
    }

    componentDidMount = () => {
        var token = LoginService.getToken();
        if (token) {
            console.log(`Token: ${token}`);

            // Get tasks
            TaskService.getTasks(token)
                .then(tasks => {
                    this.setState({
                        tasks: tasks,
                        isLoaded: true
                    })
                }).catch(err => {
                    console.log(err);
                });

        } else {
            // Redirect to login
            this.props.history.push('/login');
        }
    }

  render() {
    return (
      <div className="homepage">
        <h1>Hello there!</h1>
        {this.state.isLoaded ? (
            this.state.tasks.map(task => {
               return <p>{task.name} : {task.desc}</p>
            }) 
        ) : ( 
            'Loading'
        )}
      </div>
    )
  }
}
