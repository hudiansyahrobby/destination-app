const Joi = require("joi");

const auth = {
  signup: Joi.object().keys({
    name: Joi.string()
      .pattern(/^[a-zA-Z ]*$/)
      .required()
      .messages({
        "string.base": `name should be a type of string`,
        "string.empty": `name cannot be an empty field`,
        "string.pattern.base": `name should only contain alphapet or space`,
        "any.required": `name is a required field`,
      }),
    email: Joi.string().email().required().messages({
      "string.base": `email should be a type of string`,
      "string.empty": `email cannot be an empty field`,
      "string.email": "email is not valid",
      "any.required": `email is a required field`,
    }),
    password: Joi.string()
      .min(8)
      .pattern(
        /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/
      )
      .required()
      .messages({
        "string.base": `password should be a type of string`,
        "string.empty": `password cannot be an empty field`,
        "string.min": "password must be at least 8 characters",
        "any.required": `password is a required field`,
        "string.pattern.base":
          "Password must be  at least one uppercase letter, one lowercase letter, one number and one special character",
      }),
    password2: Joi.any().equal(Joi.ref("password")).required().messages({
      "any.only": "password does not match",
      "any.required": `password confirmation is a required field`,
    }),
  }),

  login: Joi.object().keys({
    email: Joi.string().email().required().messages({
      "string.base": `email should be a type of string`,
      "string.empty": `email cannot be an empty field`,
      "string.email": "email is not valid",
      "any.required": `email is a required field`,
    }),
    password: Joi.string()
      .min(8)
      .pattern(
        /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/
      )
      .required()
      .messages({
        "string.base": `password should be a type of string`,
        "string.empty": `password cannot be an empty field`,
        "string.min": "password must be at least 8 characters",
        "any.required": `password is a required field`,
        "string.pattern.base":
          "Password must be  at least one uppercase letter, one lowercase letter, one number and one special character",
      }),
  }),
};

module.exports = auth;
