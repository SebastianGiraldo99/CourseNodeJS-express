const productsRouter = require('./products.router')
const usersRouter = require('./users.router')
const cateogiresRouter = require('./categories.router')
function routerApi(app){
  app.use('/products', productsRouter);
  app.use('/users', usersRouter);
  app.use('/categories', cateogiresRouter);
}

module.exports = routerApi;
