const express = require('express');


const router = express.Router();
/**
 * QUERY PARAMS
 *
 */
router.get('/', (req,res) =>{
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
