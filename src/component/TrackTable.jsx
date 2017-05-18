import React, {Component} from 'react';
import TrackRow from './TrackRow';
import injectSheet from 'react-jss';
const styles = {
	resultTable:{
		display: 'table'
	},
	tableBody:{
		display: 'table-row-group'
	},
	tableCell: {
		float: 'left',
		display: 'table-cell',
		width: '400px'
	},
	tableRow:{
		width: 'auto',
		display: 'table-row',
		clear: 'both'
	}
}
@injectSheet(styles)
class TrackTable extends Component {
	constructor(props){
		super(props);
		this.passSelectClick = this.passSelectClick.bind(this);
	}
	passSelectClick(id,type){
		this.props.handleItemClick(id, type)
	}
	render(){
		console.log(this.props)
		const {classes, children} = this.props;
		return(
			<div className={classes.resultTable}>
				<div className={classes.tableBody}>
					<div className={classes.tableHeader}>
						<div className={classes.tableRow}>
							<div className={classes.tableCell}>
								Track Name
							</div>
							<div className={classes.tableCell}>
								Contributors
							</div>
							<div className={classes.tableCell}>
								Duration
							</div>
						</div>
					</div>
			{this.props.trackObj.data.items.map((track) => {
											return <TrackRow
													onSelectClick={this.passSelectClick}
													track={track}
													id={track.id}
													key={track.id}
													type1={this.props.type2}
													type2='analysis'
													/>
												})}
												</div>
											</div> 
		)
	}
}
export default TrackTable;