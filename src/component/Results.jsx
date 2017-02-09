import React, { Component } from 'react';
import SearchResults from './SearchResults';
import Search from './Search';

class Results extends Component {
	render(){
		return(
			<div>
				<Search/>
				<SearchResults />
			</div>
		);
	}
}


export default Results;
