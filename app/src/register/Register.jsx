import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';


class Register extends Component {
  state = {
    username: '',
    password: '',
    department: ''
  }

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
              placeholder="username"
            />
          </div>
          <div>
            <label htmlFor="password" />
            <input
              value={this.state.password}
              onChange={this.handleInputChange}
              id="password"
              type="password"
              placeholder="password"
            />
          </div>
          <div>
            <label htmlFor="department" />
            <input
              value={this.state.department}
              onChange={this.handleInputChange}
              id="department"
              type="department"
              placeholder="department"
            />
          </div>
          <div>
            <button type="submit">Register</button>
          </div>
        </form>
      </>
    );
  }
  
  handleSubmit = e => {
    e.preventDefault();
    const endpoint = 'http://localhost:5000/api/register';
    
    axios
    .post(endpoint, this.state)
    .then(res => {
      console.log(res);
      localStorage.setItem('token', res.data.token);
      this.props.history.push('/users');
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

export default withRouter(Register);