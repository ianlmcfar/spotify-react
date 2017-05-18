import React, { Component } from 'react';
import {Link} from 'react-router';
import injectSheet from 'react-jss';

const styles = {
	itemParent:{
		fontSize: '12pt',
		color: 'black'
	},
	itemChild:{
		fontSize: '7pt',
		margin: '3px 0px 3px 3px',
		color: 'gray'
	},
	noWrap:{
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		whiteSpace: 'nowrap'
	},
	searchLine:{
		margin: '2px 0px 2px 0px',
		height: '40px'
	},
	leftCol:{
		float: 'left',
		width: '30px'
	},
	rightCol:{
		float: 'left',
		margin: '0px 0px 0px 10px',
		width: '190px'
	},
	image:{
		width: '26px',
		height: '26px',
		margin: '2px 2px 2px 2px'
	}
}

@injectSheet(styles)
class AlbumSearch extends Component {
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
	            <Link name='albumDetail' tabIndex='-1' style={{textDecoration: 'none', fontWeight:'normal'}} to={`/${this.props.type1}/${this.props.id}/${this.props.type2}`}>
		            <li className={classes.searchLine}
						onMouseOver={this.handleHover}
						style={{backgroundColor: this.props.bgcolor}}
						onClick={this.handleClick}>
						<div className={classes.leftCol}>
							<img className={classes.image} src={this.props.imageref}/>
						</div>
						<div className={classes.rightCol+' '+classes.rightCol+' '+classes.noWrap}>
							<div className={classes.itemParent+' '+classes.noWrap}>{this.props.name}</div>
							<div className={classes.itemChild+' '+classes.noWrap}>{this.props.artistname}</div>
						</div>

					</li>
				</Link>
	        );
	    }
	}
	export default AlbumSearch;