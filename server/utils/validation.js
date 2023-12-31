const response = require("../response");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const { body, validationResult } = require("express-validator");
const { comparePassword } = require("./hash");

const User = require("../models/user-model");

module.exports.emailValidation = [
   body("email")
      .trim()
      .notEmpty()
      .withMessage("Required input email")
      .isEmail()
      .withMessage("Invalid input email")
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

module.exports.updateProfileValidation = [
   body("fullname").trim().notEmpty().withMessage("Required input fullname"),
   body("username").trim().notEmpty().withMessage("Required input username"),
   body("noHp")
      .trim()
      .custom((value) => {
         if (value) {
            if (!validator.isMobilePhone(value, ["id-ID"])) {
               throw new Error("Invalid nomor telepon");
            }
         }
         return true;
      }),
   body("email").trim().notEmpty().withMessage("Required input email").isEmail().withMessage("Invalid input email"),
   (req, res, next) => {
      const error = validationResult(req);

      if (!error.isEmpty()) return response(402, "Error input", res, error.array());

      next();
   },
];

module.exports.paymentConfirmationValidation = [
   body("fullname").trim().notEmpty().withMessage("Required input fullname"),
   body("noHp").trim().notEmpty().withMessage("Required input nomor telepon").isMobilePhone("id-ID").withMessage("Invalid nomor telepon"),
   body("email").trim().notEmpty().withMessage("Required input email").isEmail().withMessage("Invalid input email"),
   (req, res, next) => {
      const error = validationResult(req);

      if (!error.isEmpty()) return response(402, "Error input", res, error.array());

      next();
   },
];

module.exports.changePasswordValidation = [
   body("oldPassword")
      .trim()
      .notEmpty()
      .withMessage("Required input old password")
      .custom(async (value, { req }) => {
         const user = await User.findOne({ _id: req.params._id });

         if (!comparePassword(value, user.password)) {
            throw new Error("Wrong password");
         } else {
            return true;
         }
      }),
   body("newPassword").trim().notEmpty().withMessage("Required input new password").isLength({ min: 3 }).withMessage("Password too short"),
   body("confirmPassword")
      .trim()
      .custom((value, { req }) => {
         if (value !== req.body.newPassword) {
            throw new Error("Password isn't match");
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

// Venue validation
module.exports.addVenueValidation = [
   body("name").trim().notEmpty().withMessage("Required input nama"),
   body("description").trim().notEmpty().withMessage("Required input deskripsi"),
   body("price").trim().notEmpty().withMessage("Required input min harga"),
   body("image").trim().notEmpty().withMessage("Required input gambar"),
   body("provinsi").trim().notEmpty().withMessage("Required input provinsi"),
   body("city").trim().notEmpty().withMessage("Required input kota"),
   body("address").trim().notEmpty().withMessage("Required input alamat"),
   body("open").trim().notEmpty().withMessage("Required input waktu buka"),
   body("close").trim().notEmpty().withMessage("Required input waktu tutup"),
   (req, res, next) => {
      const error = validationResult(req);

      if (!error.isEmpty()) return response(402, "Error input", res, error.array());

      next();
   },
];

module.exports.tokenValidation = async (req, res, next) => {
   const token = req.headers["auth-token"];

   if (token) {
      try {
         const decoded = jwt.verify(token, "apaantuh");
         req.params._id = decoded._id;

         next();
      } catch (err) {
         console.error(err);
      }
   } else {
      return response(404, "There was not token", res, null);
   }
};
