//Takes returned artist object from Search and gets artists albums//
//Is parent for Album, Track and LoadMore //

import React, { Component } from 'react';
import axios from 'axios';
import AlbumResult from './AlbumResult';
import LoadMore from './LoadMore';
import TrackResult from './TrackResult';
import ChartParent from './ChartParent';


class SearchResults extends Component {
	constructor(props){
		super(props);
		this.state = {
			albumobject: '',
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
		this.getAnalysis = this.getAnalysis.bind(this);
		
	}
	getAnalysis(){
		var authOptions = {
		    method: 'GET',
		    url: 'https://api.spotify.com/v1/audio-analysis/'+this.state.selectedtrackid,
		    headers: {
		        'Authorization': 'Bearer ' + this.props.authcode,
		        'Content-Type': 'application/json'
		    }
		};
		axios(authOptions)
		.then(response => this.setState({analysisobject: response}, ()=>{console.log(this.state.analysisobject);}));//debounce request, set response in state
	}
	handleAlbumClick(albumid){
		this.setState({selectedalbumid: albumid}, () => {this.getTracks();});
		this.setState({showalbums: false})
	}
	handleTrackClick(trackid){
		this.setState({selectedtrackid: trackid}, () => {this.getAnalysis();})
		this.setState({showtracks: false})
	}

	handleButtonClick(){
		//nothing yet, will show more albums, maybe
	}
	getTracks(){
		axios.get('	https://api.spotify.com/v1/albums/'+this.state.selectedalbumid+'/tracks')
		.then(response => {this.setState({trackobject: response},  () => {console.log(this.state.trackobject)});});
	}
	render(){
		var albumlist = this.state.showalbums && this.props.albumobject ? <ul>
		{this.props.albumobject.data.items.map((album) => {
										return	<AlbumResult 
												onSelectClick={this.handleAlbumClick}
												albumname={album.name}
												albumid={album.id}
												key={album.id}
												/>
											})}
											</ul> : '';
		var tracklist = this.state.showtracks && this.state.trackobject ? <ul>
		{this.state.trackobject.data.items.map(track => {
										return <TrackResult
												onSelectClick={this.handleTrackClick}
												trackname={track.name}
												trackid={track.id}
												key={track.id}
												/>
											})}
											</ul> : '';
		var graph = this.state.analysisobject ? <ChartParent analysisobject={this.state.analysisobject}/>: '';
		return(
			<div className='searchresults'>
				{albumlist}
				{tracklist}
				{graph}
			</div>
					
		)
	}
}
export default SearchResults;