'use strict';

var path = process.cwd();

/*
*@ Routes
*/
module.exports = function (app, passport) {

	function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.redirect('/login');
		}
	}

	
	app.route('/')
		.get(function (req, res) {
			res.render(path + '/public/index');
		});

	app.route('/login')
		.get(function (req, res) {
			res.render(path + '/public/login', { message: req.flash('loginMessage') });
		})
		.post(passport.authenticate('local-login', {
	        successRedirect : '/profile', // redirect to the secure profile section
	        failureRedirect : '/login', // redirect back to the signup page if there is an error
	        failureFlash : true // allow flash messages
    	}));
		
	app.route('/signup')
		.get(function (req, res) {
			res.render(path + '/public/signup', { message: req.flash('signupMessage') });
		})
		.post(passport.authenticate('local-signup', {
	        successRedirect : '/profile', // redirect to the secure profile section
	        failureRedirect : '/signup', // redirect back to the signup page if there is an error
	        failureFlash : true // allow flash messages
    	}));

	app.route('/logout')
		.get(isLoggedIn, function (req, res) {
			req.logout();
			res.redirect('/login');
		});

	app.route('/profile')
		.get(isLoggedIn, function (req, res) {
			res.render(path + '/public/profile', { user : req.user });
		});

	/*
	*@ Github Passport Authentication
	*/
	app.route('/auth/github')
		.get(passport.authenticate('github'));

	app.route('/auth/github/callback')
		.get(passport.authenticate('github', {
			successRedirect: '/',
			failureRedirect: '/login'
		}));
	
	/*
	*@ Google Passport Authentication
	*/
	app.route('/auth/google')
		.get(passport.authenticate('google', { scope: [
			'profile',
			'email',
			'https://www.googleapis.com/auth/plus.login'
		]}));

	app.route('/auth/google/callback')
		.get(passport.authenticate('google', {
			successRedirect: '/',
			failureRedirect: '/login'
		}));
		
		
	
		
	/*
	*@ Catch 'em all 404s
	*/
	/*app.all('*', function(req, res){
		/*
		*@ Add 404 redirect
		*@
		*@ res.redirect('/404');
		*/
		/*res.send("404, page not found");
	})*/
};
