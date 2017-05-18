import React, {Component} from 'react';
import AlbumRow from './AlbumRow';
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
		width: '250px'
	},
	tableRow:{
		width: 'auto',
		display: 'table-row',
		clear: 'both'
	}
}
@injectSheet(styles)
class AlbumTable extends Component {
	constructor(props){
		super(props);
		this.passSelectClick=this.passSelectClick.bind(this)
	}
	passSelectClick(id, type){
		this.props.handleItemClick(id, type)
	}
	render(){
		const {classes, children} = this.props;
		console.log(this.props.type2)
		return(
		<div className={classes.resultTable}>
			<div className={classes.tableBody}>
				<div className={classes.tableHeader}>
					<div className={classes.tableRow}>
						<div className={classes.tableCell}>
							Album Name
						</div>
						<div className={classes.tableCell}>
							Artist
						</div>
					</div>
				</div>
		{this.props.albumObj.data.items.map((album) => {
										return	<AlbumRow
												onSelectClick={this.passSelectClick}
												album={album}
												id={album.id}
												key={album.id}
												type1={this.props.type2}
												type2='track'
												/>
											})}
											</div>
										</div>
		)
	}
}
export default AlbumTable;