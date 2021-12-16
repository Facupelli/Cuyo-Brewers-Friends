const Joi = require("joi");

const registerValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(2).max(25).required(),
        lastname: Joi.string().min(2).max(25).required(),
        username: Joi.string().min(2).max(25).required(),
        email: Joi.string().min(6).max(255).required().email(),
        password: Joi.string().min(8).max(120).required(),
      });
      return schema.validate(data);
}

module.exports = registerValidation
