// VALIDATION
const Joi = require("joi");

// Register Validation
const registerValidation = (data) => {
  const schema = Joi.object({
    first_name: Joi.string().max(255).required(),
    last_name: Joi.string().max(255).required(),
    email: Joi.string().min(6).max(255).required(),
    username: Joi.string().min(6).max(255).required(),
    password: Joi.string().min(6).max(1024).required(),
  });
  return schema.validate(data);
};

// Login Validation
const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).max(255).required(),
    password: Joi.string().min(6).max(1024).required(),
  });
  return schema.validate(data);
};

// Email Validation
const emailValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).max(255).required(),
  });
  return schema.validate(data);
};
// Send Mail Validation
const sendMailValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).max(255).required(),
    msg: Joi.string().min(1).max(2048).required(),
  });
  return schema.validate(data);
};
module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.emailValidation = emailValidation;
module.exports.sendMailValidation = sendMailValidation;
