const express = require('express');
const ProductsService = require('../services/product.service');
const validatorHandler = require('../middlewares/validator.handler');
const {createProductSchema, updateProductSchema, getProductSchema, queryProductSchema} = require('../schemas/product.schema');
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

router.get('/',
  validatorHandler(queryProductSchema, 'query'),
  async (req, res, next) => {
  try{
    const products = await service.find(req.query);
    res.json({
      products
    });
  }catch (error){
    next(error);
  }
});

// Especific route
router.get('/filter', (req,res) =>{
  res.send('yo soy un filtro');
});
//Dinamyc route -> first especifict route.
//
router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
    async (req, res, next)=>{
      try {
        const {id} = req.params;
        const product = await service.findOne(id);
        res.json({
          product
        });
      } catch (error) {
        next(error);
      }
    }
);


/**
 * POST Route
 */
  router.post('/',
    validatorHandler(createProductSchema, 'body'),
      async (req, res, next) =>{
        try{
          const body = req.body;
          const newProduct = await service.create(body);
          if(body){
            res.status(201).json({
              newProduct
            });
          }
        }catch (error){
          next(error);
        }
      }
);


/**
 * PATCH Route
 */
router.patch('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res) =>{
    const {id} = req.params
    const body = req.body;
    const product = await service.update(id, body);
    if(body){
      res.json(product);
    }
  }
);

/**
 * DELETE Route
 */
router.delete('/:id', async (req, res, next) =>{
  try {
    const {id} = req.params
    const product = await service.delete(id);
    res.json(product);
  } catch (error) {
    next(error);
  }

});

module.exports = router;
