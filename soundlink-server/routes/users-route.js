const express = require("express");
const { check } = require("express-validator");

const usersController = require("../controllers/users-controller");
const auth = require("../middleware/auth");
const router = express.Router();

router.post(
  "/signup",
  [
    check("email").normalizeEmail().isEmail().isLength({ max: 250 }),
    check("password")
      .isLength({ min: 8, max: 50 })
      .matches(/[a-z]/)
      .matches(/[A-Z]/)
      .matches(/\d/),
    check("phone")
      .isLength({ min: 7, max: 20 })
      .isMobilePhone(["he-IL"], { strictMode: false })
      .withMessage("Please enter a valid Israeli phone number"),
    check("name").notEmpty().isLength({ max: 250 }),
    check("description").isLength({ max: 250 }).notEmpty(),
    check("location").isLength({ max: 250 }).notEmpty(),
    check("gender")
      .isIn(["Male", "Female", "Other"])
      .withMessage("Gender must be either 'male' or 'female'"),
    check("profession")
      .isIn(["Singer", "Producer", "Rapper", "Player"])
      .withMessage(
        "Invalid profession. Must be 'Singer,' 'Producer,' 'Rapper,' or 'Player'"
      ),
    check("songs").isArray().notEmpty(),
    check("imageUrl").notEmpty(),
    check("genres").notEmpty().isArray(),
  ],
  usersController.signup
);

router.post(
  "/login",
  [
    check("email").normalizeEmail().isEmail().isLength({ max: 250 }),
    check("password").notEmpty().isLength({ min: 1, max: 50 }),
  ],
  usersController.login
);

router.get("/:userId", usersController.getUser);

router.post(
  "/getUserByEmail",
  [check("email").normalizeEmail().isEmail().isLength({ max: 250 })],
  usersController.getUserByEmail
);

router.put(
  "/updateUser",
  auth,
  [
    check("phone")
      .isLength({ min: 7, max: 20 })
      .isMobilePhone(["he-IL"], { strictMode: false })
      .withMessage("Please enter a valid Israeli phone number"),
    check("name").notEmpty().isLength({ max: 250 }),
    check("description").isLength({ max: 250 }).notEmpty(),
    check("location").isLength({ max: 250 }).notEmpty(),
    check("gender")
      .isIn(["Male", "Female", "Other"])
      .withMessage("Gender must be either 'male' or 'female'"),
    check("profession")
      .isIn(["Singer", "Producer", "Rapper", "Player"])
      .withMessage(
        "Invalid profession. Must be 'Singer,' 'Producer,' 'Rapper,' or 'Player'"
      ),
    check("songs").isArray().notEmpty(),
    check("imageUrl").notEmpty(),
    check("genres").isArray().notEmpty(),
  ],
  usersController.updateUser
);

router.post(
  "/forgetPassword",
  [check("email").normalizeEmail().isEmail().isLength({ max: 250 })],
  usersController.forgetPassword
);

router.put(
  "/:userId/:token",
  [
    check("password")
      .isLength({ min: 8, max: 50 })
      .matches(/[a-z]/)
      .matches(/[A-Z]/)
      .matches(/\d/),
  ],
  usersController.resetPassword
);

router.post("/checkResetLink", usersController.checkResetLink);

module.exports = router;
