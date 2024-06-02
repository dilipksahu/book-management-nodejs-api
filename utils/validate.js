const Joi = require('joi');

const registerLoginValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(6).required(),
    password: Joi.string().min(6).alphanum().required()
  });
  return schema.validate(data);
};

module.exports = {
    registerLoginValidation,
  };