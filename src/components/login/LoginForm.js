import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox, } from 'antd';
import './LoginForm.scss';

export default class LoginForm extends Component {
  render() {
    return (
        <div className="login-form">
            <div className="form-item">
                <h1>Log In</h1>
            </div>
            <div className="form-item">
                <Input name="email" placeholder="Email" type="text" />
            </div>
            <div className="form-item">
                <Input name="password" placeholder="Password" type="password" />
            </div>
            <div className="form-item">
                <Checkbox name="remember_me">Remember me</Checkbox>
            </div>
            <div className="form-item">
                <Button type="primary">Submit</Button>
            </div>
        </div>
    )
  }
}
