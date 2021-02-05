const Joi = require("joi");

const comment = {
  comment: Joi.object().keys({
    rating: Joi.number().min(1).max(5).required().messages({
      "number.base": `rating should be a type of number`,
      "number.empty": `rating cannot be an empty field`,
      "any.required": `rating is a required field`,
      "number.min": "rating must be between 0 to 5",
      "number.max": "rating must be between 0 to 5",
    }),

    content: Joi.string().required().messages({
      "string.base": `content should be a type of string`,
      "string.empty": `content cannot be an empty field`,
      "any.required": `content is a required field`,
    }),

    destinationId: Joi.number().required().messages({
      "number.base": `destination id should be a type of number`,
      "number.empty": `destination id cannot be an empty field`,
      "any.required": `destination id is a required field`,
    }),
  }),
};

module.exports = comment;
