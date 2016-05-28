var express = require('express');
var router = express.Router();

var passport = require('passport');
// GET home page
router.get('/', function(req,res,next) {
    //TODO: when authentication added make returned page 
    // contain all the forms available to the user
    res.render('index', {title: 'jorder'});
  });

router.get('/home', function(req,res,next){
	res.render('home',{title:'jorder'}); 
});

// GET logout
router.get('/logout', function(req,res){
	req.logout();
	res.redirect('/');
});

/* google authentication section */
router.get('/auth/google', passport.authenticate('google',{scope:['profile','email']}))

router.get('/auth/callback',
	passport.authenticate('google',{
		successRedirect: '/home',
		failureRedirect: '/'
}));

module.exports = router;