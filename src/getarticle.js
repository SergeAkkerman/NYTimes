getArticle(){ 
    // Get article titles
function TestState(){
const [testVar, onclick] = useState(0);
const click = () => onclick(1);
return (<h1>TEST</h1>);
}

const divStyle = {
textDecoration: 'none',
borderBottom: '1px solid black',
padding: '15px',
margin: '15px',
fontFamily: 'Domine'
};


 	const mediaArr = this.state.articles.map(media => 
 		<div style={divStyle} key={media.title} id="ArticleDiv">
 		<a  style={{ color: 'black' }} onClick={this.TestState}>
 		{media.title}</a></div>);
         return mediaArr;
}




function Test() {
let [testVar, onClick] = useState(0);
const go = ()=> onClick(!testVar);
}