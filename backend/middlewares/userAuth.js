const jwt = require('jsonwebtoken');
const { User } = require('../models');

exports.verifyUser = async function (req, res, next) {
  if (req.headers.authorization) {
    const bearerToken = req.headers.authorization.split(' ');
    let accessToken = bearerToken[1];
    if (!accessToken) {
      return res.status(401).json({ success: false, message: 'Unauthorized, Access Denied' });
    }

    try {
      const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
      const user = await User.findOne({
        where: { id: decodedToken.id },
        attributes: {
          exclude: ['password', 'refreshToken', 'resetPasswordToken', 'resetTokenExpired'],
        },
      });
      req.user = user;
      next();
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ error: 'Session timed out,please login again' });
      } else if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({ error: 'Invalid token,please login again!' });
      } else {
        //catch other unprecedented errors
        return res.status(400).json({ error });
      }
    }
  } else {
    return res.status(401).json({ success: false, message: 'Unauthorized, Access Denied' });
  }
};