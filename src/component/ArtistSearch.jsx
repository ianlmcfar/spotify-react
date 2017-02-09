import React, { Component } from 'react';
import {observer, inject} from 'mobx-react';
@inject('routingStore') class ArtistSearch extends Component {
	constructor(props){
		super(props);
		this.handleClick = this.handleClick.bind(this)
	}
	handleClick(){
		if (this.props.onSelectClick){
			this.props.onSelectClick(this.props.index, this.props.type);
		}
				
	}
	
	render () {
	        return(
	            <li className='name'
					style={{fontWeight: this.props.weight}}
					onClick={this.handleClick}>
				{this.props.name}			
				</li>
	        );
	    }
	}
	export default ArtistSearch;