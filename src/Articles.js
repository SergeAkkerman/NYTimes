import React from 'react';
import fire from './config/Fire';
import axios from 'axios';
import ReactModal from 'react-modal';
import ArticleModal from './ArticleModal.js';

ReactModal.setAppElement('#root');
const api = axios.create({
	baseURL: 'https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=mN6Xg33Uh049lVc0uwErmOgdhb4TYBt4'
})

class Articles extends React.Component {

state = {
	user: null,
	articles: [],
	title: null,
	url: null,
	modalIsOpen: false,
	link: '',
	description: '',
	date: '',
    showModal: false
}

constructor(props){
	super(props)
	this.getArticle = this.getArticle.bind(this);
	this.authListener = this.authListener.bind(this);
	this.ArticlesBody = this.ArticlesBody.bind(this);
	this.Post = this.Post.bind(this);
}

componentDidMount(){
	api.get().then(res => {
		this.setState({ articles: res.data.results,})
	})
	this.authListener();
}

// authentification check
authListener() {
	fire.auth().onAuthStateChanged((user) => {
		if (user) {
			this.setState({ user });
		} else {
			this.setState({ user: null });
		}
	})
}




getArticle(){ 
//fetching data from API
const mediaArr = this.state.articles.map(article => 
    article.media[0] ? 
	(
    <div className = 'ArticleDiv' style={{backgroundImage: 'url(' 
    + article.media[0]['media-metadata'][2]['url'] + ')' }} key={article.title}>
    	<div className = 'textAlign'><a onClick={
    		() => this.state.user ? (
    			this.setState({
    			link: '/post', 
    			article_url: article.url, 
				title: article.title, 
    			description: article.abstract,
    			date: article.published_date,
                showModal: true,
    			url: article.media[0]['media-metadata'][2]['url']})) :
    			(this.setState({link: '/pleaselogin'}))
                }>
    		{article.title}</a></div>
    		</div>) : (console.log("error")) );
    		mediaArr.map(content => <div>{content}</div>);
    		return mediaArr;
    	}

Post () {
    return (
    // article window

    <ReactModal className='ModalWindow' isOpen={this.state.showModal} onRequestClose={this.setModalClose}>
    <div className = 'Modal_content'>
    <div className='ArticleTitle'>{this.state.title}</div>
    <img src={this.state.url}></img>
    <div><a className='ArticleInfo'>{this.state.description}</a></div>
    <div><a className='ArticleInfo'>Publish date {this.state.date}</a></div>
    <div style={{display: 'flex', justifyContent: 'space-between'}}><a className='ArticleInfo' href={this.state.article_url}>Show more...</a>
    <button onClick={()=> this.setState({link: ''})}>Close</button></div>
    </div>
    </ReactModal>
    		);
    	}

closeModal = (value) => {
    this.setState({ link: value })
}

ArticlesBody() {
    return (
        <div className="Content">
        <div className="ContentRaw">{this.getArticle()}</div>
        </div>
        )
}

render() {
	return (
	<div className="ArticlePage">
	{this.state.link === '/pleaselogin' ? (<ArticleModal closeModal={this.closeModal}/>) : (console.log(this.state.link))}
	{this.state.link === '/post' ? (this.Post()) : (console.log(this.state.link))}
	{this.ArticlesBody()}
	</div>
	   )
    }
}

export default Articles;