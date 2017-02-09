import React, { Component } from 'react';
import axios from 'axios';

class Analysis extends Component {
	constructor(props){
		super(props);
		this.state = {
		}
		// this.getAnalysis = this.getAnalysis.bind(this);
	}
	// getAnalysis(){
	// 	var authOptions = {
	// 	    method: 'GET',
	// 	    url: 'https://api.spotify.com/v1/audio-analysis/'+this.trackid,
	// 	    headers: {
	// 			'Accept': 'application/json',
	// 	        'Authorization': 'Basic ' + this.props.authcode,
	// 	        'Content-Type': 'application/json'
	// 	    }
	// 	};
	// 	axios(authOptions)
	// 	.then(response =>  this.setState({analysisobject: response}));//debounce request, set response in state
	}
	render(){
		
		return(
			{graph}
		)
	}
}
export default Analysis;
