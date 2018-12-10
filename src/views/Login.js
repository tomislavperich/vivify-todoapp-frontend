import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Input, Button, Checkbox, } from 'antd';
import './Login.scss';

import LoginService from '../services/LoginService';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            pass: "",
            error: {
                shown: false,
                msg: ''
            }
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
        const credentials = {
            email: this.state.email,
            password: this.state.pass
        }

        LoginService.logIn(credentials)
            .then(res => {
                // Redirect
                this.props.updateLogin();
                console.log(this.props)
                this.props.history.push('/');
            }).catch(err => {
                var msg;
                switch (err.response.status) {
                    case 401:
                        msg = "Invalid email or password, please try again";
                        break;
                    default:
                        break;
                }
                this.setState({
                    error: {
                        shown: true,
                        msg: msg,
                    }
                });
            });
    }

    render() {
        return (
            <div className="login-form">
                <div className="form-item">
                    <h1>Log In</h1>
                </div>
                {this.state.error.shown ? (
                    <h1 style={{color: 'red', fontSize: '1em'}}>{this.state.error.msg}</h1>
                ) : ''}
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
            </div>
        )
    }
}

export default withRouter(Login);