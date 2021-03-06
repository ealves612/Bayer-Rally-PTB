var express = require('express');
var router = express.Router();

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

  router.get('/', Authenticated, function(req, res) {
      res.render('vendas',{user: req.user});
  });


  return router;
};
