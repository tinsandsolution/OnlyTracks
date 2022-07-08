const express = require('express')

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateLogin = [
  check('credential')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Email is required'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Password is required'),
  handleValidationErrors
];

const router = express.Router();


// router.post(
//     '/',
//     async (req, res, next) => {
//       const { credential, password } = req.body;

//       const user = await User.login({ credential, password });

//       if (!user) {
//         const err = new Error('Login failed');
//         err.status = 401;
//         err.title = 'Login failed';
//         err.errors = ['The provided credentials were invalid.'];
//         return next(err);
//       }

//       await setTokenCookie(res, user);

//       return res.json({
//         user
//       });
//     }
//   );


// Log out
router.delete(
    '/',
    (_req, res) => {
      res.clearCookie('token');
      return res.json({ message: 'success' });
    }
  );

// Restore session user
router.get(
  '/',
  restoreUser,
  (req, res) => {
    const { user } = req;
    if (user) {
      return res.json({
        user: user.toSafeObject()
      });
    } else return res.json({});
  }
);

// Log in
router.post(
  '/',
  validateLogin,
  async (req, res, next) => {
    const { credential, password } = req.body;
    console.log("this works")
    let user = await User.login({ credential, password });
    console.log("this works")
    if (!user) {
      const err = new Error('Invalid credentials');
      err.status = 401;
      err.title = 'Login failed';
      err.errors = ['Invalid credentials'];
      return next(err);
    }

    const token = await setTokenCookie(res, user);

    delete user.dataValues.createdAt
    delete user.dataValues.updatedAt

    console.log(user)
    return res.json({
      user, token
    });
  }
);

module.exports = router;
