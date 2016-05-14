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
    Form.findById(req.params.id, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

module.exports = router;