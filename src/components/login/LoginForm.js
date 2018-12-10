import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Input, Button, Checkbox, } from 'antd';
import './LoginForm.scss';

import LoginService from '../../services/LoginService';

export default class LoginForm extends Component {
    constructor() {
        super();

        this.state = {
            email: "",
            pass: "",
            loggedIn: false
        }
    }

    onEmailChange = e => {
        this.setState({
            email: e.target.value,
        });
    }

    onPassChange = e => {
        this.setState({
            pass: e.target.value,
        });
    }

    handleRemembmerMe = e => {
        console.log('Clicked');
    }

    handleSubmit = e => {
        console.log('Clicked');
        const credentials = {
            email: this.state.email,
            password: this.state.pass
        }

        LoginService.logIn(credentials)
            .then(res => {
                console.log(res);
                // Redirect
                this.props.history.push('/');
            }).catch(err => {
                console.log(err);
                // Handle error
            });
    }

    redirectHome = () => {
        return <Redirect to="/" />
    }

    render() {
        return (
            <div className="login-form">

                {/* loggedIn ? (
                    <Redirect to="/" />
                ) : ( */}
                    <div className="form-item">
                        <h1>Log In</h1>
                    </div>
                    <div className="form-item">
                        <Input name="email" placeholder="Email" type="text" onChange={this.onEmailChange} value={this.state.email} />
                    </div>
                    <div className="form-item">
                        <Input name="password" placeholder="Password" type="password" onChange={this.onPassChange} value={this.state.pass} />
                    </div>
                    <div className="form-item">
                        <Checkbox name="remember_me" onClick={this.handleRemembmerMe} >Remember me</Checkbox>
                    </div>
                    <div className="form-item">
                        <Button type="primary" onClick={this.handleSubmit} >Submit</Button>
                    </div>
                {/* ) */}
            </div>
        )
    }
}
