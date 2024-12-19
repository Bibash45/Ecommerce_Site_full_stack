const { validationResult } = require("express-validator");

exports.validation = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  } else {
    return res.status(400).json({
      error: errors.array()[0].msg,
    });
  }
};
