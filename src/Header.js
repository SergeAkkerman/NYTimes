import React from 'react';
import {NavLink} from 'react-router-dom';


class Header extends React.Component {	

	render(){
		return(
			<NavLink to="/"><img src = 'https://i.ibb.co/6Y5KQyz/new-york-times-logo.png' alt = 'logo'></img></NavLink>
			)
		}
	}

	export default Header;