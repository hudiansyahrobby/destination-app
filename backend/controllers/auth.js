const { User } = require("../models");
const bcrypt = require("bcryptjs");
// const nodemailer = require('nodemailer');
// const sendGridTransport = require('nodemailer-sendgrid-transport');
// const { Op } = require('sequelize');

const { getToken } = require("../helpers/getToken");

exports.register = async (req, res) => {
  const { email, name, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (user) {
      return res
        .status(400)
        .json({ message: "This is email has been registered" });
    }
    const newUser = {
      name,
      email,
      password,
      isAdmin: false,
    };

    //Create new user if not exist in DB
    const _newUser = await User.create(newUser);

    delete _newUser.dataValues.password;
    delete _newUser.dataValues.refreshToken;
    delete _newUser.dataValues.resetPasswordToken;
    delete _newUser.dataValues.resetTokenExpired;

    return res
      .status(201)
      .json({ message: "User successfully registered", user: _newUser });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Email or Password is not valid" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res
        .status(400)
        .json({ message: "Email or Password is not valid" });
    }

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

    res.cookie("jwt", refreshToken, { httpOnly: true });

    res.status(200).json({ message: "User successfully sign in", accessToken });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

exports.generateRefreshToken = async (req, res) => {
  try {
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
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.logout = async (req, res, next) => {
  res.clearCookie("jwt");
  return res.status(200).json({ message: "Succesfully Sign out" });
};

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
