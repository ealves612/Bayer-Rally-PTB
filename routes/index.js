var express = require('express');
var router = express.Router();

var isAuthenticated = function (req) {
	// if user is authenticated in the session, call the next() to call the next request handler
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return true;
	// if the user is not authenticated then redirect him to the login page
	return false;
}

var Authenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	return res.redirect('/');
}

module.exports = function(passport){
	var logStatus = false;

	/* GET login page.*/
	router.get('/', function(req, res) {
    	// Display the Login page with any flash message, if any
		res.redirect('/index');
	});


	/* Handle Vendas section *//*
	router.get('/vendas', function(req, res) {
		console.log('passou aqui');
		var vendas = require('./vendas');
		router.use('/', vendas);
	});*/


	/* GET Index page. */
	router.get('/index', function(req, res) {
			// Display the Login page with any flash message, if any
			if (isAuthenticated(req)){
				var logStatus = true;
				res.render('home', {user: req.user });
			}
			else{
				res.render('index');
			}
	});

	/* Handle Login POST */
	router.post('/login', passport.authenticate('login', {
		successRedirect: '/home',
		failureRedirect: '/',
		failureFlash : true
	}));

	/* GET Registration Page */
// SIGNUP POR GET
	router.get('/signup', function(req, res){
		res.render('register',{message: req.flash('message')});
	});

	/* Handle Registration POST */
	router.post('/signup', passport.authenticate('signup', {
		successRedirect: '/home',
		failureRedirect: '/signup',
		failureFlash : true
	}));

	/* GET Home Page */
	router.get('/home', function(req, res){
		if (isAuthenticated(req)){
			var logStatus = true;
			console.log("hello");
			res.render('home', { login: logStatus, user: req.user });
		}
		else{
			console.log("else");
			res.redirect('/');
		}
	});

	/* Handle Logout */
	router.get('/signout', function(req, res) {
		req.logout();
		res.redirect('/');
	});


	return router;
}
