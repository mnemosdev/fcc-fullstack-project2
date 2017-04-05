'use strict';

var yelpfusion = require('yelp-fusion');

module.exports = function(app){
    var yelp = require('../config/yelp.js');
    
    app.route('/search/:location')
        .get(function(req, res){
            var client = yelpfusion.client(yelp.token);
            client.search({
              location: req.params.location,
              limit: 20
            }).then(response => {
              res.json(response.jsonBody.businesses);
            }).catch(e => {
              res.redirect('/');
            });
        })
        
    /*
	*@ Catch 'em all 404s
	*/
	app.all('*', function(req, res){
		/*
		*@ Add 404 redirect
		*@
		*@ res.redirect('/404');
		*/
		res.send("404, page not found");
	})
}