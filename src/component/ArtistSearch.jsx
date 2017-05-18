import React, { Component } from 'react';
import {observer, inject} from 'mobx-react';
import {Link} from 'react-router';
import injectSheet from 'react-jss';

const styles = {
	itemParent:{
		fontSize: '12pt',
		color: 'black',
		height: '40px'
	},
	noWrap:{
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		whiteSpace: 'nowrap'
	},
	searchLine:{
		margin: '2 0 2 0'
	},
	leftCol:{
		float: 'left',
		width: '30px'
	},
	rightCol:{
		float: 'left',
		margin: '5 0 0 10',
		width: '190'
	},
	image:{
		width: '26px',
		height: '26px',
		margin: '2 2 2 2'
	}
}

@injectSheet(styles)
@inject('routingStore') class ArtistSearch extends Component {
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
	            <Link name='search' tabIndex='-1' style={{textDecoration: 'none', fontWeight:'normal'}} to={`/${this.props.type1}/${this.props.id}/${this.props.type2}`}>
				<li className={classes.itemParent+' '+classes.searchLine}
						onMouseOver={this.handleHover}
						style={{backgroundColor: this.props.bgcolor}}
						onClick={this.handleClick}>
						<div className={classes.leftCol}>
							<img className={classes.image} src={this.props.imageref}/>
						</div>
						<div className={classes.rightCol+' '+classes.noWrap}>
							{this.props.name}
						</div>
					</li>
				</Link>
	        );
	    }
	}
	export default ArtistSearch;