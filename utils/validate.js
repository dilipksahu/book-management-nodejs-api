const Joi = require('joi');

const registerLoginValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(6).required(),
    password: Joi.string().min(6).alphanum().required()
  });
  return schema.validate(data);
};

const bookValidation = (data) => {
    const schema = Joi.object({
      title: Joi.string().min(1).required(),
      author: Joi.string().min(1).required(),
      publishedDate: Joi.date().optional(),
      summary: Joi.string().optional()
    });
    return schema.validate(data);
  };

module.exports = {
    registerLoginValidation,
    bookValidation,
  };