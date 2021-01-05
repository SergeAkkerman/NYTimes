import React from 'react';
import fire from './config/Fire';
import { createBrowserHistory } from "history";
import { Router } from 'react-router-dom';

class Profile extends React.Component {

constructor(props) {
super(props);
this.state = {
avatar_link: '',
user_name: '', 
};
this.Greeting =this.Greeting.bind(this);
}

componentDidMount() {
this.nameAndAvatar();
}

logout = () => {
fire.auth().signOut();
window.location.reload();
const customHistory = createBrowserHistory();
customHistory.push('/');
return(
    <Router history={customHistory} />
    )
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

// show name and avatar
nameAndAvatar(){
    const defaultAvatar = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png'
    const userId = fire.auth().currentUser.uid;
    const AvaLink = fire.database().ref('/users/' + userId).once('value').then((snapshot) => {
    const databaseAvatarLink = (snapshot.val() && snapshot.val().avatar_link) || '';
    const databaseName = (snapshot.val() && snapshot.val().user_name) || '';
    databaseAvatarLink ? (this.setState({avatar_link: databaseAvatarLink.toString()})) : (this.setState({avatar_link: defaultAvatar})); 
    databaseName && this.setState({user_name: databaseName.toString()});
    });
    }

// change avatar
setAvatarLink() {
    const uid = fire.auth().currentUser.uid;
    const userAvatarLink = prompt('Link to your avatar');
    userAvatarLink && fire.database().ref('users/' + uid).update({avatar_link: userAvatarLink})
    this.nameAndAvatar();      
    };

// change mane
ChangeName() {
    const uid = fire.auth().currentUser.uid;
    const userName = prompt('Your name');
    userName &&  (fire.database().ref('users/' + uid).update({user_name: userName}))
    this.nameAndAvatar();      
    };


Greeting(){
    return(
        this.state.user_name && (<h1>Hello, {this.state.user_name}</h1>)
            )
            }

 render() {

    return (
      <div style={{textAlign: 'center'}}>

       {this.Greeting()}
        <img alt = "logout" style = {{maxHeight: '10vw', padding: '2vw'}} src= {this.state.avatar_link} />
        <div><button style={{margin: '0.5vw'}} onClick = {this.logout}>Logout</button>
        <button  style={{margin: '0.5vw'}} onClick = {this.setAvatarLink.bind(this)}>Change Avatar</button>
        <button style={{margin: '0.5vw'}} onClick = {this.ChangeName.bind(this)}>What is your name?</button></div>
      </div>
    )
  }
}


export default Profile;