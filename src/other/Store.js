import { autorun, obeservable } from 'mobx';

class store {
	@observable input = ''
}

var store = new store;
export default store;


autorun(() => {console.log(store.input)})