var express = require('express');
var router = express.Router();
var Produto = require('../models/produto');

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
			Produto.find(function (err, produtos){
					if (err){
						console.log('erro retrieving products');
					}
					console.log('produtos passou')
					console.log(produtos);
					res.render('produtos', {user: req.user, produto: produtos});
			});
  });

	router.get('/add', Authenticated, function(req, res) {
			var code 		=	req.query.code;
			var nome 		= req.query.name;
			var classi 	= req.query.class;
			var points 	= req.query.points;
			var NovoProd = new Produto({
				codigo 	: code,
				nome  	: nome,
				classe 	: classi,
				pontos	: points});
			NovoProd.save(function (err, data) {
				if (err) console.log(err);
				else console.log('Saved ', data );
			});
      res.render('produtos', {user: req.user});
  });
  return router;
};
