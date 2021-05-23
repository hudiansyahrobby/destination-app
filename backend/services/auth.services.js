const { User } = require("../models");
const AppError = require("../errorHandler/AppError");
const { getToken } = require("../helpers/getToken");
const bcrypt = require("bcryptjs");

const findUserByEmail = async (email) => {
  const user = await User.findOne({ where: { email } });
  return user;
};

const checkPassword = async (password1, password2) => {
  const isMatch = await bcrypt.compare(password1, password2);

  if (!isMatch) {
    throw new AppError("Email or Password is not valid", 400, "not-valid");
  }

  return isMatch;
};

const registerUser = async (registerData) => {
  const user = await findUserByEmail(registerData.email);

  if (user) {
    throw new AppError(
      `User with email ${registerData.email} is already exist`,
      400,
      "already-exist"
    );
  }

  const newUser = {
    ...registerData,
    isAdmin: false,
  };

  const _newUser = await User.create(newUser);

  delete _newUser.dataValues.password;
  delete _newUser.dataValues.refreshToken;
  delete _newUser.dataValues.resetPasswordToken;
  delete _newUser.dataValues.resetTokenExpired;

  return _newUser;
};

const loginUser = async (loginData) => {
  const user = await findUserByEmail(loginData.email);

  if (!user) {
    throw new AppError(`Email or Password is not valid`, 400, "not-valid");
  }

  await checkPassword(loginData.password, user.password);

  const payload = { id: user.id };
  const accessToken = getToken(
    payload,
    process.env.ACCESS_TOKEN_SECRET,
    process.env.ACCESS_TOKEN_LIFE
  );
  const refreshToken = getToken(
    payload,
    process.env.REFRESH_TOKEN_SECRET,
    process.env.REFRESH_TOKEN_LIFE
  );

  delete user.dataValues.password;
  return {
    user,
    accessToken,
    refreshToken,
  };
};

module.exports = {
  checkPassword,
  findUserByEmail,
  loginUser,
  registerUser,
};
