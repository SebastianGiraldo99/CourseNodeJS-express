const {faker} = require('@faker-js/faker');
const boom = require('@hapi/boom');
const pool = require('../libs/postgres.pool');
const {models } = require('../libs/sequelize');

const sequelize = require('../libs/sequelize');
class ProductService {
  constructor(){

  }

  async create(data)
  {
    const newProduct = await models.Product.create(data);
    return newProduct;
  }

  async find()
  {
    const products = await models.Product.findAll({
      include : ['category']
    });
    return products
  }

  async findOne(id)
  {
    const newProduct = await models.Product.findByPk(id)
    if(!newProduct ) throw boom.notFound('Product not found');
    return newProduct
  }

  async update(id, changes)
  {
    const product = await this.findOne(id);
    const rta = await product.update(changes);
    return rta;
  }

  async delete(id)
  {
    const product = await this.findOne(id);
    const rta = await product.destroy(id);
    return rta;
  }





}

module.exports = ProductService;
