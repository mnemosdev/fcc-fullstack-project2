'use strict';

var yelpfusion = require('yelp-fusion');

var token;
	
yelpfusion
	.accessToken(process.env.YELP_KEY, process.env.YELP_SECRET)
	.then(function(response){
		token = response.jsonBody.access_token;
		module.exports.token = token;
	})
	.catch(function(e){
		console.log('error yelp');
	})