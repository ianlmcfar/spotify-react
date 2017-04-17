//Handles auth//
//Is parent for Search and SearchResults//
import React, { Component } from 'react';
import Search from './Search';
import WatchClickOutside from './WatchClickOutside';
import {inject, observer} from 'mobx-react';
import {GeoRequest} from '../other/Requests';
import injectSheet from 'react-jss';

const styles = {
	searchContainerParent:{
		position: 'absolute',
		fontFamily:'Helvetica, Arial, sans-serif'
	}
}

@injectSheet(styles)
@inject('routingStore','dataStore', 'uiStore')
@observer class App extends Component {
	constructor(props){
		super(props);
		this.handleClose = this.handleClose.bind(this);
	}
	handleClose(){
		this.props.uiStore.showList = {artists: false, albums: false, tracks: false}
	}
	render(){
		const {classes, children} = this.props
		return(
			<div className={classes.searchContainerParent}>
				<WatchClickOutside onClickOutside={this.handleClose}>
					<Search />
				</WatchClickOutside>

			</div>
		);
	}
}


export default App;
