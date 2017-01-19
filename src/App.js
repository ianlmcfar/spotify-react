//Handles auth//
//Is parent for Search and SearchResults//
import React, { Component } from 'react';
import '../App.css';
import Search from './components/container/Search';

class App extends Component {
	constructor(props){
		super(props);
		this.state = {
			albumobject: '',
			trackobject: '',
			authcode: '',
			clientstate: ''
		}
	this.handleAlbumRequest = this.handleAlbumRequest.bind(this);
		
	}
	componentWillMount(){
		const clientstate = Math.random().toString(36).substring(7);
		const clientid = '476628e2d36a4316b392f1afcb3b53b1';
		const redirect='http%3A%2F%2Flocalhost%3A3000%2F%23redirect';
		if (window.location.hash.indexOf('access_token') === -1) {
			window.location = 'https://accounts.spotify.com/authorize/?client_id='+clientid+'&response_type=token&redirect_uri='+redirect+'&state='+clientstate;
		}
		const querystring = String(window.location);		
		const statestring = querystring.substring(querystring.indexOf('state=')+6,querystring.length);	
		console.log('clientstate: '+statestring);
		console.log('access token: '+querystring.substring(querystring.indexOf('token=')+6,querystring.indexOf('&token')));
		this.setState({authcode: querystring.substring(querystring.indexOf('token=')+6,querystring.indexOf('&token'))});
	}
	handleAlbumRequest(object){
		this.setState({albumobject: object.data});
	}
	render(){
		return(
			<div>
				<div className='search'>
					<Search authcode={this.state.authcode} onRequest={this.handleAlbumRequest}/>
				</div>

			</div>
		);
	}
}


export default App;
