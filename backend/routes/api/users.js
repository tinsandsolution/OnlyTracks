// backend/routes/api/users.js
const express = require('express')

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Invalid email'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  check('firstName')
    .exists({ checkFalsy: true})
    .withMessage('First Name is required'),
  check('lastName')
    .exists({ checkFalsy: true})
    .withMessage('Last Name is required'),
  handleValidationErrors
];


const router = express.Router();

// router.post(
//     '/',
//     async (req, res) => {
//       const { email, password, username } = req.body;
//       const user = await User.signup({ email, username, password });

//       await setTokenCookie(res, user);

//       return res.json({
//         user
//       });
//     }
//   );

// Sign up
router.post(
  '/',
  validateSignup,
  async (req, res, next) => {
    const { email, password, username, firstName, lastName, previewImage } = req.body;

    const errors = {}
    const alreadyHasEmail = await User.findOne({ where : {email : email} })
    const alreadyHasUsername = await User.findOne({ where: {username : username} })
    if (alreadyHasEmail) errors.email = "User with that email already exists"
    if (alreadyHasUsername) errors.username = "User with that username already exists"
    if (Object.keys(errors).length !== 0) {
      const err = Error("User already exists");
      err.errors = errors;
      err.status = 403;
      err.title = 'Bad signup request';
      return res.status(403).json(err)
    }

    let user = await User.signup({ email, username, password, firstName, lastName, previewImage });
    const token = await setTokenCookie(res, user);

    return res.json({
      user, token
    });
  }
);

//Get current User
router.get(
  '/current',
  requireAuth,
  async (req, res) => {
    let info = await User.scope('currentUser').findOne({
      where: {
        id: req.user.id
      },
      attributes: ['id','firstName','lastName','email','username']
    })
    const { token } = req.cookies

    info = info.toJSON()
    info.token = token

    return res.json(info)
  }
);
module.exports = router;
