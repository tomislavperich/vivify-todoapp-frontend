import React, { Component } from 'react';
import { Input, Button, Select } from 'antd';
import LoginService from '../services/LoginService';
import TaskService from '../services/TaskService';

const Option = Select.Option;

export default class NewTask extends Component {
    constructor() {
        super();

        this.state = {
            name: '',
            desc: '',
            priority: 0,
        }
    }

    onNameChange = e => {
        this.setState({
            name: e.target.value,
        });
    }

    onDescChange = e => {
        this.setState({
            desc: e.target.value,
        });
    }

    onPriorityChange = e => {
        this.setState({
            priority: e,
        });
    }

    handleSubmit = () => {
        var token = LoginService.getToken();
        this.setState({
            token: token,
        })
        let data = this.state;
        TaskService.createTask(data.token, data.name, data.desc, data.priority);
        this.props.history.push('/');
    }

    render() {
        return (
            <div className="login-form">
                <div className="form-item">
                    <h1>New Task</h1>
                </div>
                <div className="form-item">
                    <Input name="name" placeholder="Name" type="text" onChange={this.onNameChange} value={this.state.name} />
                </div>
                <div className="form-item">
                    <Input name="desc" placeholder="Description" type="text" onChange={this.onDescChange} value={this.state.desc} />
                </div>
                <div className="form-item">
                    <Select defaultValue="Priority" style={{ width: 120 }}  onChange={this.onPriorityChange} value={this.state.priority} >
                        <Option value="0">Low</Option>
                        <Option value="1">Normal</Option>
                        <Option value="2">High</Option>
                        <Option value="3">Urgent</Option>
                    </Select>
                </div>
                <div className="form-item">
                    <Button type="primary" onClick={this.handleSubmit} >Submit</Button>
                </div>
            </div>
        )
    }
}
