//Handles auth//
//Is parent for Search and SearchResults//
import React, { Component } from 'react';
// import '../App.css';
import * as d3 from "d3";

class Loading extends Component {
	constructor(props){
	    super(props);
	}
	render(){
		return(
			<div style={{width:'100%', margin:'auto', textAlign:'center'}}>
			    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
			       width="120px" height="50px" viewBox="0 0 50 30" style={{enableBackground:'new 0 0 50 50'}} xmlSpace="preserve">
			      <circle cx="5" cy="0" r="5" fill="#333">
			        <animateTransform attributeType="xml"
			          attributeName="transform" type="translate"
			          values="0 0; 0 20; 0 0"
			          begin="0s" dur=".8s" repeatCount="indefinite" />
			      </circle>
			      <circle cx="15" cy="5" r="5" fill="#333">
			        <animateTransform attributeType="xml"
			          attributeName="transform" type="translate"
			          values="0 0; 0 20; 0 0"
			          begin="0.2s" dur=".8s" repeatCount="indefinite" />
			      </circle>
			      <circle cx="25" cy="5" r="5" fill="#333">
			        <animateTransform attributeType="xml"
			          attributeName="transform" type="translate"
			          values="0 0; 0 20; 0 0"
			          begin="0.4s" dur=".8s" repeatCount="indefinite" />
			      </circle>
			      <circle cx="35" cy="5" r="5" fill="#333">
			        <animateTransform attributeType="xml"
			          attributeName="transform" type="translate"
			          values="0 0; 0 20; 0 0"
			          begin="0.6s" dur=".8s" repeatCount="indefinite" />
			      </circle>

			    </svg>
			</div>
		);
	}
}


export default Loading;
