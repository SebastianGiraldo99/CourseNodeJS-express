const productsRouter = require('./products.router');
const express = require('express');
const usersRouter = require('./users.router');
const cateogiresRouter = require('./categories.router');
function routerApi(app){
  const router = express.Router();
  router.use('/api/v1', router);
  router.use('/products', productsRouter);
  router.use('/users', usersRouter);
  router.use('/categories', cateogiresRouter);
}

module.exports = routerApi;
