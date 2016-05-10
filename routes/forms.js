var express = require('express');
var router = express.Router();
var Form = require('../models/Form');

router.get('/api/forms',function(req,res){
    Form.find(function(err,forms){
        if(err)
            res.send(err);
        
        res.json(forms);
    })
});

module.exports = router;

