import { observable, computed } from 'mobx';

class dataStore {
	@observable input = ''
	@observable market = ''
	@observable responseData = {}
	@observable returnObject = {}
	@observable returnType = ''
	
	constructor(){
	}
	@computed get itemArray(){
		return [{id: false}, ...this.responseData.artists.items, ...this.responseData.albums.items, ...this.responseData.tracks.items]
	}
}
export default dataStore = new dataStore();