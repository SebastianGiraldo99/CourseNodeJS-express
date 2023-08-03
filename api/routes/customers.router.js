const express = require('express');
const CustomerService = require('../services/customer.service');
const validatorHandler = require('../middlewares/validator.handler');
const {getCustomerSchema,updateCustomerSchema, createCustomerSchema} = require('../schemas/customer.schema');


const router = express.Router();
const service = new CustomerService();
/**
 * QUERY PARAMS
 *
 */
router.get('/', async(req,res, next) =>{
  try{
    const customers = await service.find();
    res.json(customers);
  }
  catch (error){
    next (error);
  }
});

router.get('/:id',
  validatorHandler(getCustomerSchema, 'params'),
    async (req, res, next)=>{
      try {
        const {id} = req.params;
        const customer = await service.findOne(id);
        res.json({
          customer
        });
      } catch (error) {
        next(error);
      }
    }
);
router.post('/',
    validatorHandler(createCustomerSchema, 'body'),
      async (req, res, next) =>{
        try{
          const body = req.body;
          const newCustomer = await service.create(body);
          if(body){
            res.status(201).json({
              newCustomer
            });
          }
        }catch (error){
          next(error);
        }
      }
);

router.patch('/:id',
  validatorHandler(getCustomerSchema, 'params'),
  validatorHandler(updateCustomerSchema, 'body'),
  async (req, res) =>{
    const {id} = req.params
    const body = req.body;
    const product = await service.update(id, body);
    if(body){
      res.json(product);
    }
  }
);

router.delete('/:id',
  validatorHandler(getCustomerSchema, 'params'),
  async (req, res, next) =>{
    try {
      const {id} = req.params
      const customer = await service.delete(id);
      res.json(customer);
    } catch (error) {
      next(error);
    }
});

module.exports = router;
