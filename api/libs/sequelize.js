const {Sequelize} = require('sequelize');


const {config} = require('../config/config');
const setupModels = require('../db/models');

const options = {
    dialect : 'postgres',
    logging : config.isProd ? false : true,

}
if(config.isProd){
  options.dialectOptions = {
    ssl : {
      rejectUnauthorized : false
    }
  }
}

const sequeleze = new Sequelize(config.dbUrl, options);
setupModels(sequeleze);



module.exports = sequeleze;
