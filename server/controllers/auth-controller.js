const Temp = require("../models/temp-model");
const User = require("../models/user-model");
const response = require("../response");
const { hashPassword, comparePassword } = require("../utils/hash");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
   const { email, password } = req.body;

   try {
      const user = await User.findOne({ email });

      if (user === null) return response(402, "Bad Request", res, [{ path: "email", msg: "Email is't registered" }]);
      if (!comparePassword(password, user.password)) return response(402, "Bad Request", res, [{ path: "password", msg: "Wrong password" }]);

      const token = jwt.sign({ _id: user._id }, "apaantuh", { expiresIn: "1h" });
      response(200, "Login Token", res, { token });
   } catch (err) {
      console.log("error: ", err);
   }
};

const register = async (req, res) => {
   const { email } = req.body;
   const expired = Date.now() + 1000 * 60 * 5;

   try {
      await new Temp({ email, otp: req.otp }).save();
      const newUser = await new User({ email }).save();

      delete req.otp;
      response(200, "Successfully Create New Account", res, newUser);
   } catch (err) {
      console.log("error: ", err);
   }
};

const emailVerification = async (req, res) => {
   const { otp, email } = req.body;

   try {
      const verify = await Temp.findOne({ email, otp });

      if (verify === null) return response(402, "Invalid OTP Code", res, verify);

      await User.findOneAndUpdate({ email }, { $set: { isActive: true } });
      await Temp.findOneAndDelete({ email });
      response(200, "Valid OTP Code", res, verify);
   } catch (err) {
      console.log(err);
   }
};

const basicProfile = async (req, res) => {
   const { fullname, username, email, password } = req.body;
   const hash = hashPassword(password);

   try {
      const basicProfile = await User.findOneAndUpdate(
         { email },
         {
            $set: { fullname, username, password: hash },
         }
      );
      response(200, "Successfull! Update Basic Profile", res, basicProfile);
   } catch (err) {
      console.log(err);
   }
};

module.exports = { login, register, emailVerification, basicProfile };
