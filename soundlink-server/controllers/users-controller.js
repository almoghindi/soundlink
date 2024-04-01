const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const HttpError = require("../models/http-error");
const User = require("../models/user");
const Token = require("../models/token");
const crypto = require("crypto");
const Joi = require("joi");

const sendMail = require("../utils/courier");
const { tokenCreator } = require("../utils/jwt");

const signup = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      new HttpError(
        "Invalid inputs passed, please check your data.",
        errors,
        422
      )
    );
  }

  const {
    email,
    phone,
    password,
    name,
    description,
    location,
    gender,
    profession,
    songs,
    imageUrl,
    genres,
  } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500
    );
    return next(error);
  }

  if (existingUser) {
    res.send({ error: "User already exists" });
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 10);
  } catch (err) {
    const error = new HttpError(
      "Could not create user, please try again.",
      500
    );
    return next(error);
  }

  // Create user document
  const newUser = new User({
    email,
    password: hashedPassword,
    phone,
    name,
    description,
    location,
    gender,
    profession,
    songs,
    imageUrl,
    genres,
    iLiked: [],
    iDisliked: [],
    isPremium: false,
    collabs: [],
    registeredAt: Date.now(),
    isAdmin: false,
  });

  // Use bulk operation for insert
  const bulk = User.collection.initializeOrderedBulkOp();
  bulk.insert(newUser);

  try {
    // Execute bulk insert
    await bulk.execute();
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500
    );
    return next(error);
  }

  let token = tokenCreator(newUser);

  res
    .status(201)
    .json({ userId: newUser.id, email: newUser.email, token: token });
};

const login = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      new HttpError(
        "Invalid inputs passed, please check your data.",
        errors,
        422
      )
    );
  }

  const { email, password } = req.body;
  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError("Logging in failed, please try again.", 500);
    return next(error);
  }

  if (!existingUser) {
    const error = new HttpError(
      "Invalid credentials, could not log you in.",
      401
    );
    return next(error);
  }

  if (existingUser.password === "undefined") {
    const error = new HttpError(
      "Invalid credentials, could not log you in.",
      401
    );
    return next(error);
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    const error = new HttpError(
      "Could not log you in, please check your credentials and try again.",
      500
    );
    return next(error);
  }

  if (!isValidPassword) {
    const error = new HttpError(
      "Invalid credentials, could not log you in.",
      401
    );
    return next(error);
  }

  let token = tokenCreator(existingUser);

  res.json({
    userId: existingUser.id,
    email: existingUser.email,
    token: token,
    isAdmin: existingUser.isAdmin,
  });
};

const googleLogin = async (req, res, next) => {
  const { name, email } = req.body;
  let user;

  try {
    user = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Logging in failed, please try again later.",
      500
    );
    return next(error);
  }

  if (!user) {
    user = new User({
      name,
      phone: "undefined",
      email,
      password: "undefined",
      cart: [],
    });

    try {
      await user.save();
    } catch (err) {
      const error = new HttpError(
        "Signing up failed, please try again later.",
        500
      );
      return next(error);
    }
  }

  let token = tokenCreator(user);

  res.status(201).json({
    userId: user.id,
    email: user.email,
    token,
  });
};

const getUser = async (req, res, next) => {
  let existingUser;

  try {
    existingUser = await User.findById(req.params.userId, "-password");
    res.json({
      user: existingUser.toObject({
        getters: true,
      }),
    });
  } catch (err) {
    const error = new HttpError(
      "Logging in failed, please try again later.",
      500
    );
    return next(error);
  }
  if (!existingUser) {
    const error = new HttpError(
      "Invalid credentials, could not log you in.",
      401
    );
    return next(error);
  }
};

