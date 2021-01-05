import React from 'react';
import fire from './config/Fire';
import {NavLink} from 'react-router-dom';

class Signup extends React.Component {

constructor(props){
	super(props);
	this.signUp = this.signUp.bind(this);
	this.state = {
		error: ''
	} 
}

signUp() {
	const email = document.querySelector('#email').value;
	const password = document.querySelector('#password').value;
	fire.auth().createUserWithEmailAndPassword(email, password)
	.then((u) => {
	  console.log('Successfully Signed Up');
	  const user = fire.auth().currentUser;
	  const userId = user.uid;
	  fire.database().ref('users/' + userId).set({
	    email: user.email,
	    user_uid: user.uid,
	    avatar_link: "",
	  }, (error) => {
	    if (error) {
	      console.log("Error!");
	    } else {
	      this.setState({error: 'You succesfully signed up!'})
	    }
	  })
	})
	.catch((err) => {
	this.setState({error: err.toString()});
	})
		}


render() {
	return(

  <div className='signUp'>
  <h3>Реєстрація</h3>
  <div>
  <div>Email</div>
  <input id="email" placeholder="Your Email.." type="text"/>
  </div>
  <div>
  <div style={{marginTop: '10px'}}>Password</div>
  <input id="password" placeholder="Your password.." type="password"/>
  </div>
  <div style = {{color: 'red'}}>{this.state.error}</div>
  <NavLink to='/login'><button style={{margin: '10px'}}>Login</button></NavLink>
  <button style={{margin: '10px'}} onClick={this.signUp}>Sign up</button>
  
  </div>
		)
	}
}

export default Signup;