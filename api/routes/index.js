const productsRouter = require('./products.router');
const customersRouter = require('./customers.router');
const express = require('express');
const usersRouter = require('./users.router');
const cateogiresRouter = require('./categories.router');
const orderRouter = require('./orders.router');
function routerApi(app){
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/products', productsRouter);
  router.use('/users', usersRouter);
  router.use('/categories', cateogiresRouter);
  router.use('/customers', customersRouter);
  router.use('/orders', orderRouter);
}

module.exports = routerApi;
