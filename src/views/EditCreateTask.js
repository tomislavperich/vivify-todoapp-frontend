import React, { Component } from 'react';
import { Input, Button, Select } from 'antd';
import LoginService from '../services/LoginService';
import TaskService from '../services/TaskService';

const Option = Select.Option;

export default class EditCreateTask extends Component {
    constructor(props) {
        super(props);

        this.state = {
            action: '',
            task: '',
            error: {
                isShown: false,
                msg: ''
            }
        }
    }

    componentDidMount() {
        // Check whether to create or update task
        if (this.props.location.task) {
            var task = this.props.location.task;

            // Convert priority to string equivalent
            switch (task.priority) {
                case 0:
                    task.priority = 'low';
                    break;
                case 1:
                    task.priority = 'medium';
                    break;
                case 2:
                    task.priority = 'high';
                    break;
                case 3:
                    task.priority = 'urgent';
                    break;
                default:
                    task.priority = 'low';
            }

            this.setState({
                action: 'edit',
                task: task
            });
        } else {
            this.setState({
                action: 'create', 
                task: { 
                    priority: 'low' 
                }
            });
        }
    }

    onNameChange = e => {
        var newName = e.target.value;
        this.setState(prevState => ({
            task: {
                ...prevState.task,
                name: newName
            }
        }));
    }

    onDescChange = e => {
        var newDesc = e.target.value;
        this.setState(prevState => ({
            task: {
                ...prevState.task,
                desc: newDesc
            }
        }));
    }

    onPriorityChange = e => {
        var newPriority = e;
        this.setState(prevState => ({
            task: {
                ...prevState.task,
                priority: newPriority,
            }
        }));
    }

    handleSubmit = () => {
        let token = LoginService.getToken();
        let data = this.state.task;

        if (this.state.action === 'create') {
            this.createTask(token, data);
        } else {
            this.updateTask(token, data);
        }
    }

    createTask = (token, data) => {
        if (token) {
            TaskService.createTask(token, data.name, data.desc, data.priority)
                .catch(err => {
                    this.setState({
                        error: {
                            isShown: true,
                            msg: err.message
                        }
                    })
                });
        }

        this.props.history.push({
            pathname: '/',
            task: this.state.task
        });
    }

    updateTask = (token, data) => {
        if (token) {
            TaskService.updateTask(
                token, 
                data.id,
                data.name,
                data.desc,
                data.priority,
                data.is_checked
            ).catch(err => {
                this.setState({
                    error: {
                        isShown: true,
                        msg: err.message
                    }
                })
            });
        }

        this.props.history.push('/');
    }

    render() {
        return (
            <div className="login-form">
                <div className="form-item">
                    { this.state.action === 'create' ? <h1>New task</h1> : <h1>Edit task</h1> }
                    { this.state.error.isShown && <h1 style={{color: 'red'}}>{this.state.error.msg}</h1> }
                </div>
                <div className="form-item">
                    <Input name="name" placeholder="Name" type="text" onChange={this.onNameChange} value={this.state.task.name} />
                </div>
                <div className="form-item">
                    <Input name="desc" placeholder="Description" type="text" onChange={this.onDescChange} value={this.state.task.desc} />
                </div>
                <div className="form-item">
                    <Select defaultValue="Priority" style={{ width: 120 }}  onChange={this.onPriorityChange} value={this.state.task.priority} >
                        <Option value="low">Low</Option>
                        <Option value="medium">Normal</Option>
                        <Option value="high">High</Option>
                        <Option value="urgent">Urgent</Option>
                    </Select>
                </div>
                <div className="form-item">
                    <Button type="primary" onClick={this.handleSubmit} >Submit</Button>
                </div>
            </div>
        )
    }
}
