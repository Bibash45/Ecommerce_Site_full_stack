const { check, validationResult } = require("express-validator");

exports.userValidation = [
  check("name", "name is mandatory")
    .notEmpty()
    .isLength({ min: 3 })
    .withMessage("name must be at least 3 character"),
  check("email", "email is mandatory")
    .notEmpty()
    .isEmail()
    .withMessage("invalid Email"),
];

exports.passwordValidation = [
  check("password", "password is mandatory")
    .notEmpty()
    .matches(/[a-z]/)
    .withMessage("password must contain atleast one lowercase alphabet")
    .matches(/[A-z]/)
    .withMessage("password must contain atleast one uppercase alphabet")
    .matches(/[0-9]/)
    .withMessage("password must contain atleast one numeric value ")
    .matches(/[@#$_!?]/)
    .withMessage("password must contain atleast one special character  ")
    .isLength({ min: 8 })
    .withMessage("password must contain atleast 8 character"),
];
