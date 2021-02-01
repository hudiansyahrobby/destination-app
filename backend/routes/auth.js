const { Router } = require('express');
// const passport = require('passport');

const {
  generateRefreshToken,
  login,
  register,
  logout,
} = require('../controllers/auth');

const router = Router();

router.post('/login', login);

router.post('/signup', register);

router.post('/logout', logout);

router.post('/refresh-token', generateRefreshToken);

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
