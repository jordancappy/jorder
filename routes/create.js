import express from 'express';
var router = express.Router();

import mongoose from 'mongoose';
import Form from '../models/Form';

// GET create page
router.get('/:id', function (req, res, next) {
	Form.findById(req.params.id, function (err, post) {
		if (!err) {
			res.render('create', {
				title: 'jorder',
				id: post.id
			});
		} else
		res.sendStatus(404);
	});
});

module.exports = router;