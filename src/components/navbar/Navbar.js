import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

import LoginService from '../../services/LoginService';
import './Navbar.scss';

export default class Navbar extends Component {
    constructor() {
        super();

        this.state = {
            isLoggedIn: false,
        }
    }

    componentDidMount = () => {
        var token = LoginService.getToken();
        if(token) {
            this.setState({
                isLoggedIn: true
            });
        } else {
            this.setState({
                isLoggedIn: false
            });
        }
    }

  render() {
    return (
      <div className="navbar">
        <div className="nav-left">
            <Link className="link" to="/">Home</Link>
        </div>
        <div className="nav-right">
            { this.state.isLoggedIn ? (
                    <Link className="link" to="/logout">Log Out</Link>  
                ) : (
                    <Fragment>
                        <Link className="link" to="/login">Log In</Link>
                        <Link className="link" to="/register">Sign Up</Link>
                    </Fragment>
                )
            }
        </div>
      </div>
    )
  }
}
