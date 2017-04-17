import React, { Component } from 'react';
import ChartParent from './ChartParent';
import {SearchRequest, GeoRequest, AlbumRequest, AlbumTrackRequest, AnalysisRequest} from '../other/Requests';

 

class Chart extends Component {
	render(){
		
		return(
			<div style={{position: 'relative'}}>
				<Search/>
				<ChartParent type1={this.props.params.type1} type2={this.props.params.type2}  id={this.props.params.id} />
			</div>
		);
	}
}


export default Chart;
