var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Form = require('../models/Page');

/* GET /api/forms/id */
router.get('/:id', function (req, res, next) {
  //TODO add authentication/user.forms/userId: user.id support
  Form.findById(req.params.id)
  .populate('pages')
  .exec(function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* POST /api/forms */
router.post('/', function (req, res, next) {
  Form.create(req.body, function (err, form) {
    if (err) return next(err);
  
    User.findById(req.user._id, function(err,user){
      if(err) res.send(err);

      user.forms.push(form);

      user.save();
    });
    res.json(form);
  });
});

/* PUT /api/forms/ */
router.put('/:id', function(req,res,next){
  console.log('id',req.params.id);
  console.log('body',req.body);
  Form.findByIdAndUpdate(req.params.id,req.body, {new: true},function(err,page){
    if (err) return next(err);

    res.json(page);
  });
});

module.exports = router;