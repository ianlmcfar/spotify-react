import { observable, computed } from 'mobx';
import dataStore from './dataStore';

class uiStore {
	constructor(){
	}
	@observable input = ''
	@observable typeindex = ''
	@observable searched = ''
	@observable selecteditem = ''
	@observable returnObject = ''
	@observable selectedObject = ''

}
export default uiStore = new uiStore;
