import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button } from 'antd';

import LoginService from '../../services/LoginService';
import './Navbar.scss';

class Navbar extends Component {
    logOut = () => {
        LoginService.logOut();
        this.props.updateLogin();
        this.props.history.push('/login');
    }

    render() {
        return (
        <div className="navbar">
            <div className="nav-left">
                <Link className="link" to="/">Home</Link>
            </div>
            <div className="nav-right">
                { this.props.isLoggedIn ? (
                        <Button type="primary" onClick={this.logOut}>Log Out</Button> 
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

export default withRouter(Navbar);