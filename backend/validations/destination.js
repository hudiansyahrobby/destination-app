const Joi = require("joi");

const destination = {
  destination: Joi.object().keys({
    name: Joi.string()
      .required()
      .pattern(/^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/)
      .messages({
        "string.base": `name should be a type of string`,
        "string.empty": `name cannot be an empty field`,
        "string.pattern.base": `name should only contain alphapet or space or number`,
        "any.required": `name is a required field`,
      }),

    city: Joi.string()
      .pattern(/^[a-zA-Z ]*$/)
      .required()
      .messages({
        "string.base": `city should be a type of string`,
        "string.empty": `city cannot be an empty field`,
        "string.pattern.base": `city should only contain alphapet or space`,
        "any.required": `city is a required field`,
      }),

    province: Joi.string()
      .pattern(/^[a-zA-Z ]*$/)
      .required()
      .messages({
        "string.base": `province should be a type of string`,
        "string.empty": `province cannot be an empty field`,
        "string.pattern.base": `province should only contain alphapet or space`,
        "any.required": `province is a required field`,
      }),

    description: Joi.string().min(50).required().messages({
      "string.base": `description should be a type of string`,
      "string.empty": `description cannot be an empty field`,
      "string.min": "description shoult be at least 50 characters",
      "any.required": `description is a required field`,
    }),

    categoryId: Joi.number().required().messages({
      "string.base": `categoryId should be a type of number`,
      "string.empty": `categoryId cannot be an empty field`,
      "any.required": `categoryId is a required field`,
    }),

    images: Joi.array().items(Joi.string().required()).messages({
      "string.base": `images should be a type of string`,
      "string.empty": `images cannot be an empty field`,
      "any.required": `images is a required field`,
    }),
  }),
};

module.exports = destination;
