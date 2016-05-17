var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Form = require('../models/Form');

/* GET /api/forms list */
router.get('/', function (req, res) {
  Form.find(function (err, forms) {
    if (err)
      res.send(err);
    res.json(forms);
  })
});

/* POST /api/forms */
router.post('/', function (req, res, next) {
  Form.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* GET /api/forms/id */
router.get('/:id', function (req, res, next) {
  Form.findById(req.params.id)
  .populate('pages')
  .exec(function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* PUT /api/forms/ */
router.put('/:id', function(req,res,next){
  Form.findByIdAndUpdate(req.params.id,req.body, {new: true},function(err,form){
    if (err) return next(err);
    res.json(form);
  });
});

module.exports = router;