import moment from 'moment';

function checkAuth (){
	var targetLocation = encodeURIComponent(window.location.href)
	// const redirect = 'http://localhost:3000/'
	const redirect = 'https://ianlmcfarlane.github.io/spotifyApp/'
	const clientState = Math.random().toString(36).substring(7);
	const clientId = '476628e2d36a4316b392f1afcb3b53b1';
	
	if (window.location.href.indexOf('access_token') === -1){
		if (!localStorage.authToken || moment().isAfter(moment.utc(JSON.parse(localStorage.authToken).expireTime)) ){
			window.location = `https://accounts.spotify.com/authorize/?client_id=${clientId}&response_type=token&redirect_uri=${redirect}&state=${targetLocation}`
		}
	}
	else{
		
		const uri = window.location.href;
		const authToken = JSON.stringify({token: uri.substring(uri.indexOf('token=')+6, uri.indexOf('&token_type')), expireTime: moment().add(3600, 'seconds')})
		localStorage.setItem('authToken', authToken)
		targetLocation = decodeURIComponent(uri.substring(uri.indexOf('state=')+6))
		window.location = targetLocation
	}
	
}

export {checkAuth}