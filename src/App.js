import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navbar from './components/navbar/Navbar';
import Homepage from './components/homepage/Homepage';
import LoginForm from './components/login/LoginForm';
import Logout from './components/logout/Logout';
import './styles/App.scss';

class App extends Component {
  constructor() {
    super();

    this.state = {
      loggedIn: "false"
    }
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Fragment>
            <Navbar />
            <Route exact path="/" component={Homepage} />
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
          </Fragment>
        </Router>
      </div>
    );
  }
}

export default App;
