const jwt = require("jsonwebtoken");
const HttpError = require("../models/http-error");

const tokenCreator = (user) => {
  let token;
  try {
    token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_KEY,
      { expiresIn: "30d" }
    );
  } catch (err) {
    const error = new HttpError("Token creatin failed", 500);
    return next(error);
  }
  return token;
};

const verifyToken = (token) => {
  const payload = jwt.verify(token, process.env.JWT_KEY);
  return payload;
};

module.exports = { tokenCreator, verifyToken };
