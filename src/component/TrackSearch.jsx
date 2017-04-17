import React, { Component } from 'react';
import {Link} from 'react-router';
import injectSheet from 'react-jss';

const styles = {
	itemParent:{
		fontSize: '14',
		color: 'black'
	},
	itemChild:{
		fontSize: '10',
		margin: '3 0 3 3',
		color: 'gray'
	},
	noWrap:{
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		whiteSpace: 'nowrap'
	},
	searchLine:{
		backgroundColor: '#D3D3D3',
		margin: '2 0 2 0',
		height: '40px'
	}
}

@injectSheet(styles)
class TrackSearch extends Component {
	constructor(props){
		super(props);
		this.handleClick = this.handleClick.bind(this)
		this.handleHover = this.handleHover.bind(this)
		
	}
	handleClick(){
		if (this.props.onSelectClick){
			this.props.onSelectClick(this.props.index, this.props.type1, this.props.type2);
		}		
	}
	handleHover(){
		this.props.onHover(this.props.id)
	}
	
	render () {
		const {classes, children} = this.props
	        return(
	            <Link name='results' tabIndex='-1' style={{textDecoration: 'none', fontWeight:'normal'}} to={`/${this.props.type1}/${this.props.id}/${this.props.type2}`}>
		            <li className={classes.searchLine}
						onMouseOver={this.handleHover}
						style={{backgroundColor: this.props.bgcolor}}
						onClick={this.handleClick}>
					<div className={classes.itemParent+' '+classes.noWrap}>{this.props.name}</div>
					<div className={classes.itemChild+' '+classes.noWrap}>{this.props.artistname}</div>		
							
					</li>
				</Link>
	        );
	    }
	}
	export default TrackSearch;