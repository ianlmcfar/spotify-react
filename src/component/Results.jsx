import React, { Component } from 'react';
import SearchResults from './SearchResults';
import Search from './Search';
import WatchClickOutside from './WatchClickOutside';
import {inject} from 'mobx-react';

import {SearchRequest, GeoRequest, AlbumRequest, AlbumTrackRequest, AnalysisRequest} from '../other/Requests';
import injectSheet from 'react-jss';

const styles = {
	results:{
		fontFamily:'Helvetica, Arial, sans-serif',
		color: 'black'
	}
}
@inject('uiStore')
@injectSheet(styles)
class Results extends Component {
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
			<div className={classes.results}>
				<WatchClickOutside onClickOutside={this.handleClose}>
					<Search/>
				</WatchClickOutside>
				<SearchResults type1={this.props.params.type1} type2={this.props.params.type2}  id={this.props.params.id} />
			</div>
		);
	}
}


export default Results;
