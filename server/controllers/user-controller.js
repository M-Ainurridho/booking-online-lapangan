const { default: mongoose } = require("mongoose");
const { hashPassword } = require("../utils/hash");

const response = require("../response");

const User = require("../models/user-model");

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
      console.error(err);
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
      console.error("Error : ", err);
   }
};

const updateProfile = async (req, res, next) => {
   const { fullname, username, email, noHp } = req.body;
   const { _id } = req.params;

   try {
      if (!username) {
         await User.findOneAndUpdate({ _id }, { $set: { fullname, email, noHp } });
      } else {
         !noHp
            ? await User.findOneAndUpdate(
                 { _id },
                 {
                    $set: { fullname, username, email },
                    $unset: { noHp },
                 }
              )
            : await User.findOneAndUpdate({ _id }, { $set: { fullname, username, email, noHp } });
      }

      next();
   } catch (err) {
      console.error(err);
   }
};

const changePassword = async (req, res) => {
   const { newPassword } = req.body;
   const { _id } = req.params;

   try {
      const change = await User.findOneAndUpdate({ _id }, { $set: { password: hashPassword(newPassword) } });
      return response(200, "Successfuly! Changed Password", res, change);
   } catch (err) {
      console.error(err);
   }
};

const getCartByUserId = async (req, res) => {
   const { _id } = req.params;
   let carts = {};

   try {
      const user = await User.findOne({ _id });

      if (user.carts?.fields.length < 1) {
         await User.findOneAndUpdate({ _id }, { $unset: { carts } });
      } else {
         carts = user.carts;
      }

      response(200, "Get Cart By User Id", res, carts);
   } catch (err) {
      console.error(err);
   }
};

const addCartByUserId = async (req, res, next) => {
   const { venue, rating, address, field, date, start, end, price } = req.body;
   const { _id } = req.params;

   try {
      const user = await User.findOne({ _id });

      if (user.carts.length < 1 || user.carts.venue != venue) {
         await User.findOneAndUpdate(
            { _id },
            {
               $set: {
                  carts: {
                     _id: new mongoose.Types.ObjectId(),
                     venue,
                     rating,
                     address,
                     fields: {
                        name: field,
                        added: {
                           date,
                           start,
                           end,
                           price,
                        },
                     },
                  },
               },
            }
         );
      } else {
         const fields = user.carts.fields;

         const found = fields.find(({ name }) => name == field);

         if (found) {
            await User.findOneAndUpdate(
               { "carts.fields._id": found._id },
               {
                  $addToSet: {
                     "carts.fields.$[pl].added": { date, start, end, price },
                  },
               },
               {
                  arrayFilters: [
                     {
                        "pl.name": found.name,
                     },
                  ],
               }
            );
         } else {
            await User.findOneAndUpdate(
               { _id },
               {
                  $push: {
                     "carts.fields": {
                        name: field,
                        added: {
                           date,
                           start,
                           end,
                           price,
                        },
                     },
                  },
               }
            );
         }
      }

      next();
   } catch (err) {
      console.error(err);
   }
};

const deleteCartByUserId = async (req, res, next) => {
   const { _id } = req.params;

   try {
      const deleteCart = await User.findOneAndUpdate({ "carts._id": _id }, { $pull: { carts: { _id: _id } } });

      req.params._id = deleteCart._id;

      next();
   } catch (err) {
      console.error(err);
   }
};

const deleteCartByFieldId = async (req, res, next) => {
   const { _id } = req.params;

   try {
      const user = await User.findOneAndUpdate({ "carts.fields._id": _id }, { $pull: { "carts.fields": { _id } } });

      req.params._id = user._id;

      next();
   } catch (err) {
      console.error(err);
   }
};

module.exports = {
   getAllUsers,
   getUserById,
   getUserBookingVenue,
   bookingField,

   updateProfile,
   changePassword,

   getCartByUserId,
   addCartByUserId,
   deleteCartByUserId,
   deleteCartByFieldId,
};
