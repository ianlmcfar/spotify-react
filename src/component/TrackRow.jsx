import React, { Component } from 'react';
import {Link} from 'react-router';
import injectSheet from 'react-jss';
import moment from 'moment';


const styles = {
	tableCell: {
		float: 'left',
		display: 'table-cell',
		width: '400px',
		height: '18px'
	},
	tableRow:{
		width: 'auto',
		display: 'table-row',
		clear: 'both'
	}
}
@injectSheet(styles)
class TrackRow extends Component {
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
					<div className={classes.tableCell} > 
						{this.props.track.name}
					</div>
					<div className={classes.tableCell} > 
						{this.props.track.artists.length > 1 ? this.props.track.artists.reduce((arr, curEle)=> {return [...arr, ...[' '+curEle.name]]}).toString() : '' }
					</div>
					<div className={classes.tableCell}>
						{moment.utc(Number(this.props.track.duration_ms)).format('m:ss')}
					</div>
						
				</Link>
			</div>
		)
	}
}
export default TrackRow;
