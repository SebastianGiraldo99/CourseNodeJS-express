const {Model, DataTypes, Sequelize} = require('sequelize');
const {USER_TABLE} = require('./user.model');

const CUSTOMER_TABLE = 'customers';

const CustomerSchema = {
  id : {
    allowNull : false,
    autoIncrement : true,
    primaryKey : true,
    type : DataTypes.INTEGER
  },
  firstName : {
    allowNull : false,
    field : 'first_name',
    type : DataTypes.STRING
  },
  lastName : {
    allowNull : false,
    type : DataTypes.STRING,
    field : 'last_name',
  },
  phone :{
    allowNull : true,
    type : DataTypes.STRING,
  },
  createAt : {
    allowNull : false,
    type : DataTypes.DATE,
    field : 'create_at',
    defaultValue : Sequelize.NOW
  },
  userId : {
    field : 'user_id',
    allowNull : false,
    unique : true,
    type : DataTypes.INTEGER,
    references : {
      model : USER_TABLE,
      key : 'id'
    },
    onUpdate : 'CASCADE',
    onDelete : 'SET_NULL'
  }
};

class Customer extends Model {
  static associate(models){
    this.belongsTo(models.User, {as: 'user'});
  }
  static config(sequelize){
    return {
      sequelize,
      tableName: CUSTOMER_TABLE,
      modelName : 'Customer',
      timestamps : false
    }
  }
}
module.exports = {CUSTOMER_TABLE, CustomerSchema, Customer};
