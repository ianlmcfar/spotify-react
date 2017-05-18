//Takes returned artist object from Search and gets artists albums//
//Is parent for Album, Track and LoadMore //

import React, { Component } from 'react';
import Search from './Search';
import AlbumTable from './AlbumTable';
import TrackTable from './TrackTable';
import ChartParent from './ChartParent';
import {inject, observer} from 'mobx-react';
import {action} from 'mobx';
import {SearchRequest, GeoRequest, AlbumRequest, AlbumTrackRequest, AnalysisRequest} from '../other/Requests';
import injectSheet from 'react-jss';

const styles = {
	resultsContainer:{
		marginTop: '50px'
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
		GeoRequest(response => {this.props.dataStore.market = response.data.country_code;
		if (type === 'album'){
			AlbumRequest([id, this.props.dataStore.market], response => {this.props.dataStore.returnObject = response; console.log(response)});
		}
		else if (type === 'track'){
			AlbumTrackRequest(id, response => {this.props.dataStore.returnObject = response;console.log(response)});
		}
		
	})
	}
	render(){
		const {classes, children} = this.props
		let albumlist = (this.props.type2 === 'album' && this.props.dataStore.returnObject.data) ? 
		
		<AlbumTable type2={this.props.type2} handleItemClick={this.handleItemClick} albumObj={this.props.dataStore.returnObject}/> : '';
		
		var tracklist= this.props.type2 === 'track' && this.props.dataStore.returnObject.data? <TrackTable type2={this.props.type2} handleItemClick={this.handleItemClick} trackObj={this.props.dataStore.returnObject}/>: '';
		
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