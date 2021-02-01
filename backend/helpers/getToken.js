
const jwt = require('jsonwebtoken');

exports.getToken = (payload, tokenSecret, tokenLife) => {
  return jwt.sign(payload, tokenSecret, {
    expiresIn: tokenLife,
  });
};