const Joi = require("joi");

const isValid = (schema, property) => {
  return (req, res, next) => {
    const { error } = schema.validate(req[property]);
    console.log("BODY", req.body);
    console.log("FIRST ERR", error);
    const valid = error == null;
    if (valid) {
      next();
    } else {
      const { details } = error;
      const message = details.map((i) => i.message).join(",");
      console.log("error", message);

      res.status(422).json({
        message: message,
      });
    }
  };
};

module.exports = isValid;
