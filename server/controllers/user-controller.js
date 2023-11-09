const User = require("../models/user-model");
const response = require("../response");

const getAllUsers = async (req, res) => {
   try {
      const users = await User.find();
      res.json({
         status: 200,
         message: "Get All Users",
         payload: users,
      });
   } catch (err) {
      console.log(err);
   }
};

const getUserById = async (req, res) => {
   const { _id } = req.params;

   try {
      const user = await User.findOne({ _id });
      response(200, "Get User By Id", res, user);
   } catch (err) {
      console.log(err);
   }
};

module.exports = { getAllUsers, getUserById };
