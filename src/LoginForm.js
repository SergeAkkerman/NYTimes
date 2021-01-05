import React from 'react';
import fire from './config/Fire';
import { NavLink } from 'react-router-dom';
import Profile  from './Profile.js'
import firebase from "firebase/app";
import "firebase/auth";

class LoginForm extends React.Component {


constructor(props){
  super(props)
  this.state = {
    error: '',
    user_name: ''
  }
  this.loginFunc = this.loginFunc.bind(this);
  this.authListener = this.authListener.bind(this);
  this.loginForm = this.loginForm.bind(this);

  this.loginForm();
}

componentDidMount() {
  this.authListener();
  this.loginForm();
}

// showing user name when logged in
authListener() {
  fire.auth().onAuthStateChanged((user) => {
    if (user) {
      this.setState({ user });
      this.name();
      this.state.user_name ? (console.log('Your name is ' + this.state.user_name)) : 
      (this.setState({user_name: user.name}));
      this.setName();
    } else {
      this.setState({ user: null });
    }
  })
}

// getting and showing current user name
setName() {
  const uid = fire.auth().currentUser.uid;
  const email = fire.auth().currentUser.email;
  const userName = this.state.user_name;
  userName ?  (fire.database().ref('users/' + uid).update({user_name: userName})) : (console.log("Your name is " + this.state.user_name))
  this.name();      
  };

name(){
  const userId = fire.auth().currentUser.uid;
  const name = fire.database().ref('/users/' + userId).once('value').then((snapshot) => {
  const databaseName = (snapshot.val() && snapshot.val().user_name) || '';
  this.setState({user_name: databaseName.toString()});
  });
  }


// Google auth
onSubmit = () => {
fire.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
.then(() => {
var provider = new firebase.auth.GoogleAuthProvider();
fire.auth()
.signInWithPopup(provider)
.then((result) => {
  /** @type {firebase.auth.OAuthCredential} */
  var credential = result.credential;

  // This gives you a Google Access Token. You can use it to access the Google API.
  var token = credential.accessToken;
  // The signed-in user info.
  var user = result.user;
  // ...

}).catch((error) => {
  console.log(error);
});
})
}


// login with email and password
loginFunc() {
fire.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
.then(() => {
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;
  fire.auth().signInWithEmailAndPassword(email, password)
  .then((u) => {
    console.log('Successfully Logged In.');
    })
  .catch((err) => {
    this.setState({error: err.toString()});
  })
  })
}


loginForm() {
return (
  <div className='AvatarDiv'>
  <h3>Авторизація</h3>
  <div>
  <div>Email</div>
  <input id="email" placeholder="Your Email.." type="text"/>
  </div>
  <div>
  <div style={{marginTop: '10px'}}>Password</div>
  <input id="password" placeholder="Your password.." type="password"/>
  </div>
  <div style = {{color: 'red'}}>{this.state.error}</div>
  <button style={{margin: '10px'}} onClick={this.loginFunc}>Sign in</button>
  <NavLink to='/signup'><button style={{margin: '10px'}}>Sign up</button></NavLink>
  <div><img className='GoogleImg' 
  src='https://raw.githubusercontent.com/react-native-community/react-native-google-signin/HEAD/img/signin-button.png' 
  onClick={this.onSubmit} /></div>
  </div>
  )
  }


render(){
 return(
  <div>
  {this.state.user ? (<Profile />) : (this.loginForm())}
  </div>
  )
 }
}

export default LoginForm;