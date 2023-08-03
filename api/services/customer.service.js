// const getConnetcion = require('../libs/postgres');
// const pool = require('../libs/postgres.pool');
const boom = require('@hapi/boom');
const {models} = require('../libs/sequelize');


class CustomerService {
  constructor (){
    // this.pool = pool;
    // pool.on('error', (err)=>console.error(err));
  }

  async create(data){
    const newCustomer = await models.Customer.create(data);
    return newCustomer;
  }

  async find(){
    const rta = await models.Customer.findAll();
    return rta;
  }

  async findOne(id){
    const user = await models.Customer.findByPk(id);
    if(!user){
      throw boom.notFound('User not found');
    }
    return user;
  }
  async update(id, changes){
    const customer = await this.findOne(id);
    const rta = await customer.update(changes);
    return rta;

  }

  async delete (id){
    const customer = await this.findOne(id);
    const rta = await customer.destroy(id);
    return rta;
  }

}

module.exports = CustomerService;
