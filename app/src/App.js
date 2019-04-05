import React, { Component } from 'react';
import { Route, NavLink, withRouter } from 'react-router-dom';

import Register from './register/Register';
import Login from './login/Login';
import Users from './users/Users';

class App extends Component {
  
  render() {
    return (
      <>
        <header>
          <NavLink to="/">Home</NavLink>
          &nbsp;|&nbsp;
          <NavLink to="/login">Login</NavLink>
          &nbsp;|&nbsp;
          <NavLink to="/users">Users</NavLink>
          &nbsp;|&nbsp;
          <NavLink to="/register">Register</NavLink>
          <button onClick={this.handleLogout}>Logout</button>
        </header>
        <main>
          <Route path="/" exact component={Home} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/users" component={Users} />
        </main>
      </>
    );
  }

  handleLogout = () => {
    localStorage.removeItem('token');
    this.props.history.push('/');
  }

}

const Home = props => {
  return <h1>Home Component</h1>
}


export default withRouter(App);
