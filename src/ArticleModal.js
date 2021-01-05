import React from 'react';
import Modal from 'react-modal';
import Login from './Login.js';
import {BrowserRouter, Route, Link } from "react-router-dom";

Modal.setAppElement('#root');
class ArticleModal extends React.Component {

state = {
modalIsOpen: true
}
  render() {

    return (

<Modal className='ModalWindow' isOpen={this.state.modalIsOpen}>
<div className='Modal_content'>
<h2>Log in for a detailed view of articles</h2>
<button><Link to='/login' style={{color: 'black'}}>Sign in</Link></button>
<button onClick={() => {this.setState({modalIsOpen: false}); this.props.closeModal('/');} }>Close</button>
</div>
      <BrowserRouter>
      <Route path ='/login' exact component = {Login} />
      </BrowserRouter>
</Modal>
    );
  }
}

export default ArticleModal;