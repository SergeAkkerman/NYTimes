import React, { useState } from 'react';
import {BrowserRouter, Route, NavLink} from 'react-router-dom';

class ArticlesBody extends React.Component{


render(){
	return(
<div className="Content">
    	<NavLink to= '/post'><div className="ContentRaw">CONTENT CONTENT CONTENT</div></NavLink>
    	<p>{this.props.title}</p>
    	</div>
		)
}
}
export default ArticlesBody;