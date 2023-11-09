const { body, validationResult } = require("express-validator");
const User = require("../models/user-model");
const response = require("../response");

module.exports.emailValidation = [
   body("email")
      .trim()
      .notEmpty()
      .withMessage("Required input email")
      .custom(async (value) => {
         const duplicate = await User.findOne({ email: value });

         if (duplicate) {
            throw new Error("Email already exist");
         } else {
            return true;
         }
      }),
   (req, res, next) => {
      const error = validationResult(req);

      if (!error.isEmpty()) return response(402, "Error input", res, error.array());

      next();
   },
];

module.exports.loginValidation = [
   body("email").trim().notEmpty().withMessage("Required input email").isEmail().withMessage("Invalid input email"),
   body("password").trim().notEmpty().withMessage("Required input password"),
   (req, res, next) => {
      const error = validationResult(req);

      if (!error.isEmpty()) return response(402, "Error input", res, error.array());

      next();
   },
];

module.exports.basicProfileValidation = [
   body("fullname").trim().notEmpty().withMessage("Required input fullname"),
   body("username").trim().notEmpty().withMessage("Required input username"),
   body("password").trim().notEmpty().withMessage("Required input password").isLength({ min: 3 }).withMessage("Password too short"),
   (req, res, next) => {
      const error = validationResult(req);

      if (!error.isEmpty()) return response(402, "Error input", res, error.array());

      next();
   },
];
