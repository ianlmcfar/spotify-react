//Takes album id and requests album tracks//
import React, { Component } from 'react';
import {Link} from 'react-router';
import injectSheet from 'react-jss';

const styles = {
	tableRow:{

	},
	tableCell:{
		
	}
}

@injectSheet(styles)
class AlbumResult extends Component {
	constructor(props){
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}
	handleClick(){
		this.props.onSelectClick(this.props.id, this.props.type2);
	}
	render(){
		console.log('render')
		const {classes, children} = this.props
		return(
			<div className={classes.tableRow}>
				<div className={classes.tableCell} >
					<Link name='results' onClick={this.handleClick} to={`/${this.props.type1}/${this.props.id}/${this.props.type2}`}>
						{this.props.albumname}
					</Link>
				</div>
			</div>
		)
	}
}
export default AlbumResult;