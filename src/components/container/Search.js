//Search for artist, returns selected artist obejct//
//Is parent for Artist and SearchResults//

import React, { Component } from 'react';
import underscore from 'underscore';

import ArtistSearch from '../presentation/ArtistSearch';
import AlbumSearch from '../presentation/AlbumSearch';
import TrackSearch from '../presentation/TrackSearch';
import SearchResults from '../presentation/SearchResults';
import {SearchRequest, GeoRequest, AlbumRequest, AlbumTrackRequest, AnalysisRequest} from '../../other/Requests';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as searchActions from '../../actions/search';

class Search extends Component {
	constructor(props) {
	    super(props);
	    this.state = {// artistarray: [],
// 						albumarray: [],
// 						trackarray: [],
// 						arrayObj: [],
// 						index: -1,
// 						typeindex: -1,
// 						selectedelement: '',
// 						userinput: '',
// 						showlist: {artists: false, albums: false, tracks: false},
// 						albumobject: '',
// 						returnobject: '',
// 						market: '',
// 						type: 'artist',
// 						searched: false
		};
		this.handleChange = this.handleChange.bind(this);
		this.getAnalysis = underscore.debounce(this.getAnalysis, 100);
		this.makSearch = underscore.debounce(this.makeSearch,200);
		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.handleSearchClick = this.handleSearchClick.bind(this);
		// this.getAlbums	= this.getAlbums.bind(this);
	}
	handleChange(event){
		this.setState({userinput: event.target.value}); //control user input
		this.makeSearch();
	}
	makeSearch(){
		if (this.refs.input.value !== ''){ 
			var input = this.refs.input.value.replace("' '",'+');
			SearchRequest(input,response => this.setState({
				artistarray: response.data.artists.items,
				albumarray: response.data.albums.items, 
				trackarray: response.data.tracks.items, 
				arrayObj: {artist: response.data.artists.items, album: response.data.albums.items, track: response.data.tracks.items},
				index: -1,
				typeindex: -1,
				searched: true,
				returnobject: '',
				showlist: (() => {
					var showlist = {artists: false, albums: false, tracks: false};
					for (var property in response.data) {
	    				if (response.data.hasOwnProperty(property)) {
							response.data[property].items.length > 0 ? showlist[property] = true : showlist[property] = false;
	    				}
					}
					console.log(showlist);
					return showlist;
				})()
			}));
		}
		else{
			this.setState({artistarray: [], albumarray: [], trackarray: [], showlist: {artists: false, albums: false, tracks: false}})
		} //debounce request, set response in state
	}
	getDetails(){
		GeoRequest(
			response => {this.setState({market: response.data.country_code}, () => {
				if (this.state.selectedelement.type === 'artist'){
					AlbumRequest([this.state.selectedelement.id, this.state.market],
					response => {this.setState({returnobject:
						response, returntype: 'album'})})
					}
				else if (this.state.selectedelement.type === 'album'){
					AlbumTrackRequest(this.state.selectedelement.id,
					response => {this.setState({returnobject: response,
					returntype: 'track'})})
				}
				else if (this.state.selectedelement.type === 'track'){
					AnalysisRequest(this.state.selectedelement.id, this.props.authcode,
						response => {this.setState({returnobject: response,
						returntype: 'analysis'})})
				}
			})
		});
		this.setState({showlist: {artists: false, albums: false, tracks: false}});
	}

	handleKeyDown(event){
		if (this.state.searched){
			var index = this.state.index;
			var measure = (() => {
				var concated = [];
				for (var property in this.state.arrayObj){
					concated = concated.concat(this.state.arrayObj[property].map((obj, index) => {return [obj.type, index];}));
				}
				return concated;
			})();

			if (event.keyCode === 40 && index < measure.length-1) { //downkey
				index+=1;
				this.setState({index: index, typeindex: index === -1 ? measure[index+1][1] : measure[index][1], type: index === -1 ? measure[index+1][0] : measure[index][0]});
			}
			else if (event.keyCode === 38 && this.state.index <= measure.length && this.state.index > -1){ //upkey
				index-=1;
				this.setState({index: index, typeindex: index === -1 ? measure[index+1][1] : measure[index][1], type: index === -1 ? measure[index+1][0] : measure[index][0]});
			}
			if (event.keyCode === 13 && this.state.index > -1){
				this.setState({selectedelement: this.state.arrayObj[this.state.type][this.state.typeindex]}, () => {this.setState({userinput: this.state.selectedelement.name+' ('+this.state.selectedelement.type+')'});
					this.getDetails();
				});
			}
		}
	}

	handleSearchClick(index, type){		
		this.setState({selectedelement: this.state.arrayObj[type][index]}, () => {this.setState({userinput: this.state.selectedelement.name+' ('+this.state.selectedelement.type+')'});
		this.getDetails();
		}); //Setstate async --> callback
	}
	render(){
		var artistlist = this.state.showlist.artists ?
						<div className='listcontainer'>
							<h2>Artists</h2>
							<ul className='list'>
							{this.state.artistarray.map((artist,index) => {
								return <ArtistSearch name={artist.name}
												key={artist.id}
												index={index}
												type={artist.type}
												weight={(index === this.state.typeindex && artist.type === this.state.type) ? 400 : 'bold'}
												onSelectClick={this.handleSearchClick}
												auth={this.state.authcode}
												/>
											})}
							</ul>
						</div>: '';
						
	var albumlist = this.state.showlist.albums ?
					<div className='listcontainer'>
						<h2>Albums</h2>
						<ul className='list'>
						{this.state.albumarray.map((album,index) => {
							return <AlbumSearch name={album.name}
											key={album.id}
											index={index}
											type={album.type}
											weight={(index === this.state.typeindex && album.type === this.state.type) ? 400 : 'bold'}
											onSelectClick={this.handleSearchClick}
											auth={this.state.authcode}
											/>
										})}
						</ul>
					</div>: '';
						
	var tracklist = this.state.showlist.tracks ?
					<div className='listcontainer'>
						<h2>Tracks</h2>
						<ul className='list'>
						{this.state.trackarray.map((track,index) => {
							return <TrackSearch name={track.name}
											key={track.id}
											index={index}
											type={track.type}
											weight={(index === this.state.typeindex && track.type === this.state.type) ? 400 : 'bold'}
											onSelectClick={this.handleSearchClick}
											auth={this.state.authcode}
											/>
										})}
						</ul>
					</div>: '';
		
		return (
			<div className='searchcontainer'>
				<div className='searchbox'>
					<input type='text' ref='input'  value={this.state.userinput} onChange={this.handleChange} onKeyDown={this.handleKeyDown}/>
				</div>
				<div className='searchresults'>
					{artistlist}
					{albumlist}
					{tracklist}
					<SearchResults returnobject={this.state.returnobject} returntype={this.state.returntype} authcode={this.props.authcode}/>	

				</div>
			</div>
				
		)
	}
}


export default Search;
