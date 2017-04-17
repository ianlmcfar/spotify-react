import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import {Provider} from 'mobx-react';
import dataStore from './store/dataStore';
import uiStore from './store/uiStore';
import App from './component/App';
import Results from './component/Results';
import Chart from './component/Chart';

import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';
import { Router, Route, browserHistory } from 'react-router';

const routingStore = new RouterStore();

const history = syncHistoryWithStore(browserHistory, routingStore);


window.onload = () => {	
		if (window.location.href === 'http://localhost:3000/' && document.cookie.indexOf('access_token') === -1){
			var clientstate = Math.random().toString(36).substring(7);
			var clientid = '476628e2d36a4316b392f1afcb3b53b1';
			var redirect='http%3A%2F%2Flocalhost%3A3000%2F';
			window.location = `https://accounts.spotify.com/authorize/?client_id=${clientid}&response_type=token&redirect_uri=${redirect}&state=${clientstate}`;
		}
		else if (window.location.href.indexOf('access_token=') != -1){
				const querystring = window.location.href
				const access_token = querystring.substring(querystring.indexOf('token=')+6)
				var statestring = querystring.substring(querystring.indexOf('state=')+6,querystring.length);
				const now = new Date();
				now.setTime(now.getTime() + 1 * 3600 * 1000);
				document.cookie = `access_token=${access_token}; expires= ${now.toUTCString()}; path=/`;
				window.location  = 'http://localhost:3000/'
		}
		document.body.style.backgroundColor = '#e6e6e6';
		document.body.style.minHeight = '100%';
	}


ReactDOM.render(
	<AppContainer>
		<Provider dataStore={dataStore} uiStore={uiStore} routingStore={routingStore}>
			<Router history={history}>
				<Route path='/' component={App} />
				<Route name='results' path='/:type1/:id/(:type2)' component={Results}/>
			</Router>
		</Provider>
	</AppContainer>,
  document.getElementById('root')
);

