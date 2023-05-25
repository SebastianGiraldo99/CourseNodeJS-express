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

router.get('/', async (req, res) => {
  const products = await service.find();
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
router.get('/:id', async (req, res)=>{
  const {id} = req.params;
  const product = await service.findOne(id);
  res.json({
    product
  });
});


/**
 * POST Route
 */
router.post('/', async (req, res) =>{
  const body = req.body;
  const newProduct = await service.create(body);
  if(body){
    res.status(201).json({
      newProduct
    });
  }
});


/**
 * PATCH Route
 */
router.patch('/:id', async (req, res) =>{
  const {id} = req.params
  const body = req.body;
  const product = await service.update(id, body);
  if(body){
    res.json(product);
  }
});

/**
 * DELETE Route
 */
router.delete('/:id', async (req, res) =>{
  try {
    const {id} = req.params
    const product = await service.delete(id);
    res.json(product);
  } catch (error) {
    res.status(404).json({
      message : error.message,
    })
  }

});

module.exports = router;
