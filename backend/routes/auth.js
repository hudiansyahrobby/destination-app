const { Router } = require("express");
const isValid = require("../middlewares/isValid");
const authValidation = require("../validations/auth");

// const passport = require('passport');

const {
  generateRefreshToken,
  login,
  register,
  logout,
} = require("../controllers/auth");

const router = Router();

router.post("/login", isValid(authValidation.login, "body"), login);

router.post("/signup", isValid(authValidation.signup, "body"), register);

router.post("/logout", logout);

router.post("/refresh-token", generateRefreshToken);

// Google Auth
// router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// router.get(
//   '/auth/google/callback',
//   passport.authenticate('google', { failureRedirect: '/failed' }),
//   (req, res) => {
//     res.redirect(process.env.CLIENT_URL);
//   },
// );

module.exports = router;
