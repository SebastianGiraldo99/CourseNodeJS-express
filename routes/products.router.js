const express = require('express');
const ProductsService = require('../services/products.service');
const Product1 = {
  name : 'Product 1 ',
  price : 1000,
  quatity : 10
}

const router = express.Router();
const service = new ProductsService();

/**
 * Route in Router.
 */

/**
 * Route with params
 */

router.get('/', (req, res) => {
  const products = service.find();
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
  const product = service.findOne(id);
  res.json({
    product
  });
});


/**
 * POST Route
 */
router.post('/', (req, res) =>{
  const body = req.body;
  const newProduct = service.create(body);
  if(body){
    res.status(201).json({
      newProduct
    });
  }
});


/**
 * PATCH Route
 */
router.patch('/:id', (req, res) =>{
  const {id} = req.params
  const body = req.body;
  const product = service.update(id, body);
  if(body){
    res.json(product);
  }
});

/**
 * DELETE Route
 */
router.delete('/:id', (req, res) =>{
  const {id} = req.params
  const product = service.delete(id);
    res.json(product);
});

module.exports = router;
