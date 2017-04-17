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
import injectSheet from 'react-jss';
import {browserHistory} from 'react-router';

const styles = {
	searchContainer:{
		position: 'absolute',
		left: '0', top: '0', right: '0', 
		zIndex: '9999', 
		width: '250px',
		margin: '10 0 0 10'
	},
	listContaner:{
	},
	
	searchBox:{
		width: 'inherit'
	},
	input:{
		WebkitBorderRadius: '10px',
		MozBorderRadius: '5px',
		borderRadius: '5px',
		width: 'inherit'
	},
	searchResults:{
		borderStyle: 'solid',
		borderWidth: '.5px',
		backgroundColor: 'white',
		width: 'inherit'
	},
	searchList:{
		listStyleType: 'none',
		margin: '0 3 0 10', 
		WebkitPaddingStart: '0',
		
	},
	searchHeader:{
		margin: '5 3 5 7',
		fontSize: '18'
	}
}

function isFalse(item){
	return item === false
}

@injectSheet(styles)
@inject('dataStore', 'uiStore', 'routingStore')
@observer class Search extends Component {
	constructor(props) {
	    super(props);
		this.state={
			index: 0,
			input: this.props.dataStore.input,
			searchInput: '',
			searched: false}
		this.handleChange = this.handleChange.bind(this);
		this.getAnalysis = underscore.debounce(this.getAnalysis, 100);
		this.makSearch = underscore.debounce(this.handleSearch,200);
		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.handleSearchClick = this.handleSearchClick.bind(this);
		this.handleHover = this.handleHover.bind(this);
	}
	handleChange(event){
		this.setState({input: event.target.value}, () => {this.handleSearch()});
	}
	@action handleSearch(){
		if (this.state.input !== ''){ 
			this.setState({searchInput: this.state.input})
			var searchInput = this.state.input.replace("' '",'+');
			SearchRequest(searchInput,response => {
				this.props.dataStore.responseData = response.data
				this.props.dataStore.input = this.state.input
				this.showList()
				this.setState({searched: true});
			});
		}
		else{
			this.props.uiStore.showList = {artists: false, albums: false, tracks: false}
		}
	}
	showList() {
		let list = {artists: false, albums: false, tracks: false}
			if ((this.state.input != '' && this.props.dataStore.responseData) ) {	
				for (let prop in this.props.dataStore.responseData) {
					this.props.dataStore.responseData[prop].items.length > 0 ? list[prop] = true : list[prop] = false;
				}				
			}
			this.props.uiStore.showList = list;
	}
	@action handleKeyDown(event){
		// const {location, push, goBack } = this.props.routingStore;
		console.log(this.state.searched)
		if (true){
			let index = this.state.index
			if (event.keyCode === 40 && index < this.props.dataStore.itemArray.length-1) { //downkey
				index+=1;
			}
			else if (event.keyCode === 38  && index > 0){ //upkey
				index-=1;				
			}
			if (event.keyCode === 13 && index > 0){ //enter key
				this.props.dataStore.selectedObject = this.props.dataStore.itemArray[index]
				this.props.uiStore.showList = {artists: false, albums: false, tracks: false};
				let type1 = this.props.dataStore.selectedObject.type, type2
				switch(type1){
					case 'artist':
						type2 = 'album'
						break;
					case 'album':
						type2 = 'track'
						break;
					case 'track':
						type2 = 'analysis'
						break;
				}
				browserHistory.push(`/${this.props.dataStore.selectedObject.type}/${this.props.dataStore.selectedObject.id}/${type2}`);
			}
			this.setState({index: index});
		}
	}
	@action handleHover(id){
		this.setState({index: this.props.dataStore.itemArray.map((e)=>{return e.id;}).indexOf(id)});
	}

	@action handleSearchClick(index, type1){
		this.props.dataStore.selectedObject = this.props.dataStore.responseData[type1+'s'].items[index]
		this.props.uiStore.showList = {artists: false, albums: false, tracks: false}
		
	} //Setstate async --> callback

	render(){
		const {classes, children} = this.props
		var artistlist = this.props.uiStore.showList.artists ?
						<div name='search' className={classes.listContainer}>
							<div name='search' className={classes.searchHeader}>Artists</div>
							<ul className={classes.searchList}>
							{this.props.dataStore.responseData['artists'].items.map((artist,index) => {
								return <ArtistSearch name={artist.name}
												key={artist.id}
												id={artist.id}
												imageref={artist.images.length > 0 ? artist.images[0].url: 'https://image.flaticon.com/icons/svg/49/49097.svg'}
												index={index}
												type1='artist'
												type2='album'
												bgcolor={artist.id === this.props.dataStore.itemArray[this.state.index].id ? '#C0C0C0' : 'white'}
												onSelectClick={this.handleSearchClick}
												onHover={this.handleHover}
												/>
											})}
							</ul>
						</div>: '';

	var albumlist = this.props.uiStore.showList.albums ?
					<div className={classes.listContainer}>
						<div className={classes.searchHeader}>Albums</div>
						<ul className={classes.searchList}>
						{this.props.dataStore.responseData['albums'].items.map((album,index) => {
							return <AlbumSearch name={album.name}
											key={album.id}
											id={album.id}
											imageref={album.images.length > 0 ? album.images[0].url: 'https://image.flaticon.com/icons/svg/49/49097.svg'}
											index={index}
											artistname={album.artists.reduce((string, artist, index)=>{
												if (index != 0){return string +', '+artist.name;}
												else{return string;}}, album.artists[0].name)}
											type1='album'
											type2='track'
											bgcolor={album.id === this.props.dataStore.itemArray[this.state.index].id ? '#C0C0C0' : 'white'}
											onSelectClick={this.handleSearchClick}
											onHover={this.handleHover}
											
											/>
										})}
						</ul>
					</div>: '';
					
	var tracklist = this.props.uiStore.showList.tracks ?
					<div className={classes.listContainer}>
						<div className={classes.searchHeader}>Tracks</div>
						<ul className={classes.searchList}>
						{this.props.dataStore.responseData['tracks'].items.map((track,index) => {
							return <TrackSearch name={track.name}
											key={track.id}
											id={track.id}
											index={index}
											artistname={track.artists.reduce((string, artist, index)=>{
												if (index != 0){return string +', '+artist.name;}
												else{return string;}}, track.artists[0].name)}
											type1='track'
											type2='analysis'
											bgcolor={track.id === this.props.dataStore.itemArray[this.state.index].id ? '#C0C0C0' : 'white'}
											onSelectClick={this.handleSearchClick}
											onHover={this.handleHover}
											
											/>
										})}
						</ul>
					</div>: '';		
		return (
			<div onClick={this.handleFocusClick} name='search' className={classes.searchContainer} >
				<div name='search' className={classes.searchBox}>
					<input name='search' className={classes.input} type='text' ref='input' onClick={this.showList.bind(this)} value={this.state.input} onChange={this.handleChange} onKeyDown={this.handleKeyDown}/>
				</div>
				<div name='search' className={classes.searchResults} style={{'borderStyle': [this.props.uiStore.showList.artists, this.props.uiStore.showList.tracks, this.props.uiStore.showList.albums].every(isFalse) ? 'none' : 'solid'}}>
					{artistlist}
					{albumlist}
					{tracklist}
				</div>
			</div>
				
		)
	}
}


export default Search;
