import React, { Component } from 'react';
import LoginService from '../../services/LoginService';

export default class Logout extends Component {
    componentDidMount() {
        LoginService.logOut();
        this.props.history.push('/login');
    }
    
    render() {
        return (
        <div>
            
        </div>
        )
    }
}
