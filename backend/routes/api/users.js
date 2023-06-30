// backend/routes/api/users.js
const express = require('express');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();
const {newError} = require('../../utils/newError');
const {Op} = require('sequelize')

const validateSignup = [
    check('firstName')
      .exists({ checkFalsy: true }),
    check('lastName')
      .exists({ checkFalsy: true }),
    check('email')
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage('Please provide a valid email.'),
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
    // check('about')
    //   .exists({ checkFalsy: false })
    //   .isLength({ min: 1 })
    //   .withMessage('Please provide a longer description'),
    handleValidationErrors
  ];

  router.post(
    '/',
    // singleMulterUpload("image"),
    validateSignup,
    async (req, res, next) => {
      const { email, password, about, username, firstName, lastName } = req.body;

      const checkEmail = await User.findOne({
        where: {
          [Op.or]: [{email}, {username}]
        }
      })

      if(checkEmail){
        const err = newError("User already exists with the specified email", 403, 'Email Error', ["User already exists with the specified Email or Username"])
        return next(err)
      }

      const user = await User.signup({ email, username, about, password, firstName, lastName });

      user.dataValues.token = await setTokenCookie(res, user);

      await setTokenCookie(res, user);

      // return res.json({
      //   user: user,
      // });

      return res.json(user);

    }
  );

module.exports = router;
