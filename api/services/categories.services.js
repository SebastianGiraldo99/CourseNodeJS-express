const {faker} = require('@faker-js/faker');
const {models } = require('../libs/sequelize');
class CategoriesServices {

  constructor()
  {
    this.categories = [];
    this.product = [{
      id : faker.string.uuid(),
      name : faker.commerce.productName(),
      price : parseInt(faker.commerce.price(), 10),
      image : faker.image.url(),
    }]
    this.generate();
  }

  generate ()
  {
    const   limit = 3
    for (let index = 0; index < limit; index++) {
      this.categories.push({
        id : faker.string.uuid(),
        name : faker.commerce.department.name,
        produtcs : this.product,
      })
    };

  }

  create(data)
  {
    const newCategorie = {
      id : faker.string.uuid(),
      ...data
    };
    this.categories.push(newCategorie);
    return newCategorie;


  }

  findAll()
  {
    return this.categories;
  }

  findOne(id)
  {
    return this.categories.find(item => item.id === id)
  }

  update(id, changes)
  {
    const index = this.categories.findIndex(item => item.id === id);
    if(index === -1){
      throw new Error ('Cateogire with the id: '+ id + ' Not found');
    }else{
      const categorie = this.categories[index];
      this.categories[index] = {
        ...categorie,
        ...changes
      };
      return this.categories[index];
    }

  }

  delete(id)
  {
    const index = this.categories.findIndex(item => item.id === id);
    if(index === -1){
      throw new Error ('Cateogire with the id: '+ id + ' Not found');
    }else{
      this.categories.splice(index,1);
      return {id};
    }

  }


}


module.exports = CategoriesServices;
