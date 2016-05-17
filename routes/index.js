var express = require('express');
var router = express.Router();

// GET home page
router.get('/', function(req,res,next) {
    //TODO: when authentication added make returned page 
    // contain all the forms available to the user
    res.render('index', {title: 'jorder'});
  });

router.get('/home', function(req,res,next){
	res.render('home',{title:'jorder'}); 
});


module.exports = router;