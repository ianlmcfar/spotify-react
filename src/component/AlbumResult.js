//Takes album id and requests album tracks//
import React, { Component } from 'react';

class AlbumResult extends Component {
	constructor(props){
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}
	handleClick(){
		this.props.onSelectClick(this.props.albumid);
	}
	render(){
		return(
			<li onClick={this.handleClick}>{this.props.albumname}</li>
		)
	}
}
export default AlbumResult;