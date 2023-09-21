const {faker} = require('@faker-js/faker');
const boom = require('@hapi/boom');
const {models } = require('../libs/sequelize');
class CategoryService {

  constructor()
  {
  }

  async create(data)
  {
    const newCategorie = await models.Category.create(data);
    return newCategorie;
  }

  async find()
  {
    const category = await models.Category.findAll();
    return category
  }

  async findOne(id)
  {
    const newCategory = await models.Category.findByPk(id,
      {include: ['products']
      });
    if(!newCategory ) throw boom.notFound('Category not found');
    return newCategory
  }

  async update(id, changes)
  {
    const category = await this.findOne(id);
    const rta = await category.update(changes);
    return rta;

  }

  async delete(id)
  {
    const category = await this.findOne(id);
    const rta = await category.destroy(id);
    return rta;

  }


}


module.exports = CategoryService;
