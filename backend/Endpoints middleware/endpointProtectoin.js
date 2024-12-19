const { expressjwt } = require("express-jwt");

exports.requireSignin = expressjwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  userProperty: "auth",
});

// middleware for admin role
exports.requireAdmin = (req, res, next) => {
  // check the role
  if (req.auth.role === 1) {
    next();
  } else {
    return res.status(400).json({
      error: "Forbidden",
    });
  }
};

// middleware for user role
exports.requireUser = (req, res, next) => {
  // check the role
  if (req.auth.role === 0) {
    next();
  } else {
    return res.status(400).json({
      error: "Forbidden",
    });
  }
};
