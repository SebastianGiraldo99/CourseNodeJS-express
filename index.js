const express = require('express');
const Product1 = {
    name : 'Product 1 ',
    price : 1000,
    quatity : 10
}
const app = express();

const port = 3000;

/**
 * Default route
 */
app.get('/', (req, res) => {
    res.send('This is my first server in node');
});
/**
 * Other route
 */
app.get('/new-route', (req, res) => {
  res.send("This is other route, it's a personalizate route");
});

/**
 * the result of this route is a JSON
 */
app.get('/products', (req, res) => {
  res.json({
    Product1
  });
});

app.get('/categories', (req, res) => {
  res.json({
    name : 'Categorie 1',
    products : [Product1]
  });
});

/**
 * Route with params
 */

app.get('/products/:id', (req, res)=>{
  const {id} = req.params;
  res.json({
    id,
    ...Product1
  });
});

app.get('/categories/:categoryId/products/:productId', (req, res)=>{
  const {categoryId, productId} = req.params;
  res.json({
    name : 'Categorie ' + categoryId,
    products : [{
      id : productId,
      ...Product1
    }]
  });
});


app.listen(port, () =>{
    console.log('This is the port of my app: ' + port);
});
