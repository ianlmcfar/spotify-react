//Takes returned artist object from Search and gets artists albums//
//Is parent for Album, Track and LoadMore //

import React, { Component } from 'react';
import AlbumResult from './AlbumResult';
import Search from './Search';
import TrackResult from './TrackResult';
import ChartParent from './ChartParent';
import {inject, observer} from 'mobx-react';
import {AnalysisRequest, AlbumTrackRequest} from '../other/Requests';


@inject('dataStore') @observer class SearchResults extends Component {
	constructor(props){
		super(props);
		this.state = {
			trackobject: '',
			showalbums: true,
			showtracks: true,
			selectedalbumid: '',
			selectedtrackid: '',
			analysisobject: ''
			}
		this.handleAlbumClick = this.handleAlbumClick.bind(this);
		this.handleTrackClick = this.handleTrackClick.bind(this);
		this.getTracks = this.getTracks.bind(this);		
	}
	handleAlbumClick(albumid){
		this.setState({selectedalbumid: albumid}, () => {this.getTracks();});
		this.setState({showalbums: false, showtracks: true})
	}
	handleTrackClick(trackid){
		this.setState({selectedtrackid: trackid}, () => {AnalysisRequest(this.state.selectedtrackid, this.props.authcode, response => {console.log(response); this.setState({analysisobject: response})} )})
		this.setState({showtracks: false});
	}

	handleButtonClick(){
		//nothing yet, will show more albums, maybe
	}
	getTracks(){
		AlbumTrackRequest(this.state.selectedalbumid, response => {this.setState({trackobject: response, showtracks: true});});
	}
	render(){
		console.log('resultsrender')
		var albumlist = this.props.dataStore.returnType === 'album' && this.state.showalbums && this.props.dataStore.returnObject.data ? <ul>
		{this.props.dataStore.returnObject.data.items.map((album) => {
										return	<AlbumResult 
												onSelectClick={this.handleAlbumClick}
												albumname={album.name}
												albumid={album.id}
												key={album.id}
												/>
											})}
											</ul> : '';
		var tracklistsearch = this.props.dataStore.returnType === 'track' && this.state.showtracks && this.props.dataStore.returnObject.data? <ul>
		{this.props.dataStore.returnObject.data.items.map((track) => {
										return <TrackResult
												onSelectClick={this.handleTrackClick}
												trackname={track.name}
												trackid={track.id}
												key={track.id}
												/>
											})}
											</ul> : '';
		var tracklistselect = this.state.trackobject && this.state.showtracks ? <ul>
		{this.state.dataStore.trackobject.data.items.map((track) => {
										return <TrackResult
												onSelectClick={this.handleTrackClick}
												trackname={track.name}
												trackid={track.id}
												key={track.id}
												/>
											})}
											</ul> : '';
		var graphsearch = this.props.dataStore.returnType === 'analysis' ? <ChartParent analysisobject={this.props.dataStore.returnObject}/>: '';
		var graphselect = this.state.analysisobject ? <ChartParent analysisobject={this.state.analysisobject}/>: '';
				
		return(
			<div>
				<div className='searchresults'>
					{albumlist}
					{tracklistsearch}
					{tracklistselect}
					{graphsearch}
					{graphselect}
				</div>
			</div>
					
		)
	}
}
export default SearchResults;

//maybe make all analysis requests here instead. need to render chart anyway