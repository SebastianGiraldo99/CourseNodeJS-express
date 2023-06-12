const express = require('express');
const UserService = require('../services/user.service');


const router = express.Router();
const service = new UserService();
/**
 * QUERY PARAMS
 *
 */
router.get('/', async(req,res, next) =>{
  try{
    const users = await service.find();
    res.json(users);
  }
  catch (error){
    next (error);
  }
});

router.get('/params', (req,res) =>{
  const {limit, offset} = req.query;
  if(limit && offset){ //Validamos que existan esos parametros.
    res.json({
      limit,
      offset
    });
  }else{
    res.send('no hay parametros');
  }
});

module.exports = router;
