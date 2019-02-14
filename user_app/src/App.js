import React, { Component } from 'react';
import Login from './components/login'
import Users from './components/users'
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state={
      user: ''
    }
  }

  passUser = (user) => {
    this.setState({user: user});
  }

  logOut = () => {
    this.setState({user: ''})
  }

  render() {
    return (
      <div className="App">
        {this.state.user==='' ? 
        <Login passUser={this.passUser}/>
        :
        <div>
          <div>
            <h2>User: {this.state.user}</h2>
            <div onClick={this.logOut}>Log out</div>
          </div>
          <Users />
        </div>
        }
      </div>
    );
  }
}

export default App;
