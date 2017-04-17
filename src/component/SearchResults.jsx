//Takes returned artist object from Search and gets artists albums//
//Is parent for Album, Track and LoadMore //

import React, { Component } from 'react';
import AlbumResult from './AlbumResult';
import Search from './Search';
import TrackResult from './TrackResult';
import ChartParent from './ChartParent';
import {inject, observer} from 'mobx-react';
import {action} from 'mobx';
import {SearchRequest, GeoRequest, AlbumRequest, AlbumTrackRequest, AnalysisRequest} from '../other/Requests';
import injectSheet from 'react-jss';

const styles = {
	resultsContainer:{
		marginTop: '50px'
	},
	tableBody:{
		
	},
	resultTable:{
		
	}
}

@injectSheet(styles)
@inject('dataStore')
@observer 
class SearchResults extends Component {
	constructor(props){
		super(props);
		this.state = {
			trackobject: '',
			analysisobject: '',
			type: ''
			}
		this.handleItemClick = this.handleItemClick.bind(this);
		this.getData = this.getData.bind(this);
	}
	componentDidMount(){
		this.getData(this.props.id, this.props.type2)
	}
	componentDidUpdate(prevProps){
		if (this.props.id != prevProps.id){
			this.getData(this.props.id, this.props.type2)
		}
	}
	handleItemClick(id, type){
		this.getData(id, type)
		
	}
	getData(id, type){
		console.log(type)
		GeoRequest(response => {this.props.dataStore.market = response.data.country_code;
		if (type === 'album'){
			AlbumRequest([id, this.props.dataStore.market], response => {this.props.dataStore.returnObject = response; console.log(response)});
		}
		else if (type === 'track'){
			AlbumTrackRequest(id, response => {this.props.dataStore.returnObject = response});
		}
		
	})
	}
	render(){
		const {classes, children} = this.props
		let albumlist = (this.props.type2 === 'album' && this.props.dataStore.returnObject.data) ?
		<div className={classes.resultTable}>
			<div className={classes.tableBody}>
		{this.props.dataStore.returnObject.data.items.map((album) => {
										return	<AlbumResult
												onSelectClick={this.handleItemClick}
												albumname={album.name}
												artistname={album.artists[0].name}
												id={album.id}
												key={album.id}
												type1={this.props.type2}
												type2='track'
												/>
											})}
											</div>
										</div>: '';
		var tracklist= this.props.type2 === 'track' && this.props.dataStore.returnObject.data?
		<div className={classes.resultTable}>
			<div className={classes.tableBody}>
		{this.props.dataStore.returnObject.data.items.map((track) => {
										return <TrackResult
												onSelectClick={this.handleItemClick}
												trackname={track.name}
												id={track.id}
												key={track.id}
												type1={this.props.type2}
												type2='analysis'
												/>
											})}
											</div>
										</div> : '';	
		var chart = this.props.type2 === 'analysis' ? <ChartParent type1={this.props.type2} id={this.props.id} type2={this.props.type2}/>: '';
		return(
			<div>
				<div className={classes.resultsContainer} >
					{albumlist}
					{tracklist}
					{chart}
				</div>
			</div>
					
		)
	}
}
export default SearchResults;