import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import {Provider} from 'mobx-react';
import dataStore from './store/dataStore';
import uiStore from './store/uiStore';
import App from './component/App';
import Results from './component/Results';
import Chart from './component/Chart';
import {checkAuth} from './other/checkAuth';

import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';
import { Router, Route, hashHistory } from 'react-router';
const routingStore = new RouterStore();

const hist = syncHistoryWithStore(hashHistory, routingStore);


window.onload = () => {
	checkAuth()
	document.body.style.backgroundColor = '#e6e6e6';
	document.body.style.minHeight = '1000px';
	document.body.style.overflow = 'hidden';
}
ReactDOM.render(
	<AppContainer>
		<Provider dataStore={dataStore} uiStore={uiStore} routingStore={routingStore}>
			<Router history={hist}>
				<Route name='app' path='/' component={App} />
				<Route name='results' path='/:type1/:id/(:type2)' component={Results}/>
			</Router>
		</Provider>
	</AppContainer>,
  document.getElementById('root')
);

