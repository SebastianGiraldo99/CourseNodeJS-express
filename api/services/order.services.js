const {faker} = require('@faker-js/faker');
const boom = require('@hapi/boom');
const {models } = require('../libs/sequelize');
class OrderService {

  constructor()
  {
  }

  async create(data)
  {
    const newOrder = await models.Order.create(data);
    return newOrder;
  }

  async addItem(data){
    const newItem = await models.OrderProduct.create(data);
    return newItem;
  }

  async find()
  {
    const order = await models.Order.findAll();
    return order
  }

  async findOne(id)
  {
    const newOrder = await models.Order.findByPk(id,
      {include: [{
        association : 'customer',
        include : ['user']
      },
      'items'
    ]
      });
    if(!newOrder ) throw boom.notFound('Order not found');
    return newOrder
  }

  async update(id, changes)
  {
    const order = await this.findOne(id);
    const rta = await order.update(changes);
    return rta;

  }

  async delete(id)
  {
    const order = await this.findOne(id);
    const rta = await order.destroy(id);
    return rta;

  }


}


module.exports = OrderService;
