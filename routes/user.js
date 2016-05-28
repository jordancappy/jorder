import express from 'express';
var router = express.Router();

import User from '../models/user';
// GET logged in user defails
router.get('/', (req,res,next)=>{
  if(!req.isAuthenticated())
    res.sendStatus(403);

  res.json(req.user);
});

// PUT update user details
router.put('/', (req,res,next)=>{

});
module.exports = router;