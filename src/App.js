import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import LoginService from './services/LoginService';
import Navbar from './components/navbar/Navbar';
import Home from './views/Home';
import Login from './views/Login';
import NewTask from './views/NewTask';
import './styles/App.scss';

class App extends Component {
  constructor() {
    super();

    var token = LoginService.getToken();

    this.state = {
      isLoggedIn: Boolean(token),
    }
  }

  updateLogin() {
    console.log('Function ran');
    this.setState({isLoggedIn: !this.state.isLoggedIn})
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Fragment>
            <Navbar isLoggedIn={this.state.isLoggedIn} updateLogin={() => this.updateLogin()} />
            <Route exact path="/" component={Home} />
            <Route path="/login" component={() => <Login updateLogin={() => this.updateLogin()} />} />
            <Route path="/new" component={NewTask} />
          </Fragment>
        </Router>
      </div>
    );
  }
}

export default App;
