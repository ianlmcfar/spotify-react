//Takes returned artist object from Search and gets artists albums//
//Is parent for Album, Track and LoadMore //

import React, { Component } from 'react';
import AlbumResult from './AlbumResult';
import TrackResult from './TrackResult';
import ChartParent from './ChartParent';
import {AnalysisRequest, AlbumTrackRequest} from '../other/Requests';


class SearchResults extends Component {
	constructor(props){
		super(props);
		this.state = {
			returnobject: '',
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
		this.setState({showalbums: false, shoetracks: true})
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
		var albumlist = this.props.returntype === 'album' && this.state.showalbums ? <ul>
		{this.props.returnobject.data.items.map((album) => {
										return	<AlbumResult 
												onSelectClick={this.handleAlbumClick}
												albumname={album.name}
												albumid={album.id}
												key={album.id}
												/>
											})}
											</ul> : '';
		var tracklistsearch = this.props.returntype === 'track' && this.state.showtracks ? <ul>
		{this.props.returnobject.data.items.map((track) => {
										return <TrackResult
												onSelectClick={this.handleTrackClick}
												trackname={track.name}
												trackid={track.id}
												key={track.id}
												/>
											})}
											</ul> : '';
		var tracklistselect = this.state.trackobject && this.state.showtracks ? <ul>
		{this.state.trackobject.data.items.map((track) => {
										return <TrackResult
												onSelectClick={this.handleTrackClick}
												trackname={track.name}
												trackid={track.id}
												key={track.id}
												/>
											})}
											</ul> : '';
		var graphsearch = this.props.returntype === 'analysis' ? <ChartParent analysisobject={this.props.returnobject}/>: '';
		var graphselect = this.state.analysisobject ? <ChartParent analysisobject={this.state.analysisobject}/>: '';
				
		return(
			<div className='searchresults'>
				{albumlist}
				{tracklistsearch}
				{tracklistselect}
				{graphsearch}
				{graphselect}
			</div>
					
		)
	}
}
export default SearchResults;

//maybe make all analysis requests here instead. need to render chart anyway