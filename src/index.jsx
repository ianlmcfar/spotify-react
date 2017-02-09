import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import {Provider} from 'mobx-react';
import dataStore from './store/dataStore';
import App from './component/App';
import Results from './component/Results';

import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';
import { Router, Route, browserHistory } from 'react-router';

const routingStore = new RouterStore();

const history = syncHistoryWithStore(browserHistory, routingStore);

ReactDOM.render(
	<AppContainer>
		<Provider dataStore={dataStore} routingStore={routingStore}>
			<Router history={history}>
				<Route path='/' component={App} />
				<Route path='/results' component={Results} />
			</Router>
		</Provider>
	</AppContainer>,
  document.getElementById('root')
);

