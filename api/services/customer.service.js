// const getConnetcion = require('../libs/postgres');
// const pool = require('../libs/postgres.pool');
const boom = require('@hapi/boom');
const {models} = require('../libs/sequelize');


class CustomerService {
  constructor (){
    // this.pool = pool;
    // pool.on('error', (err)=>console.error(err));
  }
  // FORMA MANUAL DE CREAR DATOS ANIDADOS
  // async create(data){
  //   const newUser = await models.User.create(data.user);
  //   const newCustomer = await models.Customer.create({
  //     ...data,
  //     userId : newUser.id
  //   });
  //   return newCustomer;
  // }
  async create(data){
    const newCustomer = await models.Customer.create(data, {
      include : ['user'],
    })
    return newCustomer;
  }


  async find(){
    const rta = await models.Customer.findAll({
      include: ['user'],
    });
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
