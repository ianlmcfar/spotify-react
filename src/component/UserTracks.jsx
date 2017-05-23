import React, { Component } from 'react';
import {inject, observer} from 'mobx-react';
import {UserTracksRequest} from '../other/Requests';
import TrackTable from './TrackTable';
import injectSheet from 'react-jss';

const styles = {
	userTracksContainer:{
		marginTop: '50px'
	}
}

@injectSheet(styles)
@inject('dataStore')
@observer
class UserTracks extends Component {
	constructor(props){
		super(props);
		this.getTracks = this.getTracks.bind(this);
	}
	componentDidMount(){
		this.getTracks()
	}
	getTracks(){
		console.log('request')
		UserTracksRequest(response => {this.props.dataStore.userTracks = response; console.log(response)})
	}
	render(){
		const {classes, children} = this.props;
		var table = this.props.dataStore.userTracks ? null : '';
		return(
			<div className={classes.userTracksContainer}>
				{table}
			</div>
		);
	}
}


export default UserTracks;
