const {Client} = require('pg');

async function getConnetcion(){
  const client = new Client({
    host : 'localhost',
    port : 5432,
    user : 'sebs',
    password : 'admin123',
    database : 'my_store'
  });
  await client.connect();
  return client;
}


module.exports = getConnetcion;
