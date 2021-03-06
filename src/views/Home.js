import React, { Component } from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

import LoginService from '../services/LoginService';
import TaskService from '../services/TaskService';

import TaskList from '../components/tasklist/TaskList';
import './Home.scss';

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            error: {
                isShown: false,
                msg: ''
            }
        };
    }

    componentDidMount = () => {
        var token = LoginService.getToken();
        if (token) {
            // Get tasks
            TaskService.getTasks(token)
                .then(tasks => {
                    // Update homepage with created task if exists
                    if (this.props.location.task) {
                        tasks.push(this.props.location.task);
                    }
                    this.setState({
                        tasks: tasks,
                        isLoaded: true
                    });
                }).catch(err => {
                    this.setState({
                        error: {
                            isShown: true,
                            msg: err.message
                        }
                    });
                });
        } else {
            // Redirect to login
            this.props.history.push('/login');
        }
    }

  render() {
    return (
      <div className="homepage">
        <Link className="btn-new-task" type="primary" to="/new">
            <Button type="primary">Add New</Button>
        </Link>

        { this.state.isLoaded ? <TaskList tasks={this.state.tasks} /> : 'Loading...' }
        { this.state.error.isShown && <h1 style={{color: 'red'}}>{this.state.error.msg}</h1> }
      </div>
    )
  }
}
