import { observable, computed } from 'mobx';
import dataStore from './dataStore';

class uiStore {
	constructor(){
	}
	@observable showList = {artists: false, albums: false, tracks: false}
}
export default uiStore = new uiStore;
