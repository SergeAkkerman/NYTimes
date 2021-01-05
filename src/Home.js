import React from 'react';
import fire from './config/Fire';
import {BrowserRouter, Route, NavLink} from 'react-router-dom';

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.pathToAvatar = this.pathToAvatar.bind(this);
    this.state = {
    avatar_link: this.databaseAvatarLink,
    };
    
}

  logout() {
    fire.auth().signOut();
  }

//ДОБАВИТЬ УСЛОВИЕ: ЕСЛИ В БАЗЕ ЕССТЬ ССЫЛКА, ВСТАВЛЯТЬ ЕЕ, ЕСЛИ НЕТ ТО ВСТАВЛЯТЬ СТАНДАРТНУЮ
pathToAvatar(){
const userId = fire.auth().currentUser.uid;
fire.database().ref('/users/' + userId).once('value').then((snapshot) => {
const databaseAvatarLink = (snapshot.val() && snapshot.val().avatar_link) || "Error!";
this.setState({avatar_link: databaseAvatarLink.toString()});
});
}

componentDidMount(){
this.pathToAvatar();
}

 render() {

    return (
      <div className='AvatarDiv'>
        <img className='Avatar' src= {this.state.avatar_link} />
        <p><button onClick = {this.logout}>Logout</button></p>
        <p><NavLink to='/login'><button>Profile</button></NavLink></p>
      </div>
    )
  }
}


export default Home;