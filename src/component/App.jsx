//Handles auth//
//Is parent for Search and SearchResults//
import React, { Component } from 'react';
// import '../App.css';
import Search from './Search';
import {inject, observer} from 'mobx-react';
import {GeoRequest} from '../other/Requests';

window.onload = () => {	
		if (window.location.href === 'http://localhost:3000/' && document.cookie.indexOf('access_token') === -1){
			var clientstate = Math.random().toString(36).substring(7);
			var clientid = '476628e2d36a4316b392f1afcb3b53b1';
			var redirect='http%3A%2F%2Flocalhost%3A3000%2F%23redirect';
			window.location = `https://accounts.spotify.com/authorize/?client_id=${clientid}&response_type=token&redirect_uri=${redirect}&state=${clientstate}`;
		}
		else if (window.location.href.indexOf('access_token=') != -1){
				const querystring = window.location.href
				var statestring = querystring.substring(querystring.indexOf('state=')+6,querystring.length);
				const access_token = querystring.substring(querystring.indexOf('token=')+6)
				const now = new Date();
				now.setTime(now.getTime() + 1 * 3600 * 1000);
				document.cookie = `access_token=${access_token}; expires= ${now.toUTCString()}; path=/`;
				window.location  = 'http://localhost:3000/'
		}
		console.log(document.cookie)
	}


@inject('routingStore','dataStore') @observer class App extends Component {
	constructor(props){
		super(props);
		this.state = {
			albumobject: '',
			trackobject: '',
			authcode: '',
			clientstate: ''
		}
	}
	componentWillMount(){
		GeoRequest(response => {this.props.dataStore.market = response.data.country_code; console.log(response.data.country_code)})
	}
	render(){
		return(
			<div>
				<div className='search'>
					<span >{location.pathname}</span>
					<Search authcode={this.state.authcode}/>
				</div>
			</div>
		);
	}
}


export default App;
