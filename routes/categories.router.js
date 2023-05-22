const express = require('express');
const Product1 = {
  name : 'Product 1 ',
  price : 1000,
  quatity : 10
}

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    name : 'Categorie 1',
    products : [Product1]
  });
});

router.get('/:categoryId/products/:productId', (req, res)=>{
  const {categoryId, productId} = req.params;
  res.json({
    name : 'Categorie ' + categoryId,
    products : [{
      id : productId,
      ...Product1
    }]
  });
});

module.exports = router;
