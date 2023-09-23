const express = require('express');
const OrderService = require('../services/order.services');
const validatorHandler = require('../middlewares/validator.handler');
const {createOrderSchema, updateOrderSchema, getOrderSchema, addItemSchema} = require('../schemas/order.schema');

const router = express.Router();
const service = new OrderService();

router.get('/', async (req, res) => {
  const orders = await service.find();
  res.json({
    orders
  });
});


router.get('/:id', validatorHandler(getOrderSchema, 'params'),
async (req, res, next) => {
  try{
    const {id} = req.params;
    const order =await service.findOne(id);
    res.json({
      order
    });
  }catch (error){
    next(error);
  }
}
);

router.post('/',
    validatorHandler(createOrderSchema, 'body'),
      async (req, res, next) =>{
        try{
          const body = req.body;
          const newOrder = await service.create(body);
          if(body){
            res.status(201).json({
              newOrder
            });
          }
        }catch (error){
          next(error);
        }
      }
);


router.patch('/:id',
  validatorHandler(getOrderSchema, 'params'),
  validatorHandler(updateOrderSchema, 'body'),
  async (req, res) =>{
    const {id} = req.params
    const body = req.body;
    const order = await service.update(id, body);
    if(body){
      res.json(order);
    }
  }
);

router.delete('/:id',
  validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) =>{
    try {
      const {id} = req.params
      const order = await service.delete(id);
      res.json(order);
    } catch (error) {
      next(error);
    }
});

router.post('/add-item',
    validatorHandler(addItemSchema, 'body'),
      async (req, res, next) =>{
        try{
          const body = req.body;
          const newItem = await service.addItem(body);
          if(body){
            res.status(201).json({
              newItem
            });
          }
        }catch (error){
          next(error);
        }
      }
);




// router.get('/:categoryId/products/:productId', (req, res)=>{
//   const {categoryId, productId} = req.params;
//   res.json({
//     name : 'Categorie ' + categoryId,
//     products : [{
//       id : productId,
//       ...Product1
//     }]
//   });
// });

module.exports = router;
