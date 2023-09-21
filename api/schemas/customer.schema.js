const {createUserSchema, updateUserSchema} = require('./user.schema')
const Joi = require('joi');

const id = Joi.number().integer();
const firstName = Joi.string().min(3).max(30);
const lastName = Joi.string().min(3).max(30);
const phone = Joi.string();
const userId = Joi.number().integer();

const getCustomerSchema =  Joi.object({
  id : id.required(),
});

const updateCustomerSchema =  Joi.object({
  firstName,
  lastName,
  phone,
  userId,
  updateUserSchema,
});

const createCustomerSchema =  Joi.object({
  firstName : firstName.required(),
  lastName : lastName.required(),
  phone : phone.required(),
  user : createUserSchema,
});

module.exports = {getCustomerSchema, updateCustomerSchema, createCustomerSchema};