const getUserByEmail = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      new HttpError(
        "Invalid inputs passed, please check your data.",
        errors,
        422
      )
    );
  }

  const { email } = req.body; // Assuming the email is in the request body
  let existingUser;

  try {
    existingUser = await User.findOne({ email }, "-password");

    if (existingUser) {
      res.json({
        isUserExists: true,
      });
    } else {
      res.json({
        isUserExists: false,
      });
    }
  } catch (err) {
    const error = new HttpError(
      "Fetching user failed, please try again later.",
      500
    );
    return next(error);
  }
};

const updateUser = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      new HttpError(
        "Invalid inputs passed, please check your data.",
        errors,
        422
      )
    );
  }

  const {
    userId,
    phone,
    name,
    description,
    location,
    gender,
    profession,
    songs,
    imageUrl,
    genres,
  } = req.body;
  let existingUser;
  try {
    existingUser = await User.findById(userId);
  } catch (err) {
    const error = new HttpError("There's no user, please try again.", 500);
    return next(error);
  }
  if (!existingUser) {
    const error = new HttpError("Something went wrong, please try again.", 401);
    return next(error);
  }
  existingUser.phone = phone;
  existingUser.name = name;
  existingUser.description = description;
  existingUser.location = location;
  existingUser.gender = gender;
  existingUser.profession = profession;
  existingUser.songs = songs;
  existingUser.imageUrl = imageUrl;
  existingUser.genres = genres;

  await existingUser.save();

  res.json("User changed sucessfully.");
};

const forgetPassword = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      new HttpError(
        "Invalid inputs passed, please check your data.",
        errors,
        422
      )
    );
  }

  const { email } = req.body;

  try {
    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      let token = await Token.findOne({ userId: existingUser._id });

      if (!token) {
        token = new Token({
          userId: existingUser._id,
          token: crypto.randomBytes(32).toString("hex"),
        });

        try {
          await token.save();
        } catch (err) {
          const error = new HttpError("Something went wrong", 500);
          return next(error);
        }
      }

      const error = sendMail(existingUser);

      if (error) {
        return next(error);
      }
      res.send({
        message: "Link sent to your email!",
      });
    } else {
      res.send({
        error: "Email doesn't exist, please enter a valid email!",
      });
    }
  } catch (err) {
    // Handle other errors
    console.error(err);
    res.status(500).send({ error: "Internal server error" });
  }
};

const checkResetLink = async (req, res, next) => {
  const { userId } = req.body;
  try {
    let token = await Token.findOne({ userId: userId });
    if (!token) {
      res.json({ isValid: false });
    } else {
      res.json({ isValid: true, token: token.token });
    }
  } catch {
    res.json({ isValid: false });
  }
};

const resetPassword = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      new HttpError(
        "Invalid inputs passed, please check your data.",
        errors,
        422
      )
    );
  }

  try {
    const schema = Joi.object({ password: Joi.string().required() });
    const { error } = schema.validate(req.body);
    if (error)
      return res.status(400).send({
        error: error.details[0].message,
      });

    const user = await User.findById(req.params.userId);
    if (!user)
      return res.status(400).send({
        error: "invalid link or expired",
      });

    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token)
      return res.status(400).send({
        error: "Invalid link or expired",
      });

    const password = await bcrypt.hash(req.body.password, 12);
    user.password = password;
    const errors = validationResult(user);
    if (!errors.isEmpty()) {
      return next(
        new HttpError(
          "Invalid inputs passed, please check your data.",
          errors,
          422
        )
      );
    }
    await user.save();
    await token.deleteOne();

    res.send({
      message: "password reset sucessfully.",
    });
  } catch (error) {
    res.send({
      error: "An error occured",
    });
    console.log(error);
  }
};
exports.resetPassword = resetPassword;
exports.checkResetLink = checkResetLink;
exports.forgetPassword = forgetPassword;
exports.updateUser = updateUser;
exports.getUserByEmail = getUserByEmail;
exports.getUser = getUser;
exports.signup = signup;
exports.login = login;
exports.googleLogin = googleLogin;
