import { observable, computed } from 'mobx';

class dataStore {
	@observable market = ''
	@observable input = ''
	@observable responseData = {}
	@observable returnObject = {}
	@observable returnType = ''
	@observable selectedObject = {}
	@observable analysisObject = {}	
	constructor(){
	}
	@computed get itemArray(){
		return [{id: false}, ...this.responseData.artists.items, ...this.responseData.albums.items, ...this.responseData.tracks.items]
	}
}
export default dataStore = new dataStore();