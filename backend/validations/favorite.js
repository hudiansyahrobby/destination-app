const Joi = require("joi");

const favorite = {
  favorite: Joi.object().keys({
    destinationId: Joi.number().required().messages({
      "number.base": `destination id should be a type of number`,
      "number.empty": `destination id cannot be an empty field`,
      "any.required": `destination id is a required field`,
    }),
  }),
};

module.exports = favorite;
