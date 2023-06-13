const {faker} = require('@faker-js/faker');
const boom = require('@hapi/boom');
const pool = require('../libs/postgres.pool');
class ProductsService {
  constructor(){
    this.products = [];
    this.generate();
    this.pool = pool;
    this.pool.on('error', (err)=>console.error(err));
  }

  generate ()
  {
    const   limit = 100
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id : faker.string.uuid(),
        name : faker.commerce.productName(),
        price : parseInt(faker.commerce.price(), 10),
        image : faker.image.url(),
        isBlock : faker.datatype.boolean(),
      })
    };
  }

  async create(data)
  {
    const newProduct = {
      id : faker.string.uuid(),
      ...data
    }
    this.products.push(newProduct);
    return newProduct;
  }

  async find()
  {
    const query = 'SELECT * FROM task';
    const rta = await this.pool.query(query);
    return rta.rows;

    //Se reemplaza este code por la info de la BD.
    // return new Promise((resolve, reject)=>{
    //   setTimeout(()=>{
    //     resolve(this.products);
    //   }, 5000)
    // });
  }

  async findOne(id)
  {
    const product = this.products.find(item => item.id === id)
    if(!product){
      throw boom.notFound('Product nor found');
    }
    if(product.isBlock){
      throw boom.conflict('Product is block');
    }
    return product;
  }

  async update(id, changes)
  {
    const index = this.products.findIndex(item => item.id === id);
    if(index === -1){
      throw boom.notFound('Product nor found');
    }
    else{
      const product = this.products[index];
      this.products[index] = {
        ...product,
        ...changes}
      return this.products[index];
    }
  }

  async delete(id)
  {
    const index = this.products.findIndex(item => item.id === id);
    if(index === -1){
      throw boom.notFound('Product with id: '+ id + ' not found');
    }else {
      this.products.splice(index,1);
      return {id};
    }
  }





}

module.exports = ProductsService;
