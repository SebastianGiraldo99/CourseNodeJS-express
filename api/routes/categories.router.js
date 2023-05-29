const express = require('express');
const CategoriesServices = require('../services/categories.services');
const Product1 = {
  name : 'Product 1 ',
  price : 1000,
  quatity : 10
}

const router = express.Router();
const service = new CategoriesServices();

router.get('/', (req, res) => {
  const categories = service.findAll();
  res.json({
    categories
  });
});


router.get('/:catId', (req, res) => {
  const {id} = req.params;
  const categories = service.findOne(id);
  res.json({
    categories
  });
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
