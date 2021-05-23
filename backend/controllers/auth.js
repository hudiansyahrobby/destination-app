const { User } = require("../models");
const catchAsync = require("../errorHandler/catchAsync");
const authService = require("../services/auth.services");

// const nodemailer = require('nodemailer');
// const sendGridTransport = require('nodemailer-sendgrid-transport');
// const { Op } = require('sequelize');

const { getToken } = require("../helpers/getToken");

exports.register = catchAsync(async (req, res, next) => {
  const { email, name, password } = req.body;

  const newUser = await authService.registerUser({ email, name, password });

  return res
    .status(201)
    .json({ message: "User registered successfully", data: newUser });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const { user, refreshToken, accessToken } = await authService.loginUser({
    email,
    password,
  });

  res.cookie("jwt", refreshToken, { httpOnly: true });

  res
    .status(200)
    .json({ message: "User successfully sign in", accessToken, user });
});

exports.generateRefreshToken = catchAsync(async (req, res, next) => {
  //get refreshToken
  const { jwt: refreshToken } = req.cookies;
  //send error if no refreshToken is sent
  if (!refreshToken) {
    return res.status(403).json({ message: "Token is missing" });
  } else {
    //query for the token to check if it is valid:
    const user = await User.findOne({ where: { refreshToken } });

    //send error if no token found:
    if (!user) {
      return res.status(401).json({ message: "Token expired or invalid!" });
    } else {
      //extract payload from refresh token and generate a new access token and send it
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

      // Save new refresh token to DB
      user.refreshToken = refreshToken;
      await user.save();

      // Send new Cookie
      res.cookie("jwt", refreshToken, { httpOnly: true });

      return res
        .status(200)
        .json({ message: "Token refreshed successfully", accessToken });
    }
  }
});

exports.logout = catchAsync(async (req, res, next) => {
  res.clearCookie("jwt");
  return res.status(200).json({ message: "Succesfully Sign out" });
});

// exports.postResetPassword = async (req, res, next) => {
//   const { email } = req.body;
//   try {
//     const resetPasswordToken = crypto.randomBytes(20).toString('hex');
//     const resetTokenExpired = Date.now() + 3600000;

//     const user = await User.update({ resetPasswordToken, resetTokenExpired }, { where: { email } });
//     if (!user) return res.status(400).json({ message: 'User Not Found' });

//     const transporter = nodemailer.createTransport(
//       sendGridTransport({
//         auth: {
//           api_key: process.env.SENDGRID_API_KEY,
//         },
//       }),
//     );

//     const mailOptions = {
//       from: 'habit@habit.com',
//       to: user.email,
//       subject: 'Link To Reset Password',
//       html: `
//       <h5>Link To <a href='http://localhost:3000/${resetPasswordToken}'>Reset Password</a>
//       `,
//     };
//     await transporter.sendMail(mailOptions);
//     res.status(200).json({ message: 'Berhasil Mengirim Email Reset Password' });
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };

// exports.postNewPassword = async (req, res, next) => {
//   const { password } = req.body;
//   const { resetPasswordToken } = req.params;
//   try {
//     const user = await User.findOne({
//       where: {
//         resetPasswordToken,
//         resetTokenExpired: {
//           [Op.gt]: new Date(),
//         },
//       },
//     });

//     if (!user) {
//       return res.status(400).json({ message: 'Token sudah tidak valid' });
//     }

//     user.password = password;
//     user.resetPasswordToken = undefined;
//     user.resetTokenExpired = undefined;

//     await user.save();
//     return res.status(201).json({ message: 'Berhasil Mengubah Password' });
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };
