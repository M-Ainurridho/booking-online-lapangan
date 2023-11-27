const { default: mongoose } = require("mongoose");
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

const getUserBookingVenue = async (req, res) => {
   const { day } = req.params;

   try {
      const data = await User.find({ "booking.day": day });

      if (data.length < 1) return response(404, "There aren't Booking Venue", res, data);

      let booked = data.map(({ booking }) => booking);
      booked = booked.flat().filter((b) => b.day == day);
      response(200, "Get Booking Data", res, booked);
   } catch (err) {
      console.log("Error : " + err);
   }
};

const bookingField = async (req, res) => {
   const { _id } = req.params;
   const { fieldName, day, start, end } = req.body;

   try {
      const newBooking = await User.findOneAndUpdate(
         { _id },
         {
            $push: {
               booking: {
                  _id: new mongoose.Types.ObjectId(),
                  fieldName,
                  day,
                  playTime: { start, end },
               },
            },
         }
      );

      response(200, "Booking Field", res, { fieldName, day, start, end });
   } catch (err) {
      console.log("Error : ", err);
   }
};

const updateProfile = async (req, res) => {
   const { fullname, username, email, noHp } = req.body;
   const { _id } = req.params;
   console.log({ fullname, username, email, noHp });

   try {
      if (noHp) {
      } else {
         const update = await User.findOneAndUpdate({ _id }, { $set: { fullname, username, email } });
      }
   } catch (err) {
      console.log("error : " + err);
   }
};

module.exports = { getAllUsers, getUserById, getUserBookingVenue, bookingField, updateProfile };
