const User = require("../models/userModel");
const Token = require("../models/tokenModel");
const sendEmail = require("../utils/setEmail");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

exports.postUser = async (req, res) => {
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Create a new user
    let user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    user = await user.save();

    // Generate token
    let token = new Token({
      token: crypto.randomBytes(16).toString("hex"),
      userId: user._id, //
    });

    if (!token) {
      return res.status(400).json({ error: "Failed to generate token" });
    }
    token = await token.save();

    if (!token) {
      return res.status(400).json({
        error: "Failed to generate token",
      });
    }

    // Send email to user
    sendEmail({
      from: "no-reply@ecommerce.com",
      to: user.email,
      subject: "Verify your email",
      text: `Hello, \n\nPlease verify your email by clicking the link below:\n\nhttp://localhost:3000/confirmation/${token.token}`,
    });

    return res.status(201).json({
      message: "User created successfully. Verification email sent.",
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({
      error: "Failed to create user.",
    });
  }
};

// Post email confirmation
// Post email confirmation
exports.postEmailConfirmation = async (req, res) => {
  try {
    const token = await Token.findOne({
      token: req.params.token,
    });
    if (!token) {
      return res.status(400).json({
        error: "Invalid token",
      });
    }

    let user = await User.findOne({
      _id: token.userId,
    });

    if (!user) {
      return res.status(400).json({
        error: "User not found",
      });
    }

    // Check if the user is already verified
    if (user.isVerified) {
      return res.status(400).json({ error: "Email is already verified" });
    }

    // Make user verified if not
    user.isVerified = true;

    // Use await here to ensure the user document is saved before continuing
    await user.save();

    return res.status(200).json({
      message: "Email verified successfully, you may continue to login",
    });
  } catch (error) {
    console.error("Error verifying email:", error);
    return res.status(400).json({
      error: "Failed to verify email.",
    });
  }
};

// signin
exports.signin = async (req, res) => {
  try {
    let user = await User.findOne({
      email: req.body.email,
    });
    if (!user) {
      return res
        .status(400)
        .json({ error: "sorry the email you provided is not found in system" });
    }
    // Check if the user is verified
    if (!user.isVerified) {
      return res.status(400).json({ error: "Email is not verified" });
    }

    // Check if the password is correct
    if (!user.authenticate(req.body.password)) {
      return res.status(400).json({ error: "Invalid  password" });
    }

    // now generate token with user role , id  and jwt secret
    let token = jwt.sign(
      {
        _id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "5d",
      }
    );

    // store token into cookie
    res.cookie("myCookie", token, { expire: Date.now() + 60 * 60 * 1000 });

    return res.status(201).json({
      token,
      user: {
        name: user.name,
        role: user.role,
        email: user.email,
        _id: user._id,
        image: user.image,
      },
    });
  } catch (error) {
    console.error("Error signing in:", error);
    return res.status(400).json({ error: "Failed to sign in" });
  }
};

exports.forgotPassword = async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
  });
  if (!user) {
    return res.status(400).json({
      error: "Email is not found in system",
    });
  }
  if (!user.isVerified) {
    return res.status(400).json({
      error: "Email is not verified.",
    });
  }

  // Generate token
  let token = new Token({
    token: crypto.randomBytes(16).toString("hex"),
    userId: user._id, //
  });

  if (!token) {
    return res.status(400).json({ error: "Failed to generate token" });
  }
  token = await token.save();

  if (!token) {
    return res.status(400).json({
      error: "Failed to save token",
    });
  }

  // Send email to user
  sendEmail({
    from: "no-reply@ecommerce.com",
    to: user.email,
    subject: "Verify your email for resetting password",
    text: `Hello, \n\nPlease verify your email to reset your password by clicking the link below:\n\nhttp://${req.headers.host}/api/resetpassword/${token.token}`,
  });

  return res.status(200).json({
    message: "reset link  sent to user email for password reset",
  });
};

// reset password
exports.resetPassword = async (req, res) => {
  let token = await Token.findOne({
    token: req.params.token,
  });
  if (!token) {
    return res.status(400).json({
      error: "Invalid token or token has been expired",
    });
  }
  let user = await User.findOne({
    _id: token.userId,
  });
  if (!user) {
    return res.status(400).json({ error: "User not found in our system" });
  }
  if (user.authenticate(req.body.password)) {
    return res.status(400).json({
      error: "Password is same as previous one, please create a new password",
    });
  }
  user.password = req.body.password;
  user = await user.save();
  if (!user) {
    return res.status(400).json({ error: "Failed to reset user password" });
  }
  await Token.deleteOne({ userId: user._id });

  return res.status(200).json({
    message: "Password has been reset successfully",
  });
};

// logout
exports.logout = async (req, res) => {
  res.clearCookie("myCookie");
  res.json({
    message: "Logged out successfully",
  });
};

// to get userlist
exports.userList = async (req, res) => {
  const user = await User.find();
  if (!user) {
    return res.status(400).json({ error: "No user found in our system" });
  }
  return res.status(200).json(user);
};

// user detail
exports.userDetails = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(400).json({ error: "User not found in our system" });
  }
  return res.status(200).json(user);
};

exports.updateUser = async (req, res) => {
  const { name, email, address } = req.body;
  console.log(req.file);
  try {
    let user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(400).json({ error: "User not found in our system" });
    }
    user.name = name;
    user.email = email;
    user.address = address;
    if (req.file) {
      user.image = req.file.path;
    }
    user.save();
    return res.status(200).json({
      success: true,
      message: "User updated successfully",
    });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: "Error updating user" });
  }
};
