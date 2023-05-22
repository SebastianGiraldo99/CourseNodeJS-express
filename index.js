const express = require('express');
const {faker} = require('@faker-js/faker');
const routerApi = require('./routes');


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

routerApi(app);


app.listen(port, () =>{
    console.log('This is the port of my app: ' + port);
});
