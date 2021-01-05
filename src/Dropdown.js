import React, { useState } from 'react';
import fire from './config/Fire';
import {NavLink} from 'react-router-dom';

class Dropdown extends React.Component {

constructor(props) {
  super(props);
  this.pathToAvatar = this.pathToAvatar.bind(this);
  this.state = {
  avatar_link: this.databaseAvatarLink,
  }; 
}

//fetching avatar data from firebase
pathToAvatar(){
const userId = fire.auth().currentUser.uid;
fire.database().ref('/users/' + userId).once('value').then((snapshot) => {
const defaultAvatar = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png'
const databaseAvatarLink = (snapshot.val() && snapshot.val().avatar_link); 
databaseAvatarLink ? (this.setState({avatar_link: databaseAvatarLink.toString()})) : (this.setState({avatar_link: defaultAvatar}));
  });
}

componentDidMount(){
  this.pathToAvatar();
}

render() {

function   logout() {
fire.auth().signOut();
}

function Navbar(props){
return(
  <nav className="navbar">
  <div className="navbar-nav">{ props.children }</div>
  </nav>
  )
}

function App(props){ 
return (
  <Navbar>
  <NavItem icon= <img alt = "Avatar" className='Avatar' src= {props} />>
  <div onClick = {logout}><a className='Login' style = {{ color: 'black'}}>Logout</a></div>
  <NavLink to='/profile' className='Login'><div>Profile</div></NavLink>
  </NavItem>
  </Navbar>
  );
}

function NavItem(props){
const [open, setOpen] = useState(false);
return(

<a className="icon-button" onClick = {()=> setOpen(!open)}>
{props.icon}

{open && props.children}
</a>
  )
}

return (
<div className='AvatarDiv'>
{App(this.state.avatar_link)}   
</div>
    )
  }
}


export default Dropdown;
