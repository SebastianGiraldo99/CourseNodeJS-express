'use strict';
const {DataTypes} = require('sequelize');
const {CustomerChema, CUSTOMER_TABLE} = require('../models/customer.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.changeColumn(CUSTOMER_TABLE, 'user_id', {
      field : 'user_id',
      allowNull : false,
      unique : true,
      type : DataTypes.INTEGER,
    } );
  },

  async down (queryInterface) {
    //await queryInterface.dropTable(CUSTOMER_TABLE);
  }
};

