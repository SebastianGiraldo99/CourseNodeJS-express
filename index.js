const express = require('express');
const {faker} = require('@faker-js/faker');
const routerApi = require('./routes');
const {logErrors, errorHandler, boomErrorHandler} = require('./middlewares/error.handler');


const Product1 = {
    name : 'Product 1 ',
    price : 1000,
    quatity : 10
}
const app = express();

const port = 3000;

app.use(express.json());

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

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);


app.listen(port, () =>{
    console.log('This is the port of my app: ' + port);
});
