//Takes album id and requests album tracks//
import React, { Component } from 'react';
import {Link} from 'react-router';
import injectSheet from 'react-jss';

const styles = {
	tableCol: {
		float: 'left',
		display: 'tableColumn',
		width: '250px'
	},
	tableRow:{
		width: 'auto',
		display: 'tableRow',
		clear: 'both'
	}
}

@injectSheet(styles)
class AlbumRow extends Component {
	constructor(props){
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}
	handleClick(){
		this.props.onSelectClick(this.props.id, this.props.type2);
	}
	render(){
		const {classes, children} = this.props
		return(
			<div className={classes.tableRow}>
				<Link name='results' onClick={this.handleClick} to={`/${this.props.type1}/${this.props.id}/${this.props.type2}`}>
					<div className={classes.tableCol} > 
						{this.props.album.name}
					</div>
					<div className={classes.tableCol} > 
						{this.props.album.artists.length > 1 ? this.props.album.artists.reduce((arr, curEle)=> {return [...arr, ...[' '+curEle.name]]}).toString() : '' }
					</div>
				</Link>
			</div>
		)
	}
}
export default AlbumRow;