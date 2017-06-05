import axios from 'axios';
import axiosRetry from 'axios-retry';
import {checkAuth} from './checkAuth';


function SearchRequest(input, callback){
	var authOptions = {
	    method: 'GET',
	    url: 'https://api.spotify.com/v1/search?q='+input+'&type=artist,album,track&limit=5',
	    headers: {
	        'Authorization': 'Bearer ' + JSON.parse(localStorage.authToken).token,
	        'Content-Type': 'application/json'
	    }
	};
	axios(authOptions).then(callback)
}

function GeoRequest(callback){
	axios.get('https://freegeoip.net/json/')
	.then(callback);
}

function AlbumRequest(input, callback){
	var authOptions = {
	    method: 'GET',
	    url: 'https://api.spotify.com/v1/artists/'+input[0]+'/albums?limit=10&market='+input[1],
	    headers: {
	        'Authorization': 'Bearer ' + JSON.parse(localStorage.authToken).token,
	        'Content-Type': 'application/json'
	    }
	};
	axios(authOptions).then(callback)
}

function UserTracksRequest (callback){
	var authOptions = {
	    method: 'GET',
	    url: 'https://api.spotify.com/v1/me/top/tracks',
	    headers: {
	        'Authorization': 'Bearer ' + JSON.parse(localStorage.authToken).token,
	        'Content-Type': 'application/json'
	    }
	};
	axios(authOptions).then(callback)
}

function AnalysisRequest(input, callback){
	checkAuth()
	axiosRetry(axios, { retries: 3 });
	var authOptions = {
	    method: 'GET',
	    url: 'https://api.spotify.com/v1/audio-analysis/'+input,
	    headers: {
	        'Authorization': 'Bearer ' + JSON.parse(localStorage.authToken).token,
	        'Content-Type': 'application/json'
	    }
	};
	axios(authOptions).then(callback);
}
function AlbumTrackRequest(input, callback){
	var authOptions = {
	    method: 'GET',
	    url: 'https://api.spotify.com/v1/albums/'+input+'/tracks',
	    headers: {
	        'Authorization': 'Bearer ' + JSON.parse(localStorage.authToken).token,
	        'Content-Type': 'application/json'
	    }
	};
	axios(authOptions).then(callback);
}

export {GeoRequest, SearchRequest, AlbumRequest, AnalysisRequest, AlbumTrackRequest, UserTracksRequest}