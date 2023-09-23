const express = require('express');
const CategoryService = require('../services/category.service');
const validatorHandler = require('../middlewares/validator.handler');
const {createCategorySchema, updateCategorySchema, getCategorySchema} = require('../schemas/category.schema');

const router = express.Router();
const service = new CategoryService();

router.get('/', async (req, res) => {
  const categories = await service.find();
  res.json({
    categories
  });
});


router.get('/:id', validatorHandler(getCategorySchema, 'params'),
async (req, res, next) => {
  try{
    const {id} = req.params;
    const categories =await service.findOne(id);
    res.json({
      categories
    });
  }catch (error){
    next(error);
  }
}
);

router.post('/',
    validatorHandler(createCategorySchema, 'body'),
      async (req, res, next) =>{
        try{
          const body = req.body;
          const newCategory = await service.create(body);
          if(body){
            res.status(201).json({
              newCategory
            });
          }
        }catch (error){
          next(error);
        }
      }
);


router.patch('/:id',
  validatorHandler(getCategorySchema, 'params'),
  validatorHandler(updateCategorySchema, 'body'),
  async (req, res) =>{
    const {id} = req.params
    const body = req.body;
    const category = await service.update(id, body);
    if(body){
      res.json(category);
    }
  }
);

router.delete('/:id',
  validatorHandler(getCategorySchema, 'params'),
  async (req, res, next) =>{
    try {
      const {id} = req.params
      const category = await service.delete(id);
      res.json(category);
    } catch (error) {
      next(error);
    }
});


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
