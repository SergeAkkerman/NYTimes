import React, { Component } from 'react';
import MetaTags from 'react-meta-tags';
import fire from './config/Fire';
import Login from './Login.js';
import Header from './Header.js';
import Articles from './Articles.js';
import {BrowserRouter, Route, NavLink} from 'react-router-dom';
import './styles/App.css';
import Dropdown from './Dropdown.js';
import Profile from './Profile.js';

class App extends Component {

constructor(props) {
  super(props);
  this.state = {
    user: null,
  };

  this.authListener = this.authListener.bind(this);
}

componentDidMount() {
  this.authListener();
}

// listening if user is logged in
authListener() {
  fire.auth().onAuthStateChanged((user) => {
    if (user) {
      this.setState({ user });
    } else {
      this.setState({ user: null });
    }
  })
}

render() {
return (
  <BrowserRouter>
  <MetaTags>
  <title>NYT most popular articles</title>
  <meta name="description" content="Last most viewed posts" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  </MetaTags>
  <div className="App">
  <div className="Header">
  <div className='App-logo'>
  {<Header />}  
  </div>
  { this.state.user ? ( <Dropdown /> ) : 
  ( <NavLink to='/login'><div ><img alt="login" className='loginBtn' src='https://i.imgur.com/bWEwLGp.png' /></div>
  </NavLink> ) }
  </div>
  <Route path ='/login' exact component = {Login} />     
  <Route path='/' exact component = {Articles} />
  <Route path='/profile' exact component = {Profile} />
  </div>
  </BrowserRouter>
    );
  }
}

export default App;