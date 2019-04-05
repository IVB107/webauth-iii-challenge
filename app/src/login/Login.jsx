import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {
  state = {
    username: 'ivb',
    password: 'veggies'
  };

  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="username" />
            <input
              value={this.state.username}
              onChange={this.handleInputChange}
              id="username"
              type="text"
            />
          </div>
          <div>
            <label htmlFor="password" />
            <input
              value={this.state.password}
              onChange={this.handleInputChange}
              id="password"
              type="password"
            />
          </div>
          <div>
            <button type="submit">Login</button>
          </div>
        </form>
      </>
    );
  }

  handleSubmit = e => {
    e.preventDefault();
    const endpoint = 'http://localhost:5000/api/login';

    axios
      .post(endpoint, this.state)
      .then(res => {
        console.log(res);
        localStorage.setItem('token', res.data.token);
      })
      .catch(err => {
        console.log('Login Error: ', err);
      })
  }

  handleInputChange = e => {
    const { id, value } = e.target;
    this.setState({
      ...this.state,
      [id]: value
    })
  }

}

export default Login;
