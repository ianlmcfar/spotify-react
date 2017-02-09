//Search for artist, returns selected artist obejct//
//Is parent for Artist and SearchResults//

import React, { Component } from 'react';
import {observer, inject} from 'mobx-react';
import {action} from 'mobx';
import DevTools from 'mobx-react-devtools';
import underscore from 'underscore';
import ArtistSearch from './ArtistSearch';
import AlbumSearch from './AlbumSearch';
import TrackSearch from './TrackSearch';
import SearchResults from './SearchResults';
import {SearchRequest, GeoRequest, AlbumRequest, AlbumTrackRequest, AnalysisRequest} from '../other/Requests';

@inject('dataStore', 'routingStore') @observer class Search extends Component {
	constructor(props) {
	    super(props);
		this.state={
			showList: {artists: false, albums: false, tracks: false},
			index: 0,
			input: '', 
			searched: false,
			selectedObject: {}
				}
		this.handleChange = this.handleChange.bind(this);
		this.getAnalysis = underscore.debounce(this.getAnalysis, 100);
		this.makSearch = underscore.debounce(this.handleSearch,200);
		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.handleSearchClick = this.handleSearchClick.bind(this);
		// this.getAlbums	= this.getAlbums.bind(this);
	}
	handleChange(event){
		// this.setState({input: event.target.value}, () => {this.handleSearch()});
		this.props.dataStore.input = event.target.value;
		this.handleSearch();
	}
	@action handleSearch(){
		if (this.props.dataStore.input !== ''){ 
			// var searchInput = this.state.input.replace("' '",'+');
			var searchInput = this.props.dataStore.input.replace("' '",'+');
			
			SearchRequest(searchInput,response => {
				this.props.dataStore.responseData = response.data
				this.showList()
				this.setState({searched: true});
			});
		}
	}
	showList() { //get from datastorenor import
			let list = {artists: false, albums: false, tracks: false}
			if (this.props.dataStore.responseData) {	
				for (let prop in this.props.dataStore.responseData) {
					this.props.dataStore.responseData[prop].items.length > 0 ? list[prop] = true : list[prop] = false;
				}
			}
			this.setState({showList: list});
		}
	@action getData(){
		console.log(this.state.selectedObject.type)
		if (this.state.selectedObject.type === 'artist'){
			// AlbumRequest([this.state.selectedObject.id, this.props.dataStore.market], response => {this.props.dataStore.returnObject = response; console.log(response)});
			AlbumRequest([this.state.selectedObject.id, this.props.dataStore.market], response => {this.props.dataStore.returnObject = response});
			this.props.dataStore.returnType = 'album'
		}
		else if (this.state.selectedObject.type === 'album'){
			AlbumTrackRequest(this.state.selectedObject.id, response => {this.props.dataStore.returnObject = response});
			this.props.dataStore.returnType = 'track'
			
		}
		else if (this.state.selectedObject.type === 'track'){
			AnalysisRequest(this.state.selectedObject.id, this.props.dataStore.authcode, response => {this.props.dataStore.returnObject = response})
			this.props.dataStore.returnType = 'analysis'
			
		}
	}

	@action handleKeyDown(event){
		const {location, push, goBack } = this.props.routingStore;
		
		if (this.state.searched){
			let index = this.state.index
			if (event.keyCode === 40 && index < this.props.dataStore.itemArray.length-1) { //downkey
				index+=1;
			}
			else if (event.keyCode === 38  && index > 0){ //upkey
				index-=1;				
			}
			if (event.keyCode === 13 && index > 0){ //enter key
				// this.setState({ input: `${this.state.selectedObject.name} ( ${this.state.selectedObject.type})`}, () => {this.getData(); push('/results')});
				this.setState({ input: `${this.state.selectedObject.name} ( ${this.state.selectedObject.type})`}, () => {this.getData(); push('/results')});
				this.props.dataStore.input = `${this.selectedObject.name} ( ${this.state.selectedObject.type})`
			}
			this.setState({index: index, selectedObject: this.props.dataStore.itemArray[index]});
		}
	}

	handleSearchClick(index, type){//fix so that data can be passed back through provider
		const {location, push, goBack } = this.props.routingStore;
		// this.setState({selectedObject: this.props.dataStore.responseData[type].items[index]},
		// 	() => this.setState({ input: `${this.state.selectedObject.name} ( ${this.state.selectedObject.type})`},
		// 	() => {this.getData(); push('/results')}))
			
		this.setState({selectedObject: this.props.dataStore.responseData[type].items[index]},
			() => {this.getData(); push('/results')})
		this.props.dataStore.input = `${this.state.selectedObject.name} ( ${this.state.selectedObject.type})`
		
	} //Setstate async --> callback
	render(){
		console.log(this.state.input);
		
		var artistlist = this.state.showList.artists ?
						<div className='listcontainer'>
							<h2>Artists</h2>
							<ul className='list'>
							{this.props.dataStore.responseData['artists'].items.map((artist,index) => {
								return <ArtistSearch name={artist.name}
												key={artist.id}
												index={index}
												type='artists'
												weight={(artist.id === this.state.selectedObject.id) ? 400 : 'bold'}
												onSelectClick={this.handleSearchClick}
												/>
											})}
							</ul>
						</div>: '';

	var albumlist = this.state.showList.albums ?
					<div className='listcontainer'>
						<h2>Albums</h2>
						<ul className='list'>
						{this.props.dataStore.responseData['albums'].items.map((album,index) => {
							return <AlbumSearch name={album.name}
											key={album.id}
											index={index}
											type='albums'
											weight={(album.id === this.state.selectedObject.id) ? 400 : 'bold'}
											onSelectClick={this.handleSearchClick}
											/>
										})}
						</ul>
					</div>: '';
					
	var tracklist = this.state.showList.tracks ?
					<div className='listcontainer'>
						<h2>Tracks</h2>
						<ul className='list'>
						{this.props.dataStore.responseData['tracks'].items.map((track,index) => {
							return <TrackSearch name={track.name}
											key={track.id}
											index={index}
											type='tracks'
											weight={(track.id === this.state.selectedObject.id) ? 400 : 'bold'}
											onSelectClick={this.handleSearchClick}
											/>
										})}
						</ul>
					</div>: '';
		
		return (
			<div className='searchcontainer'>
				<div className='searchbox'>
					<input type='text' ref='input'  value={this.props.dataStore.input} onChange={this.handleChange} onKeyDown={this.handleKeyDown}/>
				</div>
				<div className='searchresults'>
					{artistlist}
					{albumlist}
					{tracklist}

				</div>
			</div>
				
		)
	}
}


export default Search;
