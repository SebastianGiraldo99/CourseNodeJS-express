const getConnetcion = require('../libs/postgres');
const pool = require('../libs/postgres.pool');


class UserService {
  constructor (){
    this.pool = pool;
    pool.on('error', (err)=>console.error(err));
  }

  async create(data){
    return data;
  }

  async find(){
    const query = 'SELECT * FROM task';
    const rta = await this.pool.query(query);
    //Se reemplaza por la conexion por una de tipo Pool
    // const client = await getConnetcion();
    // const rta = await client.query('SELECT * FROM task');
    return rta.rows;
  }

  async findOne(id){
    return {id};
  }
  async update(id, changes){
    return {id, changes};
  }

  async delete (id){
    return {id};
  }

}

module.exports = UserService;
