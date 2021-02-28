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

    content: Joi.string().required().max(1500).messages({
      "string.base": `content should be a type of string`,
      "string.empty": `content cannot be an empty field`,
      "string.max": "content must less than 1500 characters",
      "any.required": `content is a required field`,
    }),
  }),
};

module.exports = comment;
