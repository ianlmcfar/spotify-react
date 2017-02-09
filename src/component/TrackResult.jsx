import React, { Component } from 'react';

class TrackResult extends Component {
	constructor(props){
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(){
		this.props.onSelectClick(this.props.trackid);
	}
	render(){
		return(
			<li onClick={this.handleClick}>{this.props.trackname}</li>
		)
	}
}
export default TrackResult;
