import React, { useState } from 'react';
import Modal from 'react-modal';

class ModalFunc extends React.Component{

// state = {
//       modalIsOpen: true
//     }

// closeModal() {
//     this.setState({modalIsOpen: false });
//   }

render(){

		return(
			<Modal className='Modal'
			// isOpen={this.state.modalIsOpen}
			//onRequestClose={this.props.closeModal(this.state.modalIsOpen)}
			>

			<h2>Hello</h2>
			<button onClick={this.props.closeModal(false)}>close</button>
			<div>I am a modal</div>
			</Modal>
			)}
	}

	export default ModalFunc;

		