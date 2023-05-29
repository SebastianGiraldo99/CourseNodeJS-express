const express = require('express');
const {faker} = require('@faker-js/faker');
const cors = require('cors');
const routerApi = require('./routes');
const {logErrors, errorHandler, boomErrorHandler} = require('./middlewares/error.handler');


const Product1 = {
    name : 'Product 1 ',
    price : 1000,
    quatity : 10
}
const app = express();

const port = process.env.PORT || 3000;


const witheList = ['http://localhost:8080', 'https://othersite.com'];
const options =  {
  origin : (origin, callbakc) => {
    if(witheList.includes(origin) || !origin){
      callbakc(null, true);
    }else{
      callbakc(new Error ('Not permissions'));
    }
  }
}
app.use(cors(options));

app.use(express.json());

/**
 * Default route
 */
app.get('/api/', (req, res) => {
    res.send('This is my first server in node');
});
/**
 * Other route
 */
app.get('/api/new-route', (req, res) => {
  res.send("This is other route, it's a personalizate route");
});

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);


app.listen(port, () =>{
    console.log('This is the port of my app: ' + port);
});
