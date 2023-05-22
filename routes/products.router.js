const express = require('express');
const {faker} = require('@faker-js/faker');
const Product1 = {
  name : 'Product 1 ',
  price : 1000,
  quatity : 10
}

const router = express.Router();

/**
 * Route in Router.
 */

/**
 * Route with params
 */

router.get('/', (req, res) => {
  const products = [];
  const {size} = req.query;
  limit = size || 30;
  for (let index = 0; index < limit; index++) {
    products.push({
      name : faker.commerce.productName(),
      price : parseInt(faker.commerce.price(), 10),
      image : faker.image.url(),
    })
  };
  res.json({
    products
  });
});

// Especific route
router.get('/filter', (req,res) =>{
  res.send('yo soy un filtro');
});
//Dinamyc route -> first especifict route.
//
router.get('/:id', (req, res)=>{
  const {id} = req.params;
  res.json({
    id,
    ...Product1
  });
});

module.exports = router;